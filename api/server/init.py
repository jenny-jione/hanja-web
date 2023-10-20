from .models import HanTable, ElementTable, WordExampleTable
from .database import engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import event
import csv


def load_csv_data(filepath: str):
    with open(filepath, 'r') as f:
        rdr = csv.reader(f)
        next(rdr)
        data = list(rdr)
        return data


Session = sessionmaker(bind=engine)
session = Session()

@event.listens_for(HanTable.__table__, 'after_create')
def initiate_han_db(*args, **kwargs):
    data = load_csv_data('server/src/data_new.csv')
    for row in data:
        record = HanTable(
            hanja=row[0],
            kor=row[1],
            radical=row[2],
            radical_name=row[3],
            stroke_count=row[4],
            level=row[5],
            rep_pron=row[6]
        )
        session.add(record)
    session.commit()


@event.listens_for(ElementTable.__table__, 'after_create')
def initiate_element_db(*args, **kwargs):
    data = load_csv_data('server/src/element_new.csv')
    
    for row in data:
        record = ElementTable(
            hanja=row[0],
            partial_hanja=row[1],
            partial_kor=row[2]
        )
        session.add(record)
    session.commit()


@event.listens_for(WordExampleTable.__table__, 'after_create')
def initiate_word_db(*args, **kwargs):
    data = load_csv_data('server/src/example_word_edited.csv')

    for row in data:
        record = WordExampleTable(
            hanja=row[0],
            word=row[1],
            kor=row[2],
            url=row[3]
        )
        session.add(record)
    session.commit()
