import eel
import gc

from web.backend.local.dbOperations import DataBase
from mysql.connector.errors import Error

class Instance:#для выовда селекта

    number = []

    def __init__(self, db : DataBase, command):
        Instance.db = db
        Instance.result = db.make_command(command, False)
        Instance.number.append(self)
    
    def __del_garbage():
        print(Instance.number)
        if len(Instance.number) > 3:
            print(gc.collect())

    @eel.expose
    def show_r():
        if Error in type(Instance.result).__bases__:
            eel.show_error()
            return False
        else:
            eel.load_tables_inst(Instance.result)
    
    @eel.expose
    def give_result():
        return Instance.result
