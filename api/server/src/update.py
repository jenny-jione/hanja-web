import csv

SRC_FILE = 'data_822'
with open(f'{SRC_FILE}.csv', 'r') as f, open(f'{SRC_FILE}_new.csv', 'w') as f2:
    rdr = csv.reader(f)
    header = next(rdr)
    
    wr = csv.writer(f2)
    wr.writerow(header)
    
    for rd in rdr:
        lv_idx = header.index('level')
        level = rd[lv_idx]
        if '준' in level:
            new_level = level.strip('준').strip('급') + '1'
        else:
            new_level = level.strip('급') + '0'
        new_line = rd[:lv_idx] + [new_level] + rd[(lv_idx+1):]
        wr.writerow(new_line)