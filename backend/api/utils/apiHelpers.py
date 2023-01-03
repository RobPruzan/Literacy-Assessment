from rest_framework.response import Response
from .helpers import ids_to_calculation, ids_are_valid

INVALID_IDS = "Invalid ids provided"


def calculate_stats_and_respond(request, fn):
    excerpt_ids = request.data.get("excerpt_ids")
    if ids_are_valid(excerpt_ids):
        calculations = ids_to_calculation(excerpt_ids, fn)
        return Response(calculations)
    else:
        return Response(INVALID_IDS)
