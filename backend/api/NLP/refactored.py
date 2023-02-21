import logging

import gensim
import gensim.downloader as api
import matplotlib.pyplot as plt
import numpy as np
import torch
from gensim.corpora import Dictionary
from gensim.models import KeyedVectors, LdaModel
from gensim.scripts.glove2word2vec import glove2word2vec
from scipy.spatial.distance import cosine
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.metrics.pairwise import cosine_similarity
from transformers import BertModel, BertTokenizer

bert_tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
bert_model = BertModel.from_pretrained(
    "bert-base-uncased",
    output_hidden_states=True,  # Whether the model returns all hidden-states.
)
bert_model.eval()


glove_model = api.load("glove-wiki-gigaword-300")

lda_model = LdaModel.load("lda_model")
dictionary = Dictionary.load("dictionary")


def prepare_words(words):
    marked_text = "[CLS] " + words + " [SEP]"
    tokenized_text = bert_tokenizer.tokenize(marked_text)
    indexed_tokens = bert_tokenizer.convert_tokens_to_ids(tokenized_text)
    return indexed_tokens, tokenized_text, marked_text


def generate_list_of_word_embeddings(words):
    indexed_tokens, tokenized_text, marked_text = prepare_words(words)
    segments_ids = [1] * len(tokenized_text)
    # Convert inputs to PyTorch tensors
    tokens_tensor = torch.tensor([indexed_tokens])
    segments_tensors = torch.tensor([segments_ids])
    with torch.no_grad():

        outputs = bert_model(tokens_tensor, segments_tensors)
        hidden_states = outputs[2]
        token_embeddings = torch.stack(hidden_states, dim=0)
        token_embeddings = torch.squeeze(token_embeddings, dim=1)
        token_embeddings = token_embeddings.permute(1, 0, 2)

        token_vecs_sum = []
        token_word_map = {}

        for idx, token in enumerate(token_embeddings):
            sum_vec = torch.sum(token[-4:], dim=0)
            token_word_map[tokenized_text[idx]] = sum_vec
            token_vecs_sum.append(sum_vec)

        return token_vecs_sum, token_word_map


def compare_word_embeds(word1, word2):
    return 1 - cosine(word1, word2)


def cluster_tokens(token_vectors, tokens):
    # Convert torch vectors to numpy arrays
    X = np.array([v.numpy() for v in token_vectors])

    # Perform clustering using Silhouette analysis
    max_clusters = min(len(X), 50)  # limit the maximum number of clusters to 50
    best_score = -1
    best_clusters = 2
    for n_clusters in range(2, max_clusters + 1):
        kmeans = KMeans(n_clusters=n_clusters)
        labels = kmeans.fit_predict(X)
        score = silhouette_score(X, labels)
        if score > best_score:
            best_score = score
            best_clusters = n_clusters

    # Fit KMeans with best number of clusters and get cluster assignments
    kmeans = KMeans(n_clusters=best_clusters)
    labels = kmeans.fit_predict(X)

    # Create dictionary mapping tokens to clusters
    token_clusters = {}
    for i, token in enumerate(tokens):
        token_clusters[token] = labels[i]

    return token_clusters


# Averages together the subword embeddings to get a single word embedding
def extract_word_embeddings(subword_vectors, tokens):
    word_vectors = []
    word_tokens = []
    current_word = ""
    current_word_vector = None
    for i, token in enumerate(tokens):
        if token.startswith("##"):
            current_word += token[2:]
            current_word_vector += subword_vectors[i]
        else:
            if current_word_vector is not None:
                current_word_vector /= len(current_word.split())
                word_vectors.append(current_word_vector)
                word_tokens.append(current_word)
            current_word = token
            current_word_vector = subword_vectors[i]
    if current_word_vector is not None:
        current_word_vector /= len(current_word.split())
        word_vectors.append(current_word_vector)
        word_tokens.append(current_word)
    return word_vectors, word_tokens


def get_word_embeddings(words):
    words = words.split()
    embeddings = []

    for word in words:
        print(word)
        if word in glove_model.vocab:
            embeddings.append(glove_model[word])
        else:
            embeddings.append(None)
    return embeddings


import numpy as np


def cluster_embeddings(embeddings, tokens, clusters):

    embeddings_np = np.array([embedding.numpy() for embedding in embeddings])

    # Cluster the embeddings using k-means
    kmeans = KMeans(
        n_clusters=clusters, init="k-means++", max_iter=300, n_init=10, random_state=0
    )
    kmeans.fit(embeddings_np)

    # Group the tokens based on the cluster labels
    groups = [[] for i in range(clusters)]
    for i, token in enumerate(tokens):
        group_label = kmeans.labels_[i]
        groups[group_label].append(token)
    text_to_plot(" ".join(tokens))
    return groups


def group_similar_words(embeddings, tokens):
    groups = []
    for i in range(len(embeddings)):
        group = [tokens[i]]
        for j in range(i + 1, len(embeddings)):
            similarity = cosine_similarity(
                embeddings[i].reshape(1, -1), embeddings[j].reshape(1, -1)
            )[0][0]
            if similarity > 0.7:
                group.append(tokens[j])
        groups.append(group)
    return groups


def text_to_rvd(text):
    custom_vecs, custom_token_to_vec = generate_list_of_word_embeddings(text)
    list_of_words_and_subwords = [i for i in custom_token_to_vec.keys()]
    only_word_vecs, only_word_tokens = extract_word_embeddings(
        custom_vecs, list_of_words_and_subwords
    )
    return group_similar_words(only_word_vecs, only_word_tokens)


def text_to_plot(text):
    custom_vecs, custom_token_to_vec = generate_list_of_word_embeddings(text)
    list_of_words_and_subwords = [i for i in custom_token_to_vec.keys()]
    only_word_vecs, only_word_tokens = extract_word_embeddings(
        custom_vecs, list_of_words_and_subwords
    )
    plot_embeddings(only_word_vecs)


import plotly.graph_objs as go
import torch
from plotly.subplots import make_subplots
from sklearn.decomposition import PCA


def plot_embeddings(embeddings):
    X = torch.stack(embeddings).numpy()

    # Perform PCA for dimensionality reduction
    pca = PCA(n_components=3)
    X_pca = pca.fit_transform(X)

    fig = make_subplots(rows=1, cols=1, specs=[[{"type": "scatter3d"}]])

    fig.add_trace(
        go.Scatter3d(
            x=X_pca[:, 0],
            y=X_pca[:, 1],
            z=X_pca[:, 2],
            mode="markers",
            marker=dict(size=3),
        ),
        row=1,
        col=1,
    )

    fig.update_layout(width=800, height=800, title="Embeddings in 3D")

    fig.show()


def predict_topics(text):

    tokens = gensim.utils.simple_preprocess(text)
    stopped_tokens = [
        token for token in tokens if not lda_model.id2word.doc2bow([token]) == []
    ]

    # create bag-of-words representation of text
    bow = dictionary.doc2bow(stopped_tokens)

    # predict topics for text using pre-trained LDA model
    topic_probs = lda_model.get_document_topics(bow)

    # group words by topic and return as a dictionary
    topics = {}
    for topic_prob in topic_probs:
        topic_id, prob = topic_prob
        topic_words = lda_model.show_topic(topic_id)
        topics[f"Topic {topic_id+1}"] = [word[0] for word in topic_words]

    return topics
