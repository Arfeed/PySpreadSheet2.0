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