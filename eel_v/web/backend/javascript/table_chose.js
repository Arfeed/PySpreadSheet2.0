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

eel.expose(to_connect)
function to_connect(){window.location.href = 'http://localhost:8000/frontend/connect.html'}

eel.expose(to_instance)
function to_instance(){window.location.href = 'http://localhost:8000/frontend/table_instance.html'}

eel.expose(table_chose_switch)
function table_chose_switch(){console.log('a');switch_theme()}


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
    eel.make_command(command.value)
}

function clear(){
    let table = document.querySelector('table#main_table')

    table.remove()
    table = document.createElement('table')
    table.id = 'main_table'
    let div = document.querySelector('div')

    div.appendChild(table)
}

function go_to_create(){
    eel.to_create()
    window.location.href = 'http://localhost:8000/frontend/table_create.html'
}

function switch_theme() {
    
    if (document.getElementById('stylesheet').href == 'http://localhost:8000/frontend/dark.css'){

        document.getElementById('stylesheet').href = 'table_chose.css'
        eel.dt_table_chose(false)

    }
    else{

        document.getElementById('stylesheet').href = 'dark.css'
        eel.dt_table_chose(true)

    }

}