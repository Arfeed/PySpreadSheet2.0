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