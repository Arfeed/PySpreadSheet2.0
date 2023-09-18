eel.load_tables()

eel.expose(add_table)
function add_table(names){
    let table = document.querySelector('table#main_table')

    for (let i = 0; i < names.length; i++){
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        let btn = document.createElement('button')

        btn.textContent = names[i][0]
        btn.id = names[i][0]
        btn.className = 'btn'
        btn.onclick = on_table.bind(null, names[i][0])

        td.appendChild(btn)
        tr.appendChild(td)
        table.appendChild(tr)
    }
}

eel.expose(ask)
function ask(question){return confirm(question)}

eel.expose(alert_chose)
function alert_chose(text){alert(text)}

eel.expose(reload)
function reload(){clear();eel.load_tables()}

function delete_last(){
    eel.delete_last_table()
    reload()
}

function on_table(name){
    eel.open_table(name)
    window.location.href = "http://localhost:8000/frontend/table_edit.html"
}

function make_command(){
    var command = document.getElementById('command')
    eel.make_command(command.value)().then(function(value){
        if (value){
            window.location.href = 'http://localhost:8000/frontend/table_instance.html'
        }
    })

}

function clear(){
    let table = document.querySelector('table#main_table')

    table.remove()
    table = document.createElement('table')
    table.id = 'main_table'
    let div = document.querySelector('div')

    div.appendChild(table)
}

function search_value(){

    var search_target = document.getElementById('search_value')
    eel.search(search_target.value)
    window.location.href = 'http://localhost:8000/frontend/search_result.html'

}

function go_to_create(){
    eel.create()
    window.location.href = 'http://localhost:8000/frontend/table_create.html'
}

function switch_theme() {
    
    if (document.getElementById('stylesheet').href == 'http://localhost:8000/frontend/dark.css'){

        document.getElementById('stylesheet').href = 'table_chose.css'
        document.getElementById('colors').href = 'colors.css'
        eel.set_val(false)

    }
    else{

        document.getElementById('stylesheet').href = 'dark.css'
        document.getElementById('colors').href = ''
        eel.set_val(true)

    }

}

function onload(){

    var url = "../backend/user/settings.ini"
    var xhr = new XMLHttpRequest()

    xhr.open('GET', url)
    xhr.send()

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                eel.process_string(xhr.responseText)().then(function(value){
                    if (value){
                        switch_theme()
                    }
                })
            }
        }
    }

}
