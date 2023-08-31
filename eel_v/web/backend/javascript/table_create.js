eel.expose(go_to_tch)
function go_to_tch(){window.location.href = 'http://localhost:8000/frontend/table_chose.html'}

eel.expose(alert_create)
function alert_create(text){alert(text)}

add_column()

function add_column(){

    let table = document.querySelector('table#main')

    let tr = document.createElement('tr')
    tr.id = "I" + String(table.querySelectorAll('tr').length)

    let name_td = document.createElement('td')
    let type_td = document.createElement('td')
    let plus_td = document.createElement('td')

    plus_td.id = "I" + String(table.querySelectorAll('tr').length)

    let name = document.createElement('input')
    name.className = "name"
    name.value = "Имя колонки"
 
    let type = document.createElement('select')
    type.options[0] = new Option('INT', 'int')
    type.options[1] = new Option('TEXT', 'text')
    type.options[2] = new Option('VARCHAR', 'varchar')
    type.className = "type"
    type.id = "I" + String(table.querySelectorAll('tr').length)

    let new_option = document.createElement('button')
    new_option.textContent = "+"
    new_option.className = 'plus_button'
    new_option.id = "I" + String(table.querySelectorAll('tr').length)
    new_option.onclick = add_new_option
    
    type.addEventListener('change', function(e){

        if (e.target.value === 'varchar'){

            let curret_tr = document.querySelector('tr#' + e.target.id)
            let button_td = curret_tr.querySelector('td#' + e.target.id)

            let new_inp_td = document.createElement('td')
            let new_inp = document.createElement('input')

            new_inp.className = 'length'
            new_inp.value = 'Длина'
            new_inp.size = 13

            new_inp_td.appendChild(new_inp)

            curret_tr.removeChild(button_td)
            curret_tr.appendChild(new_inp_td)
            curret_tr.appendChild(button_td)

        }

        else if (e.target.value === 'int'){}
        else if (e.target.value === 'text'){}

        else{

            delete_column()
            add_column()

        }

    })

    name_td.appendChild(name)
    type_td.appendChild(type)
    plus_td.appendChild(new_option)

    tr.appendChild(name_td)
    tr.appendChild(type_td)
    tr.appendChild(plus_td)

    table.appendChild(tr)

}

function add_new_option(){

    let curret_tr = document.querySelector('tr#' + this.id)
    let button_td = curret_tr.querySelector('td#' + this.id)

    let new_op_td = document.createElement('td')
    let new_selector = document.createElement('select')

    new_selector.className = 'param'
    new_selector.options[0] = new Option('Ничего', ' ')
    new_selector.options[1] = new Option('Авто-инкремент', 'auto_increment')
    new_selector.options[2] = new Option('Первичный ключ', 'primary key')
    

    new_op_td.appendChild(new_selector)

    curret_tr.removeChild(button_td)
    curret_tr.appendChild(new_op_td)
    curret_tr.appendChild(button_td)

}

function delete_column(){

    let table = document.querySelector('table#main')
    let last = table.querySelectorAll('tr')

    if (last.length > 0){

        last = last.item(last.length - 1)
        table.removeChild(last)

    }
    else{

        return

    }

}

function done(){

    let table = document.querySelector('table#main')
    let trs = table.getElementsByTagName('tr')
    let cols = []

    for (let i = 0; i < trs.length; i++){

        let col = []
        col[0] = trs[i].getElementsByClassName('name').item(0).value
        col[1] = trs[i].getElementsByClassName('type')[0].value
        col[2] = []
        let params = trs[i].getElementsByClassName('param')

        for (let j = 0; j < params.length; j++){

            col[2][j] = params.item(j).value

        }

        cols[i] = col

    }
    
    if (table.querySelectorAll('tr').length > 0){

        eel.create_table([document.getElementById('name').value, cols, table.querySelectorAll('tr').length])

    }

    else if(document.getElementById('name').value == ''){alert('Назовите свою таблицу!')}

    else{alert('Должен быть хотя-бы 1 столбец!')}
}

function switch_theme() {
    
    if (document.getElementById('stylesheet').href == 'http://localhost:8000/frontend/dark.css'){

        document.getElementById('stylesheet').href = 'table_create.css'
    }
    else{

        document.getElementById('stylesheet').href = 'dark.css'
    }

}