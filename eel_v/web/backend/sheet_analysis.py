import eel

from web.backend.local.dbOperations import DataBase

class Analyser:
    def __init__(self, db : DataBase, table):
        Analyser.db = db
        Analyser.table = table

    @eel.expose
    def make_analysis(type, *args):
        if type == 'view_procent':
            col_data = Analyser.db.make_command(f"SELECT `{args[0]}` from {Analyser.table};", False)
            unique_vals = set(col_data)
            data_procent = []
            for val in unique_vals:
                data_procent.append(round(col_data.count(val)/len(col_data)*100, 2))
        
            return list(unique_vals), data_procent
        
        if type == 'procent_proportion':
            col_data = Analyser.db.make_command(f"SELECT `{args[0]}` from {Analyser.table};", False)
            print(col_data)

    @eel.expose
    def get_col_names():
        return Analyser.db.make_command(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{Analyser.table}';", False)
        