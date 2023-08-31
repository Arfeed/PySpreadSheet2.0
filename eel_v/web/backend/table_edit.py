import eel

from web.backend.local.table_handler import Handler
from web.backend.local.dbOperations import DataBase
from web.backend.local.error import *

class Editor:#класс интерфейса
    def __init__(fles, db : DataBase, table):#инициализация класса
        Editor.db = db
        Editor.table = table
        Editor.handler = Handler(Editor.db, Editor.table)
    
    @eel.expose
    def set_table():
        print(Editor.handler.cols_data)
        eel.show_t(Editor.handler.get(), Editor.handler.cols_data, Editor.db.make_command(f'SELECT RC.TABLE_NAME, RC.REFERENCED_TABLE_NAME, KCU.COLUMN_NAME, KCU.REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS RC JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE KCU USING(CONSTRAINT_NAME) WHERE RC.TABLE_NAME = "{Editor.table}";', False))
    
    @eel.expose
    def save(table_d):
        try:
            Editor.handler.save(table_d)
            eel.alert_edit("Успешно сохранено!")
            
        except QueryError as e:
            eel.handle_exception(e.err_index)
        except TableCreateError as e:
            eel.alert_edit('Ошибка в данных таблицы!')
        except CellValueError as e:
            eel.alert_edit('Ошибка в данных ячеек!')
        
        
    @eel.expose
    def new_r():
        eel.new_row(len(Editor.handler.cols_data))
        
    @eel.expose
    def recreate(table):
        Editor.__init__(Editor, Editor.db, table)