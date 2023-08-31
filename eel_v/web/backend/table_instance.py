import eel

from web.backend.local.dbOperations import DataBase
from mysql.connector.errors import Error

class Instance:#для выовда селекта
    def __init__(fels, db : DataBase, command):
        Instance.db = db
        Instance.result = db.make_command(command, False)
        
    @eel.expose
    def show_r():
        if Error in type(Instance.result).__bases__:
            eel.show_error()
            return 1
        else:
            eel.load_tables_inst(Instance.result)
