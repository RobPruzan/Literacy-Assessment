from ast import List

from .dbHelpers import excerpt_ids_to_objecsts


def ids_to_calculation(ids, fn):
    excerpts_text = excerpt_ids_to_objecsts(ids)
    if len(excerpts_text) > 0:
        calculations = [
            fn(excerpt.text) for excerpt in excerpts_text if excerpt.text is not None
        ]
        return calculations


def ids_are_valid(ids):
    return ids and len(ids) > 0
