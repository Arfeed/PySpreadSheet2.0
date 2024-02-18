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
    console.log(res)
    if (res.length == 0){

        cnt = document.createElement('center')
        tmp = document.createElement('h1')
        tmp.innerHTML = 'Ничего не найдено'
        cnt.appendChild(tmp)
        document.body.appendChild(cnt)
        return

    }
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