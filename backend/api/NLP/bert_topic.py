from bertopic import BERTopic
from bertopic.representation import KeyBERTInspired
from bertopic.vectorizers import ClassTfidfTransformer
from hdbscan import HDBSCAN
from nltk.tokenize import sent_tokenize, word_tokenize
from sentence_transformers import SentenceTransformer
from sklearn.feature_extraction.text import CountVectorizer
from umap import UMAP

# https://maartengr.github.io/BERTopic/algorithm/algorithm.html#1-embed-documents

# Step 1 - Extract embeddings
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

# Step 2 - Reduce dimensionality
umap_model = UMAP(n_neighbors=15, n_components=5, min_dist=0.0, metric="cosine")

# Step 3 - Cluster reduced embeddings
hdbscan_model = HDBSCAN(
    min_cluster_size=15,
    metric="euclidean",
    cluster_selection_method="eom",
    prediction_data=True,
)

# Step 4 - Tokenize topics
vectorizer_model = CountVectorizer(stop_words="english")

# Step 5 - Create topic representation
ctfidf_model = ClassTfidfTransformer()


representation_model = KeyBERTInspired()


topic_model = BERTopic(
    embedding_model=embedding_model,  # Step 1 - Extract embeddings
    umap_model=umap_model,  # Step 2 - Reduce dimensionality
    hdbscan_model=hdbscan_model,  # Step 3 - Cluster reduced embeddings
    vectorizer_model=vectorizer_model,  # Step 4 - Tokenize topics
    ctfidf_model=ctfidf_model,  # Step 5 - Extract topic words
    representation_model=representation_model,  # Step 6 - (Optional) Fine-tune topic represenations
)

topic_model = BERTopic.load("topic_model")


def get_topic_number(text):
    topics = topic_model.find_topics(text, top_n=1)
    return topics[0][0]


def get_representative_topic_words(text):
    topic_number = get_topic_number(text)
    topics = topic_model.get_topic(topic_number), topic_number
    topic_names = ",".join([topic for topic, freq in topics[0]][:4])
    return topic_names


topic_labels = topic_model.generate_topic_labels(
    nr_words=3, topic_prefix=False, word_length=15, separator=", "
)
topic_model.set_topic_labels(topic_labels)


def mtld(tokens, threshold=0.72):
    """
    Calculate the Measure of Textual Lexical Diversity (MTLD) score for a given list of tokens.
    Generates  groups to calculate the type-token ratio (TTR) determined by local diversity + threshold.
    Takes the average of the forward and backward to genreate the MTLD score.
    Args:
        tokens: A list of tokens (words) in the language sample.
        threshold: The minimum type-token ratio (TTR) required to maintain lexical diversity.
    Returns:
        The MTLD score for the language sample.
    """
    ttr, factor_count, word_count = 1.0, 1, len(tokens)
    stack = []
    for token in tokens:
        stack.append(token)
        ttr = len(set(stack)) / len(stack)
        if ttr < threshold:
            stack = []
            factor_count += 1
    mtld_score = word_count / factor_count
    reversed_tokens = list(reversed(tokens))
    ttr, factor_count, word_count = 1.0, 1, len(reversed_tokens)
    stack = []
    for token in reversed_tokens:
        stack.append(token)
        ttr = len(set(stack)) / len(stack)
        if ttr < threshold:
            stack = []
            factor_count += 1
    reversed_mtld_score = word_count / factor_count
    return (mtld_score + reversed_mtld_score) / 2


def mattr(tokens, window_size):
    """
    Calculate a lexical diversity score using a moving average of type-token ratios (MATTR).
    Args:
        tokens: A list of tokens (words) in the language sample.
        window_size: The size of the window used for calculating TTRs.
    Returns:
        The MATTR score for the language sample.
    """
    ttrs = []
    for i in range(len(tokens) - window_size + 1):
        window = tokens[i : i + window_size]
        ttr = len(set(window)) / window_size
        ttrs.append(ttr)
    mattr_score = sum(ttrs) / len(ttrs)
    return mattr_score


# https://github.com/jennafrens/lexical_diversity/blob/master/lexical_diversity.py
import string

# Global trandform for removing punctuation from words
remove_punctuation = str.maketrans("", "", string.punctuation)

# HD-D internals

# x! = x(x-1)(x-2)...(1)
def factorial(x):
    if x <= 1:
        return 1
    else:
        return x * factorial(x - 1)


# n choose r = n(n-1)(n-2)...(n-r+1)/(r!)
def combination(n, r):
    r_fact = factorial(r)
    numerator = 1.0
    num = n - r + 1.0
    while num < n + 1.0:
        numerator *= num
        num += 1.0
    return numerator / r_fact


# hypergeometric probability: the probability that an n-trial hypergeometric experiment results
#  in exactly x successes, when the population consists of N items, k of which are classified as successes.
#  (here, population = N, population_successes = k, sample = n, sample_successes = x)
#  h(x; N, n, k) = [ kCx ] * [ N-kCn-x ] / [ NCn ]
def hypergeometric(population, population_successes, sample, sample_successes):
    return (
        combination(population_successes, sample_successes)
        * combination(population - population_successes, sample - sample_successes)
    ) / combination(population, sample)


# HD-D implementation
def hdd(word_array, sample_size=42.0):
    if isinstance(word_array, str):
        raise ValueError(
            "Input should be a list of strings, rather than a string. Try using string.split()"
        )
    if len(word_array) < 50:
        raise ValueError("Input word list should be at least 50 in length")

    # Create a dictionary of counts for each type
    type_counts = {}
    for token in word_array:
        token = token.translate(
            remove_punctuation
        ).lower()  # trim punctuation, make lowercase
        if token in type_counts:
            type_counts[token] += 1.0
        else:
            type_counts[token] = 1.0
    # Sum the contribution of each token - "If the sample size is 42, the mean contribution of any given
    #  type is 1/42 multiplied by the percentage of combinations in which the type would be found." (McCarthy & Jarvis 2010)
    hdd_value = 0.0
    for token_type in type_counts.keys():
        contribution = (
            1.0
            - hypergeometric(len(word_array), sample_size, type_counts[token_type], 0.0)
        ) / sample_size
        hdd_value += contribution

    return hdd_value


def text_to_diversity_per_topic(text, diversity_function):
    tokenized_text = sent_tokenize(text)
    window_to_sentence = {}
    for idx, i in enumerate(tokenized_text):
        topic_for_sentence = get_representative_topic_words(i)
        window_to_sentence[topic_for_sentence] = {
            *window_to_sentence.get(topic_for_sentence, {}),
            idx,
        }
    diversity = {}
    total_diversity_scores = 0
    # calculate the diversity for each group
    for topic, sentence_indexes in window_to_sentence.items():
        bag_of_words = " ".join([tokenized_text[idx] for idx in sentence_indexes])
        diversity_score = diversity_function(bag_of_words)
        diversity[topic] = diversity_score
        total_diversity_scores += diversity_score

    return diversity, total_diversity_scores / len(diversity)
