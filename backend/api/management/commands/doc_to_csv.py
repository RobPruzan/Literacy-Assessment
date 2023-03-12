from django.core.management.base import BaseCommand
from api.models import MedicalDocument
import csv


def append_to_csv(file_location, values):
    with open(file_location, "a", newline="") as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(values)


CSV_PATH = "api/management/commands/med_docs.csv"


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        print("Starting Database Update")
        for doc in MedicalDocument.objects.all():
            append_to_csv(CSV_PATH, [doc.type, doc.title, doc.text])

        print("Completed Database Update")
