eel.expose(set_data)
function set_data(data){
    let arr = [document.getElementById('host'), document.getElementById('user'), document.getElementById('password'), document.getElementById('database')]
    for (let i = 0; i < 4; i++){
        arr[i].value = data[i]

    }

    document.getElementById('remember').checked = true
}

eel.expose(alert_connect)
function alert_connect(text){alert(text)}

eel.expose(tch_connect)
function tch_connect(){window.location.href = 'http://localhost:8000/frontend/table_chose.html'}

eel.expose(connect_switch)
function connect_switch(){switch_theme()}

function switch_theme() {
    
    if (document.getElementById('stylesheet').href == 'http://localhost:8000/frontend/dark.css'){

        document.getElementById('stylesheet').href = 'connect.css'
        eel.dt_connect(false)

    }
    else{

        document.getElementById('stylesheet').href = 'dark.css'
        eel.dt_connect(true)

    }

}
