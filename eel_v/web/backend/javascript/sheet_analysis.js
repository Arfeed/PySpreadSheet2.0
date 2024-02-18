function set_opt(){

    let select = document.getElementById('select');
    eel.get_col_names()().then(function(result){
        for (let i = 0; i < result.length; i++){
            let option = document.createElement('option');
            option.value = result[i];
            option.textContent = result[i];
            select.appendChild(option);
        }
    })

}

function get_vp(){
    return document.getElementById('select').value
}

function get_pp(){
    return (document.getElementById('s1').value, document.getElementById('s2').value)
}

function analysis(type){
    clear()

    funcs = {

        'view_procent' : get_vp,
        'procent_proportion' : get_pp

    }

    args = funcs[type]()
    console.log(args)
    
    eel.make_analysis(type, args)().then(function(result){
        let table = document.querySelector('table#main')
        for (let i = 0; i < result[0].length; i++){
                
            let tr = document.createElement('tr')
            let td1 = document.createElement('td')
            let td2 = document.createElement('td')
            td1.append(result[0][i])
            td2.append(result[1][i] + "%")
            tr.append(td1)
            tr.append(td2)
            table.append(tr)

        }

    })
}

function clear(){
    let table = document.querySelector('table#main')

    table.remove()
    table = document.createElement('table')
    table.id = 'main'
    table.border="2px"

    document.body.appendChild(table)
}