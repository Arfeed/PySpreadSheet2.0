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

function give_data(){

    eel.take_data([document.getElementById('host').value, document.getElementById('user').value, document.getElementById('password').value, document.getElementById('database').value], document.getElementById('remember').value)().then(function(value){

        if (value){

            window.location.href = 'http://localhost:8000/frontend/table_chose.html'

        }
    })
}

function switch_theme() {
    
    if (document.getElementById('stylesheet').href == 'http://localhost:8000/frontend/dark.css'){

        document.getElementById('stylesheet').href = 'connect.css'
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
                eel.process_string(xhr.responseText)().then(function(value){console.log(value)})
                eel.process_string(xhr.responseText)().then(function(value){if (value){switch_theme()}})
            }
        }
    }

}
