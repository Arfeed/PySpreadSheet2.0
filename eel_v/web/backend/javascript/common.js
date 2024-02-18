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

function switch_theme() {
    
    if (document.getElementById('colors').href == 'http://localhost:8000/frontend/dark.css'){

        document.getElementById('colors').href = 'colors.css'
        eel.set_val(false)
    }
    else{

        document.getElementById('colors').href = 'dark.css'
        eel.set_val(true)
    }
}