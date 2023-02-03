import argparse
import csv
import json
import logging
import string
import sys
from typing import List

import gensim.downloader as api
import matplotlib.patches as patches
import matplotlib.pyplot as plt
import nltk
import numpy as np
import pandas as pd
import readability
import seaborn as sns
import torch
import torch.nn.functional as F
from fuzzywuzzy import fuzz
from nltk.corpus import stopwords
from nltk.corpus import wordnet as wn
from nltk.tokenize import word_tokenize
from sklearn.metrics.pairwise import cosine_similarity
from spellchecker import SpellChecker
from transformers import (
    AutoTokenizer,
    BertForSequenceClassification,
    BertTokenizer,
    DistilBertTokenizer,
    pipeline,
)

# from .ml_models import pytorchBERTmodel
# from .datasets import balanced_synonym_data


# from ...api import pytorchBERTmodel
# ---------------- uncomment went done

nltk.download("wordnet")

nltk.download("omw-1.4")

nltk.download("cmudict")

nltk.download("stopwords")

nltk.download("punkt")

glove_vectors = api.load("glove-wiki-gigaword-100")

tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")
device = torch.device("cuda" if torch.cuda.is_available else "cpu")


# loading model
# PATH = "./pytorchBERTmodel"
# PATH = "../ml_models/pytorchBERTmodel"
model = torch.load("ml_models/pytorchBERTmodel", map_location=torch.device("cpu"))
model.eval()

model.to("cpu")

p = pipeline("automatic-speech-recognition")

with open("datasets/balanced_synonym_data.json") as f:
    data = json.loads(f.read())


def wn_syns(word):
    synonyms = []
    for syn in wn.synsets(word):
        for lm in syn.lemmas():
            synonyms.append(lm.name())
    return set(synonyms)


w2v = dict({})
for idx, key in enumerate(glove_vectors.key_to_index.keys()):
    w2v[key] = glove_vectors.get_vector(key)


def calculate_diversity(text):
    stop_words = set(stopwords.words("english"))
    for i in string.punctuation:
        stop_words.add(i)

    tokenized_text = word_tokenize(text)

    tokenized_text = list(map(lambda word: word.lower(), tokenized_text))
    global sim_words
    sim_words = {}
    if len(tokenized_text) <= 1:
        return 1, "More Text Required"

    for idx, anc in enumerate(tokenized_text):
        if anc in stop_words or not anc in w2v or anc.isdigit():
            sim_words[idx] = "@"
            continue

        vocab = [anc]

        for pos, comp in enumerate(tokenized_text):
            if pos == idx:
                continue
            if comp in stop_words:
                continue
            if not comp.isalpha():
                continue
            try:
                if cosine_similarity(
                    w2v[anc].reshape(1, -1), w2v[comp].reshape(1, -1)
                ) > 0.75 or comp in wn_syns(anc):
                    vocab.append(comp)
            except KeyError:
                continue
        sim_words[idx] = vocab

    scores = {}
    for key, value in sim_words.items():
        if len(value) == 1:
            scores[key] = -1
            continue
        t_sim = len(value)
        t_rep = (len(value)) - (len(set(value)))

        score = (t_sim - t_rep) / t_sim

        scores[key] = score

    mean_score = 0
    total = 0

    for value in scores.values():
        if value == -1:
            continue
        mean_score += value
        total += 1
        words = word_tokenize(text)

    interpret_values = [("", 0.0)]

    for key, value in scores.items():
        interpret_values.append((words[key], value))

    interpret_values.append(("", 0.0))

    int_vals = {"original": text, "interpretation": interpret_values}
    try:

        return int_vals, {"diversity_score": mean_score / total}
    except ZeroDivisionError:

        return int_vals, {"diversity_score": "Not Enough Data"}


def get_sim_words(text, word):
    word = word.strip()
    index = 0
    text = word_tokenize(text)

    for idx, i in enumerate(text):
        if word == i:
            index = idx
            break
    return ", ".join(sim_words[index])


def dict_to_list(dictionary, max_size=10):
    outer_list = []
    inner_list = []

    for key, value in dictionary.items():
        inner_list.append(value)
        if len(inner_list) == max_size:
            outer_list.append(inner_list)
            inner_list = []
    if len(inner_list) > 0:
        outer_list.append(inner_list)
    return outer_list


def heatmap(scores, df):
    total = 0
    loops = 0

    for ratio in scores.values():
        # conditional to visualize the difference between no ratio and a 0 ratio score
        if ratio != -0.3:
            total += ratio
            loops += 1

    diversity_average = total / loops

    return sns.heatmap(df, cmap="gist_gray_r", vmin=-0.3).set(
        title="Word Diversity Score Heatmap (Average Score: "
        + str(diversity_average)
        + ")"
    )


def get_readability_measures(text):
    results = readability.getmeasures(text, lang="en")
    return results


def derive(x: list, y: list):
    all_derivs = []
    for idx, point in enumerate(x):
        if idx != len(x) - 1:
            next_x = x[idx + 1]
            next_y = y[idx + 1]
            h = next_x - point
            if h != 0:
                deriv = (next_y - y[idx]) / h
            else:
                deriv = 0
            all_derivs.append(abs(deriv))
    return all_derivs
    # (f(x+h) - f(x))/h


def generate_patches(x: list, y: list, range, deriv_threshold=2):
    derivs = derive(x, y)

    in_patch = False
    patches = []
    start = []
    end = []
    for idx, der in enumerate(derivs):
        if der > deriv_threshold:
            if not in_patch:
                start.append(x[idx])
                in_patch = True
        else:
            if in_patch:
                end.append(x[idx])
                in_patch = False
            else:
                continue

    if len(start) != len(end):
        # not doing len(x)-1 because the derivitive can't be taken at ending point so in derive() the x length is already -1 of original
        end.append(len(x))
    return list(zip(start, end))


def predict(text, tokenizer=tokenizer):
    model.eval()
    model.to("cpu")

    def prepare_data(text, tokenizer):
        input_ids = []
        attention_masks = []

        encoded_text = tokenizer.encode_plus(
            text,
            truncation=True,
            add_special_tokens=True,
            max_length=315,
            pad_to_max_length=True,
            return_attention_mask=True,
            return_tensors="pt",
        )

        input_ids.append(encoded_text["input_ids"])
        attention_masks.append(encoded_text["attention_mask"])

        input_ids = torch.cat(input_ids, dim=0)
        attention_masks = torch.cat(attention_masks, dim=0)
        return {"input_ids": input_ids, "attention_masks": attention_masks}

    tokenized_example_text = prepare_data(text, tokenizer)
    with torch.no_grad():
        result = model(
            tokenized_example_text["input_ids"].to("cpu"),
            attention_mask=tokenized_example_text["attention_masks"].to("cpu"),
            return_dict=True,
        ).logits

    return result


def level(score):
    if score <= 2.5:
        return "n Elementary School"
    elif 2.5 <= score <= 5:
        return " Middle School"
    elif 5 <= score <= 7.5:
        return " High School"
    else:
        return " College"


def reading_difficulty(excerpt: string) -> float:
    assert type(excerpt) != string or len(excerpt > 100), "Excerpt must not be empty"
    windows = []
    words = tokenizer.tokenize(excerpt)
    if len(words) > 500:
        for idx, text in enumerate(words):
            if idx % 500 == 0:
                if idx <= len(words) - 501:
                    x = " ".join(words[idx : idx + 499])
                    windows.append(x)

        win_preds = []
        for text in windows:
            win_preds.append(predict(text, tokenizer).item())
        result = np.mean(win_preds)
        score = -(result * 1.786 + 6.4) + 10
        return score

    else:
        result = predict(excerpt).item()
        score = -(result * 1.786 + 6.4) + 10
        return score


def calculate_stats(file_name, data_index):
    # unicode escape only for essays
    with open(file_name, encoding="unicode_escape") as f:
        information = {
            "lines": 0,
            "words_per_sentence": 0,
            "words": 0,
            "syll_per_word": 0,
            "characters_per_word": 0,
            "reading_difficulty": 0,
        }
        reader = csv.reader(f)

        for line in reader:

            if len(line[data_index]) < 100:
                continue

            try:
                stat = get_readability_measures(line[data_index])

            except ValueError:
                continue

            information["lines"] += 1
            information["words_per_sentence"] += stat["sentence info"][
                "words_per_sentence"
            ]
            information["words"] += stat["sentence info"]["words"]
            information["syll_per_word"] += stat["sentence info"]["syll_per_word"]
            information["characters_per_word"] += stat["sentence info"][
                "characters_per_word"
            ]
            information["reading_difficulty"] += reading_difficulty(line[data_index])

    for i in information:
        if i != "lines" and i != "words":
            information[i] /= information["lines"]

    return information


def transcribe(audio):
    # speech to text using pipeline
    text = p(audio)["text"]
    return text


def compute_score(target, actual):

    target = target.lower()
    actual = actual.lower()
    return fuzz.ratio(target, actual)


def phon(text):
    alph = nltk.corpus.cmudict.dict()
    text = word_tokenize(text)
    pronun = []
    for word in text:
        try:
            pronun.append(alph[word][0])
        except Exception as e:
            pronun.append(word)

    def flatten(l):
        new_l = []
        for i in l:
            if type(i) is list:
                for j in i:
                    new_l.append("".join([i.lower() for i in j if not i.isdigit()]))

            else:
                new_l.append(str(i))

            new_l.append(" ")
        return "-".join(new_l)

    output = []
    f = flatten(pronun)
    for idx, i in enumerate(f):
        output.append("-".join(i).lower())

    return "".join(output)


def sliding_window(text):
    words = word_tokenize(text)
    improved_window = []
    step = 3
    for idx, text in enumerate(words):
        if idx % step == 0:
            if idx <= len(words) - 26:
                x = " ".join(words[idx : idx + 25])
                throw_away = []
                score = 0
                for idx, i in enumerate(range(idx, idx + 25)):
                    if idx == 0:
                        better_prediction = -(predict(x).item() * 1.786 + 6.4) + 10
                        score = better_prediction
                        throw_away.append((better_prediction, i))
                    else:
                        throw_away.append((score, i))

                improved_window.append(throw_away)
    average_scores = {k: 0 for k in range(len(words) - 1)}
    total_windows = {k: 0 for k in range(len(words) - 1)}
    for idx, i in enumerate(improved_window):
        for score, idx in i:
            average_scores[idx] += score
            total_windows[idx] += 1

    for k, v in total_windows.items():
        if v != 0:
            average_scores[k] /= v

    inter_scores = [v for v in average_scores.values()]
    copy_list = inter_scores.copy()

    while len(inter_scores) <= len(words) - 1:
        inter_scores.append(copy_list[-1])

    x = list(range(len(inter_scores)))
    y = inter_scores

    shaded_areas = generate_patches(x, y, 0.42)

    mapd = [("", 0)]
    maxy = max(inter_scores)
    miny = min(inter_scores)
    spread = maxy - miny

    for idx, i in enumerate(words):
        mapd.append((i, (inter_scores[idx] - miny) / spread))
    mapd.append(("", 0))

    return {
        "original": text,
        "interpretation": mapd,
        "raw_scores": inter_scores,
        "shaded_areas": shaded_areas,
    }


def speech_to_text(speech, target):
    text = p(speech)["text"]
    return (
        text.lower(),
        {"Pronunciation Score": compute_score(text, target) / 100},
        phon(target),
    )


def speech_to_score(speech):
    text = p(speech)["text"]
    return reading_difficulty(text), text


def my_i_func(text):
    return {
        "original": "",
        "interpretation": [
            ("", 0.0),
            ("what", -0.2),
            ("great", 0.3),
            ("day", 0.5),
            ("", 0.0),
        ],
    }


def gen_syns(word, level):
    word = word.strip(" ")
    school_to_level = {
        "Elementary Level": "1",
        "Middle School Level": "2",
        "High School Level": "3",
        "College Level": "4",
    }
    pins = wn_syns(word)
    reko = []
    for i in pins:
        if i in data[school_to_level[level]]:
            reko.append(i)
    str_reko = ""
    for idx, i in enumerate(reko):
        if idx != len(reko) - 1:
            str_reko += i + " | "
        else:
            str_reko += i
    return str_reko


def get_level(word):
    with open("balanced_synonym_data.json") as f:
        word = word.strip(" ")
        data = json.loads(f.read())
        level = 0

        for k, v in data.items():
            if word in v:
                level = k
        if level == 0:
            return -4
        return level


def vocab_level_inter(text):
    text = word_tokenize(text)
    stop_words = set(stopwords.words("english"))
    for i in string.punctuation:
        stop_words.add(i)
    interp = [("", 0)]
    sum = 0
    total = 0
    for idx, i in enumerate(text):
        if i in stop_words:
            lvl = -1
            interp.append((i, lvl))
            continue
        lvl = int(get_level(i)) / 4
        interp.append((i, lvl))
        if int(lvl) < 0:
            continue
        sum += lvl
        total += 1
    interp.append(("", 0))
    return {
        "original": text,
        "interpretation": interp,
    }, f"{level(sum/total*4*2.5)[1:]} Level Vocabulary"


logger = logging.getLogger(__name__)
logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(name)s -   %(message)s",
    datefmt="%m/%d/%Y %H:%M:%S",
    level=logging.INFO,
)
tokenizer4 = AutoTokenizer.from_pretrained("kanishka/GlossBERT")


def construct_context_gloss_pairs_through_nltk(input, target_start_id, target_end_id):
    """
    construct context gloss pairs like sent_cls_ws
    :param input: str, a sentence
    :param target_start_id: int
    :param target_end_id: int
    :param lemma: lemma of the target word
    :return: candidate lists
    """

    sent = tokenizer4.tokenize(input)
    assert (
        0 <= target_start_id
        and target_start_id < target_end_id
        and target_end_id <= len(sent)
    )
    target = " ".join(sent[target_start_id:target_end_id])
    if len(sent) > target_end_id:
        sent = (
            sent[:target_start_id]
            + ['"']
            + sent[target_start_id:target_end_id]
            + ['"']
            + sent[target_end_id:]
        )
    else:
        sent = (
            sent[:target_start_id] + ['"'] + sent[target_start_id:target_end_id] + ['"']
        )

    sent = " ".join(sent)

    candidate = []
    syns = wn.synsets(target)

    for syn in syns:
        if target == syn.name().split(".")[0]:
            continue

        gloss = (syn.definition(), syn.name())
        candidate.append((sent, f"{target} : {gloss}", target, gloss))

    assert (
        len(candidate) != 0
    ), f'there is no candidate sense of "{target}" in WordNet, please check'

    return candidate


class InputFeatures(object):
    """A single set of features of data."""

    def __init__(self, input_ids, input_mask, segment_ids):
        self.input_ids = input_ids
        self.input_mask = input_mask
        self.segment_ids = segment_ids


def convert_to_features(candidate, tokenizer3, max_seq_length=512):

    candidate_results = []
    features = []
    for item in candidate:
        text_a = item[0]  # sentence
        text_b = item[1]  # gloss
        candidate_results.append((item[-2], item[-1]))  # (target, gloss)

        tokens_a = tokenizer3.tokenize(text_a)
        tokens_b = tokenizer3.tokenize(text_b)
        _truncate_seq_pair(tokens_a, tokens_b, max_seq_length - 3)
        tokens = ["[CLS]"] + tokens_a + ["[SEP]"]
        segment_ids = [0] * len(tokens)
        tokens += tokens_b + ["[SEP]"]
        segment_ids += [1] * (len(tokens_b) + 1)

        input_ids = tokenizer3.convert_tokens_to_ids(tokens)

        # The mask has 1 for real tokens and 0 for padding tokens. Only real
        # tokens are attended to.
        input_mask = [1] * len(input_ids)

        # Zero-pad up to the sequence length.
        padding = [0] * (max_seq_length - len(input_ids))
        input_ids += padding
        input_mask += padding
        segment_ids += padding

        assert len(input_ids) == max_seq_length
        assert len(input_mask) == max_seq_length
        assert len(segment_ids) == max_seq_length

        features.append(
            InputFeatures(
                input_ids=input_ids, input_mask=input_mask, segment_ids=segment_ids
            )
        )

    return features, candidate_results


def _truncate_seq_pair(tokens_a, tokens_b, max_length):
    """Truncates a sequence pair in place to the maximum length."""

    # This is a simple heuristic which will always truncate the longer sequence
    # one token at a time. This makes more sense than truncating an equal percent
    # of tokens from each, since if one sequence is very short then each token
    # that's truncated likely contains more information than a longer sequence.
    while True:
        total_length = len(tokens_a) + len(tokens_b)
        if total_length <= max_length:
            break
        if len(tokens_a) > len(tokens_b):
            tokens_a.pop()
        else:
            tokens_b.pop()


def infer(input, target_start_id, target_end_id, args):
    sent = tokenizer4.tokenize(input)
    assert (
        0 <= target_start_id
        and target_start_id < target_end_id
        and target_end_id <= len(sent)
    )
    target = " ".join(sent[target_start_id:target_end_id])

    device = torch.device(
        "cuda" if torch.cuda.is_available() and not args.no_cuda else "cpu"
    )

    label_list = ["0", "1"]
    num_labels = len(label_list)

    model = BertForSequenceClassification.from_pretrained(
        args.bert_model, num_labels=num_labels
    )
    model.to(device)

    examples = construct_context_gloss_pairs_through_nltk(
        input, target_start_id, target_end_id
    )
    eval_features, candidate_results = convert_to_features(examples, tokenizer4)
    input_ids = torch.tensor([f.input_ids for f in eval_features], dtype=torch.long)
    input_mask = torch.tensor([f.input_mask for f in eval_features], dtype=torch.long)
    segment_ids = torch.tensor([f.segment_ids for f in eval_features], dtype=torch.long)

    model.eval()
    input_ids = input_ids.to(device)
    input_mask = input_mask.to(device)
    segment_ids = segment_ids.to(device)
    with torch.no_grad():
        logits = model(
            input_ids=input_ids,
            token_type_ids=segment_ids,
            attention_mask=input_mask,
            labels=None,
        ).logits
    logits_ = F.softmax(logits, dim=-1)
    logits_ = logits_.detach().cpu().numpy()
    output = np.argmax(logits_, axis=0)[1]
    results = []
    for idx, i in enumerate(logits_):
        results.append((candidate_results[idx][1], i[1] * 100))
    sorted_results = sorted(results, key=lambda x: x[1], reverse=True)

    return sorted_results


def format_for_gradio(inp):
    retval = ""
    for idx, i in enumerate(inp):
        if idx == len(inp) - 1:
            retval += i.split(".")[0]
            break
        retval += f"""{i.split('.')[0]} | """
    return retval


def smart_synonyms(text, level):
    parser = argparse.ArgumentParser()
    parser.add_argument("--bert_model", default="kanishka/GlossBERT", type=str)
    parser.add_argument(
        "--no_cuda",
        default=False,
        action="store_true",
        help="Whether not to use CUDA when available",
    )
    args, unknown = parser.parse_known_args()

    location = 0
    word = ""
    tokens = tokenizer4.tokenize(text)
    school_to_level = {
        "Elementary Level": "1",
        "Middle School Level": "2",
        "High School Level": "3",
        "College Level": "4",
    }
    for idx, i in enumerate(tokens):
        if i[0] == "@":
            location = idx
            text = text.replace("@", "")
            word = tokens[location]
            break
    raw_syns = []
    raw_defs = []
    raw_scores = []
    syns = []
    defs = []
    scores = []
    preds = infer(text, location, location + 1, args)
    for i in preds:
        if not i[0][1].split(".")[0] in data[school_to_level[level]]:
            continue
        raw_syns.append(i[0][1])
        raw_defs.append(i[0][0])
        raw_scores.append(i[1])
        if i[1] > 5:
            syns.append(i[0][1])
            defs.append(i[0][0])
            scores.append(i[1])

    if not syns:
        top_syns = int(len(raw_syns) * 0.25 // 1 + 1)
        syns = raw_syns[:top_syns]
        defs = raw_defs[:top_syns]
        scores = raw_scores[:top_syns]

    cleaned_syns = format_for_gradio(syns)
    cleaend_defs = format_for_gradio(defs)

    return f"{cleaned_syns}: Definition- {cleaend_defs} | "


def interpret_to_plot(interpretation):
    plot_data = {"x": [], "y": []}
    if interpretation:
        for idx, (word, score) in enumerate(interpretation):
            plot_data["x"].append(idx)
            plot_data["y"].append(score)
    return plot_data


def misspelled_percentage(tokenized_excerpt: List[str]) -> float:
    spell = SpellChecker()
    misspelled = spell.unknown(tokenized_excerpt)
    return len(misspelled) / len(tokenized_excerpt)


def comparison_pipeline(excerpts_list: List[str]):

    for excerpt in excerpts_list:
        tokenized_words = word_tokenize(excerpt)
        if len(tokenized_words) < 10:
            continue

        diversity = calculate_diversity(excerpt)
        difficulty = reading_difficulty(excerpt)
        sliding_window_stats = sliding_window(excerpt)
        plot_data = interpret_to_plot(sliding_window_stats.get("interpretation"))

        readability = get_readability_measures(excerpt)
        grammar = misspelled_percentage(tokenized_words)
        excerpt_stats["diversity"] = diversity
        excerpt_stats["difficulty"] = difficulty
        excerpt_stats["sliding_window_stats"] = sliding_window_stats
        excerpt_stats["plot_data"] = plot_data
        excerpt_stats["readability_measures"] = readability
        excerpt_stats["grammar"] = grammar

    return all_stats
