from web.backend.local.error import *
from web.backend.local.dbOperations import DataBase
from mysql.connector import DatabaseError, Error

class Handler():#класс хендлера таблиц
    def __init__(self, db : DataBase, table):
        self.db = db
        self.table = table
        self.cols_data = self.db.make_command(f"SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '{self.table}';", False)
        self.col_types = self.db.make_command(f'SELECT DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = "{self.table}";', False)
        self.have_ref = False
        
        is_it = self.db.make_command(f'SELECT TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE REFERENCED_TABLE_NAME = "{self.table}";', False)
        if is_it:
            self.have_ref = True
    
    def save(self, data):#метод сохранения
        self.data = data
        is_foreign = False
        foreigns = []
        ct_query = f'create table {self.table}('
        cols_names = []

        for col in self.cols_data:
            cols_names.append(col[3])
        

        for col in self.cols_data:#генерация запроса create table
            tmp_ct_query = ''
            tmp_ct_query += col[3] + ' '#+ название

            if col[7] == 'varchar':#есть ли варчары
                tmp_ct_query += f'{col[7]}({col[8]})' + ' '
            else:
                tmp_ct_query += str(col[7]) + ' '
                
            if col[16] == 'PRI':#проверка на примари кей
                tmp_ct_query += 'primary key' + ' '

            elif col[16] == 'MUL':
                foreigns.append(col[3])
                is_foreign = True

            else:
                pass

            if col[17] == 'auto_increment':#проверка на инкремент
                tmp_ct_query += 'auto_increment' + ' '
            else:
                pass
            
            if col != self.cols_data[-1] or is_foreign:#проверка на конец
                tmp_ct_query += ', '

            ct_query += tmp_ct_query
        
        if is_foreign:
            ct_query += self.create_foreign(self.db.make_command(f'SELECT RC.TABLE_NAME, RC.REFERENCED_TABLE_NAME, KCU.COLUMN_NAME, KCU.REFERENCED_COLUMN_NAME FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS RC JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE KCU USING(CONSTRAINT_NAME) WHERE RC.TABLE_NAME = "{self.table}";', False))
        
        ct_query += ');'
        
        iv_querys = []
        iv_query = f'insert into {self.table}('
        iv_tmp_query = ''
        border = len(cols_names) - 1
        for i in range(len(cols_names)):
            
            if self.cols_data[i][17] == 'auto_increment':
                continue
            else:
                pass
            if i != border:
                iv_tmp_query += cols_names[i] + ', '
            else:
                iv_tmp_query += cols_names[i]
        
        iv_query += iv_tmp_query

        iv_query += ') values('
        iv_tmp_query = iv_query

        for i in range(len(self.data)):#генерация insert запроса
            for j in range(len(self.data[i])):
                flag = False

                #проверка на ошибки
                if (self.cols_data[j][7] == 'varchar' or self.cols_data[j][7] == 'text') and self.type_check(self.data[i][j], str):#проверка на стр
                    pass
                    
                elif (self.cols_data[j][7] == 'tinyint' or self.cols_data[j][7] == 'int') and  self.data[i][j].isdigit():#проверка на инт
                    self.data[i][j] = int(self.data[i][j])
                
                else:
                    flag = True   
                
                if flag:
                    raise QueryError(self.cols_data[j][7], (i, j))

                border = len(self.data[i]) - 1
                
                #добавление значений в запрос
                if self.cols_data[j][7] == 'varchar' or self.cols_data[j][7] == 'text':

                    if j == border:

                        iv_query += f'"{self.data[i][j]}"'
                        continue

                    iv_query += f'"{self.data[i][j]}", '
                    continue
                
                if self.cols_data[j][16] == 'MUL':
                    pass

                if self.cols_data[j][17].lower() == 'auto_increment':
                    continue
            
                if j == border:

                    iv_query += str(self.data[i][j])
                    continue

                iv_query += str(self.data[i][j]) + ', '
            
            iv_query += ');'
            iv_querys.append(iv_query)
            iv_query = iv_tmp_query
        
        self.override_table(ct_query, iv_querys)

        return 0
    
    def type_check(self, object, necessary_type):
        if type(object) != necessary_type:
            return False
        
        else:
            return True

    def override_table(self, ct_query, iv_querys):#метод перезаписи таблицы
        self.test_for_error(self.db.make_command(f"drop table {self.table};", True))

        if self.test_for_error(self.db.make_command(ct_query, True)):
            raise TableCreateError()
        
        for el in iv_querys:
            if self.test_for_error(self.db.make_command(el, True)) == 1:
                raise CellValueError()
            
            else:
                pass
        
        return 0
    
    def create_foreign(self, data):#создание части с фореигн кей(сложна очень(нет(наверное)))
        result_tmp = 'foreign key ('
        result = result_tmp
        for i in range(len(data)):
            for el in data:#имена колонок в этой табице
                if el[1] == data[i][1]:
                    try:
                        if data[i + 1][1] == el[1]:
                            result += el[2] + ', '
                        
                        else:
                            result += el[2]
                            break
                    
                    except IndexError:
                        result += el[2]
                        break
                else:
                    continue

            result += f') references {data[i][1]} ('
            for el in data:#именя колонок в другой таблице
                if el[1] == data[i][1]:
                    try:
                        if data[i + 1][1] == el[1]:
                            result += el[3] + ', '
                        
                        else:
                            result += el[3]
                            break
                    
                    except IndexError:
                        result += el[3]
                        break
                else:
                    continue
            
            if data[i] != data[-1]:#есть ли еще?
                result += '), '
                result += result_tmp
            
            else:
                result += ')'
        
        return result
        
    
    def get(self):return self.db.make_command(f'select * from {self.table};', False)
    def test_for_error(self, exp):return True if DatabaseError in type(exp).__bases__ or Error in type(exp).__bases__ else False#проверка на ошибку