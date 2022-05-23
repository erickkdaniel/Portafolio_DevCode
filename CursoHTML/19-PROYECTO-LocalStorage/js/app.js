//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



//Event Listeners<>
eventListeners();
function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit',agregarTweet);
    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded',() => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);

        crearHTML();
    });
}

//Funciones

function agregarTweet(e){
    e.preventDefault();


    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validacion
    if(tweet === ''){
        mostrarError('El tweet no puede ser vacio')
        return;//Detiene la ejecucion de mas codigo
    }
    const tweetObj = {
    id: Date.now(),
    tweet:tweet

    }
    //Añadir a arreglo de tweets
    tweets = [...tweets, tweetObj];

    //Crear HTML
    crearHTML();
    console.log(tweets);
    //Reiniciar formulario
    formulario.reset();

}

//Mostrar Mensaje<>
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    //Elimina Alerta despues de 3 segundos
    setTimeout(()=> {
        mensajeError.remove();
    },3000);
}


//Muestra listado de tweets
function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0 ){
        tweets.forEach(tweet => {
            //Agregar boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir la funcion eliminar
            btnEliminar.onclick= () => {
                borrarTweet(tweet.id);
            }

            //Crear HTML
            const li = document.createElement('li');

            //Añadir texto
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //Insertarlo en HTML
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

//Agregar los tweets a LocalStorage
function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));

}

//Elimina tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

function limpiarHTML(){
    while( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}