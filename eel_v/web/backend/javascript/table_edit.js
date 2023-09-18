eel.get_table_data()().then(show_t)

function show_t(main_frame){
    let table_data = main_frame[0]
    let data = main_frame[1]
    let foreign_data = main_frame[2]

    let table = document.querySelector('table#main')
    let tr_1 = document.createElement('tr')
    tr_1.id = "not_row"

    for (let i = 0; i < data.length; i++){
        let td_1 = document.createElement('th')
        let em = document.createElement('em')
        em.textContent = data[i][3] + '(' + data[i][7] + ')'
        td_1.appendChild(em)
        tr_1.appendChild(td_1)
    }

    table.appendChild(tr_1)

    for (let i = 0; i < table_data.length; i++){
        let tr = document.createElement('tr')
        tr.id = "row"

        for (let j = 0; j < table_data[i].length; j++){
            let td = document.createElement('td')
            let inp = document.createElement('input')
            inp.className = "cell"
            inp.value = table_data[i][j]
            if (data[j][16] === "MUL"){
                if (foreign_data[j] !== undefined){
                    inp.oncontextmenu = go_to_foreign.bind(null, foreign_data[j][1])
                }
            }
            td.appendChild(inp)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }

    if (foreign_data.length !== 0){
        let buttons = [document.getElementById('Add'), document.getElementById('Rem'), document.getElementById('save')]
        console.log(buttons)

        for(let i = 0; i < buttons.length; i++){
            buttons[i].setAttribute('disabled', true)
        }
    }
}

eel.expose(handle_exception)
function handle_exception(ind){
    let el = get()[ind[0]][ind[1]]
    el.style.backgroundColor = 'red'
    el.style.color = 'white'
    el.onclick = on_click.bind(null, el)
}

function new_row(len){
    console.log(len)
    let table = document.querySelector('table#main')

    let tr = document.createElement('tr')
    tr.id = 'row'

    for (let i = 0; i < len; ++i){


        let td = document.createElement('td')

        let inp = document.createElement('input')
        inp.className = 'cell'

        td.appendChild(inp)

        tr.appendChild(td)

    }

    table.appendChild(tr)

}

eel.expose(alert_edit)
function alert_edit(text){alert(text)}


function go_to_foreign(table){
    eel.open_table(table)
    window.location.reload()
}

function remove_last(){
    let table = document.querySelector('table#main')
    let rows = table.getElementsByTagName('tr')

    rows[rows.length - 1].remove()
}

function get(){
    let table = document.querySelector('table#main')
    let rows = table.getElementsByTagName('tr')
    let result = []

    for (let i = 1; i < rows.length; i++){
        let a = []
        let els = rows[i].getElementsByTagName('input')

        for (let j = 0; j < els.length; j++){
            a[j] = els[j].value  
        }

        result[i] = a
    }

    result.splice(0, 1)

    return result
}

function clear(){
    let table = document.querySelector('table#main')
    let rows = table.getElementsByTagName('tr')

    for (let i = 0; i < rows.length; i++){
        rows[i].remove()
    }
}

function switch_theme() {
    
    if (document.getElementById('stylesheet').href == 'http://localhost:8000/frontend/dark.css'){

        document.getElementById('stylesheet').href = 'table_edit.css'
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
                eel.process_string(xhr.responseText)().then(function(value){if (value){switch_theme()}})
            }
        }
    }

}


function save(){eel.save(get())}