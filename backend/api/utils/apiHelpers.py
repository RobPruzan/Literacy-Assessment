from rest_framework.response import Response

from .helpers import ids_are_valid, ids_to_calculation

INVALID_IDS = "Invalid ids provided"


def calculate_stats_and_respond(request, fn):
    excerpt_ids = request.data.get("excerpt_ids")
    if ids_are_valid(excerpt_ids):
        calculations = ids_to_calculation(excerpt_ids, fn)
        return Response(calculations)
    else:
        return Response(INVALID_IDS)


def calculate_multiple_stats_and_respond(request, fn):
    collections = request.data.get("collections")
    stats = []
    for collection in collections:
        if ids_are_valid(collection.get("excerpt_ids")):
            return Response(INVALID_IDS)
        stats.append(
            {
                "collection_id": collection.get("id"),
                "stats": ids_to_calculation(collection.get("excerpt_ids"), fn),
            }
        )
    return Response(stats)
