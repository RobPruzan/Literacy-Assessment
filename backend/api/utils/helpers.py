from ast import List

from print_color import print

from .dbHelpers import excerpt_ids_to_objects


def ids_to_calculation(ids, fn):
    excerpts_text = excerpt_ids_to_objects(ids)
    if len(excerpts_text) > 0:
        calculations = [
            fn(excerpt.text) for excerpt in excerpts_text if excerpt.text is not None
        ]
        return calculations


def ids_are_valid(ids):
    print(
        "The validating ids",
        ids,
        type(ids),
        ids and len(ids) > 0,
        color="red",
    )
    return ids and len(ids) > 0
