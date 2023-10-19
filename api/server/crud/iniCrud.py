from server.models import HanTable, ElementTable
from sqlalchemy.orm import Session
import csv

# csv to db
def initiate_data(db: Session):
    with open('server/src/data_new.csv', 'r') as f:
        rdr = csv.reader(f)
        next(rdr)
        for row in rdr:
            record = HanTable(
                hanja=row[0],
                kor=row[1],
                radical=row[2],
                radical_name=row[3],
                stroke_count=row[4],
                level=row[5],
                rep_pron=row[6]
            )
            db.add(record)


def initiate_data_element(db: Session):
    with open('server/src/element.csv', 'r') as f:
        rdr = csv.reader(f)
        next(rdr)
        for row in rdr:
            record = ElementTable(
                hanja=row[0],
                partial_hanja=row[1],
                partial_kor=row[2]
            )
            db.add(record)
