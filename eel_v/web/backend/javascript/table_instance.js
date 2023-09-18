eel.show_r()

eel.expose(load_tables_inst)
function load_tables_inst(result){

    let table = document.querySelector('table')

    for (let i = 0; i < result.length; i++){
        let tr = document.createElement('tr')
        tr.id = 'row'

        for (let j = 0; j < result[i].length; j++){
            let td = document.createElement('td')
            let em = document.createElement('em')
            em.innerHTML = result[i][j]

            td.appendChild(em)
            tr.appendChild(td)

        }
        table.appendChild(tr)
    }
}

eel.expose(show_error)
function show_error(){
    let table = document.querySelector('table')
    let tag = document.createElement('h2')
    tag.textContent = "Ошибка при загрузке таблицы!"
    table.appendChild(tag)
}

function switch_theme() {
    
    if (document.getElementById('stylesheet').href == 'http://localhost:8000/frontend/dark.css'){

        document.getElementById('stylesheet').href = 'table_instance.css'
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
            if (xhr.status == 200) {console.log(xhr.responseText);
                eel.process_string(xhr.responseText)().then(function(value){if (value){switch_theme()}})
            }
        }
    }

}
