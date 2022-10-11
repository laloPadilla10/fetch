console.log("Script log test");
/**
 * AVISO: Si funciona el fetch, pero en mostrarUsusario() me da el error 
 * Uncaught TypeError: Cannot read properties of null (reading 'time')
    at mostrarUsuario , ya investigue y es por el orden, pero ya intenté mover las funciones para que al obtener el dato ya "exista" pero no me sale
 */

function solicitudFetch() {
    fetch("https://reqres.in/api/users?delay=2")//le quite la n a reqres.in
        .then((response) => response.json())
        .then(json => {
            const markup = json.data.map(element => {
                return `
            <tr>
            <th scope="row">${element.id}</th>
            <td>${element.email}</td>
            <td>${element.first_name}</td>
            <td>${element.last_name}</td>
            <td><img src="${element.avatar}" alt="avatar" class="rounded-circle mx-auto"
            style="width: 50px"></td>
            </tr>
            `
            })
            //console.log("Aqui esta markup: " + markup.join(''));
            document.querySelector(`.renglon`).innerHTML = markup.join('');
            usarLocalStorage(markup);
            //console.log("solicitudFetch() markup" + markup);
            return "Todo bien :)";
        })
        .then(msj => console.log("Retorno del then anterior: " + msj))
        .catch(err => {
            //procesando el error
            console.log(err);
        });
}

function mostrarUsuario() {
    console.log("Mostrar Usuario");
    let i=0;
    do {
        solicitudFetch();
        i++;
    } while (i<1);
    const user = JSON.parse(localStorage.getItem("users"));
    //console.log(`Tiempo: ${user.time}`);
    if (user.time > Date.now()) {
        leerLocalStorage();
        console.log("Se uso Local Storage  " + (user.time - Date.now()) / 1000 + "s después");
    } else {
        solicitudFetch();
        console.log("Solicitud Fetch " + (Date.now() - user.time) / 1000);
    }
}
function usarLocalStorage(datos) {
    //local.Storage.setItem(clave,valor)*************************
    //const cloneMarkup = JSON.parse(JSON.stringify(datos));
    /* const tiempo = {
        "time": Date.now()+10000  
    }; */
    const newMarkup = {
        users: [...datos],
        time: Date.now() + 60000,
    };
    //const markupTwo = JSON.parse(JSON.stringify(newMarkup));
    //const markupTwo = datos;
    //console.log("Entro a usarLocalStorage y este es cloneMarkup: " + cloneMarkup);
    console.log("Entro a usarLocalStorage, newMarkup con stringify: " + newMarkup.time);
    //console.log("Entro a usarLocalStorage y este es newMarkup: " + newMarkup.users);
    //console.log("Entro a usarLocalStorage y este es Markup2: " + markupTwo);

    /* let user = {
        id: objId.value,
        email:objEmail,
        first_name: objFirst.value,
        last_name:objLast.value,
        time: Date.now() + 10000 //leer tiempo actual +1 min
    }
    //Para convertir obj a JSON: JSON.stringify(obj)*/
    //localStorage.setItem("users",JSON.stringify(cloneMarkup.value));
    localStorage.setItem("users", JSON.stringify(newMarkup));
    //localStorage.setItem("tiempo",newMarkup.time);
}

function leerLocalStorage() {
    const usersJSON = (document.querySelector(`.renglon`).innerHTML).join('');
    //Para convertir de JSON a obj: JSON.parse(texto);
    //const user = JSON.parse(localStorage.getItem("user"));
    console.log(usersJSON);
}