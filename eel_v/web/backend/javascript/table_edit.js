eel.set_table()

eel.expose(show_t)
function show_t(table_data, data, foreign_data){
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

eel.expose(new_row)
function new_row(num){

    let row = num
    let table = document.querySelector('table#main')

    let tr = document.createElement('tr')
    tr.id = 'row'

    for (let i = 0; i < row; ++i){


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

eel.expose(go_to_connect_edit)
function go_to_connect_edit(){window.location.href = 'http://localhost:8000/frontend/connect.html'}


function go_to_foreign(table){
    eel.recreate(table)
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
    }
    else{

        document.getElementById('stylesheet').href = 'dark.css'
    }

}

function save(){eel.save(get())}

function add_new(){eel.new_r()}