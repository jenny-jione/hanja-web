from server.models import HanTable
from sqlalchemy.orm import Session
import csv

# csv to db
def initiate_data(db: Session):
    with open('server/src/data.csv', 'r') as f:
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
