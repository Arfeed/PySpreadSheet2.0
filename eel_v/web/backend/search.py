import eel
import re

from ..backend.local.dbOperations import DataBase

class Search:
    def __init__(self, target, db : DataBase):
        Search.target = target
        Search.db = db
        Search.result = []
        
        Search.search()

    def search():
        data = []
        tables = Search.db.make_command(f'select table_name from information_schema.tables where table_schema = "{Search.db.db}";', False)

        for i, table in enumerate(tables):
            data.append([table[0], []])
            data[i][1].append(Search.db.make_command(f'select * from {table[0]};', False))

        for table in data:
            Search.result.append([table[0], []])
            for row in table[1][0]:
                form_str = ' '.join(map(lambda x: str(x), row))
                print(form_str)
                if re.search(
                    Search.target, form_str):
                    Search.result[-1][1].append(row)
        
        Search.clean_result(Search.result)
        return 1
    
    def clean_result(arr):
        j = 0
        while j < len(arr):
            if len(arr[j][1]) == 0:
                arr.pop(j)
                j -= 1
            j += 1

        return 1

    @eel.expose
    def get_search_result():return Search.result