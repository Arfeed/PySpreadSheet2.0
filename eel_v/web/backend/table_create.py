import eel

from web.backend.local.dbOperations import DataBase
from mysql.connector.errors import DatabaseError

class TableCreate:
    def __init__(self, db : DataBase):
        TableCreate.db = db
    
    @eel.expose
    def create_table(table_data):  
        
        query = f'create table {table_data[0]}('
        
        for col in table_data[1]:
            if col[1] == 'varchar':
                query += f'{col[0]} {col[1]}({table_data[2]}) '
            else:
                query += f'{col[0]} {col[1]} '
                
            for param in col[2]:
                query += ' ' + param
            
            if col != table_data[1][-1]:
                query += ', '
        
        query += ');'
        
        if TableCreate.test_for_error(TableCreate.db.make_command(query, True)):
            eel.alert_create('Таблица не была создана!')
            return False
        else:
            eel.alert_create('Таблица создана успешно!')
        
        return True

    def test_for_error(exp):#проверка на ошибку
        if DatabaseError in type(exp).__bases__:
            return True
    
        else:
            return False