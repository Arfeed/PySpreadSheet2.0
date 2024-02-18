import mysql.connector
from mysql.connector.errors import Error

from web.backend.local.error import *
from web.backend.local.logger import Logger

class DataBase():#класс базы данных

    def __init__(self, host : str, user : str, password : str, database : str):
        self.logger = Logger('DataBase', './web/backend/logs/logs.log')
        self.host_name = host
        self.user_name = user
        self.user_password = password
        self.db = database

        try:
            self.connection = self.connect()
        except Error as e:
            self.logger.log(f'Connection is corruped. Error:\n{e}')
            self.logger.log(f'Fail login for user {self.user_name} at host {self.host_name}.')
            raise LoginError()
        else:
            self.logger.log('Connection is OK.')
            self.logger.log(f'Complete login for user {self.user_name} at host {self.host_name}.')

    def connect(self):#метод для подключения
        connection = mysql.connector.connect(
            host=self.host_name,
            user=self.user_name,
            passwd=self.user_password,
            database=self.db
        ) 
        
        return connection

    def make_command(self, command : str, is_change : bool):#метод для выполнения команл скюл
        try:
            self.cursor = self.connection.cursor(buffered=True)
            self.logger.log('Cursor for command is OK.')
            
            if is_change:#если второй аргумент тру, то команда должна что-то добавлять\изменять\удалять, а если фолз, то возвращать штуки
                print(command)
                self.cursor.execute(command)
                self.cursor.close()
                self.cursor = self.connection.cursor(buffered=True)
                self.connection.commit()
                self.logger.log(f"Command '{command}' completed with is_change = True.")
                return 0
            
            else:
                print(command)
                self.cursor.execute(command)
                res = self.cursor.fetchall()
                self.cursor.close()
                self.cursor = self.connection.cursor(buffered=True)
                self.logger.log(f"Command '{command}' completed with is_change = False.")
                return res
            
        except AttributeError as e:
            self.logger.log(f'Cursor for command is corruped. Error:\n{e}')
            return 1
                 
        except Error as e:
            self.logger.log(f'Command complete is corruped.Error:\n{e}')
            return e
            
        