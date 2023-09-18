import eel

from web.backend.table_instance import Instance
from web.backend.local.dbOperations import DataBase
from mysql.connector.errors import Error, DatabaseError

class Execute:

    #инициализация
    def __init__(self, db : DataBase):
        self.db = db
    
    def handle(self, command):
        if command.lower().startswith('select'):#если начинается с селект
            res = self.db.make_command(command, True)
            if not (Error in type(res).__bases__ or DatabaseError in type(res).__bases__):
                Instance(self.db, command)
                return True
            else:
                eel.alert_chose("Ошибка! Результат - " + str(res))
                eel.reload()
                return False

        elif command.lower().startswith('drop'):#если начинается с дроп
            if eel.ask('Вы собираетесь что-то удалить. Вы уверены?')():
                res = self.db.make_command(command, True)
                if Error in type(res).__bases__ or DatabaseError in type(res).__bases__:
                    eel.alert_chose("Ошибка! Результат - " + str(res))
                    eel.reload()
                    return False
                eel.reload()
                return True
            else:
                return False
        
        else:#если команда-ноунейм
            res = self.db.make_command(command, True)
            if Error in type(res).__bases__ or DatabaseError in type(res).__bases__:
                    eel.alert_chose("Ошибка! Результат - " + str(res))
                    eel.reload()
                    return False
            eel.alert_chose("Успешно! Результат - " + str(res))
            eel.reload()
            return True