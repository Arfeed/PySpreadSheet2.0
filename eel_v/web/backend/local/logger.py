from datetime import datetime

class Logger:
    def __init__(self, name, path_to_log):
        self.name = name
        self.log_file = open(path_to_log, 'a')
        self.log('Program Start Here')
    
    def log(self, text):
        self.log_file.write(f'{self.name}:{str(datetime.now())}:{str(text)}\n')
        self.log_file.flush()