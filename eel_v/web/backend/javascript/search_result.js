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

    eel.get_search_result()().then(show_table, function(){})

}

function switch_theme() {
    
    if (document.getElementById('stylesheet').href == 'http://localhost:8000/frontend/dark.css'){

        document.getElementById('stylesheet').href = 'search_result.css'
        document.getElementById('colors').href = 'colors.css'
        eel.set_val(false)
    }
    else{

        document.getElementById('stylesheet').href = 'dark.css'
        document.getElementById('colors').href = ''
        eel.set_val(true)
    }

}

function load_tables(table, support_table){


    for (let i = 0; i < table.length; i++){
        let tr = document.createElement('tr')
        tr.id = 'row'

        for (let j = 0; j < table[i].length; j++){
            let td = document.createElement('td')
            let em = document.createElement('em')
            em.innerHTML = table[i][j]

            td.appendChild(em)
            tr.appendChild(td)

        }
        support_table.appendChild(tr)
    }
}


function show_table(res){
    let table = document.getElementById('main')

    for (let i = 0; i < res.length; i++){

        let support_table = document.createElement('table')
        let tr = document.createElement('tr')
        let td = document.createElement('td')
        let center = document.createElement('center')
        let work_div = document.createElement('div')
        let h1 = document.createElement('h1')

        console.log(res[i])

        h1.innerHTML = res[i][0]
        work_div.className = 'el_div'
        support_table.border = '1'

        load_tables(res[i][1], support_table)

        work_div.appendChild(h1)
        center.appendChild(support_table)
        work_div.appendChild(center)
        td.appendChild(work_div)
        tr.appendChild(td)
        table.appendChild(tr)

    }

}