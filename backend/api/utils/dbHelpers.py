from typing import List

# import Excerpt
from ..models import Excerpt


def excerpt_ids_to_objects(excerpt_ids: List[int]) -> List[Excerpt]:
    excerpt_list = []
    print("The excerpt ids are: ", excerpt_ids)
    if excerpt_ids and len(excerpt_ids) > 0:
        for excerpt_id in excerpt_ids:
            excerpt = Excerpt.objects.get(id=excerpt_id)
            if excerpt:
                excerpt_list.append(excerpt)
    return excerpt_list
