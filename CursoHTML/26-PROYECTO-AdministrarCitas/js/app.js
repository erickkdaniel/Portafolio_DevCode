//Campos del formulario

const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');


//UI
const formulario = document.querySelector('#nueva-cita');

const contenedorCitas = document.querySelector('#citas');

let editando;

class Citas{
    constructor(){
        this.citas = [];
    }
    agregarCita(cita){
        this.citas = [...this.citas,cita];
        console.log(this.citas);
    }
    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id != id )
    }
    editarCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita );
    }
}

class UI{
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if(tipo==='error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Mensaje
        divMensaje.textContent = mensaje;
        
        //Agregar al DOM<>
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'));


        setTimeout(() => {
            divMensaje.remove();
        }, 5000 );

    }
    
    imprimirCitas({citas}){
        this.limpiarHTML();
        citas.forEach( cita =>{
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id=id;

            //scriptin 

            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-tittle','font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            //boton eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => eliminarCita(id);

            //boton editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn','btn-info','mr-2');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = () => cargarEdicion(cita);
            //agregar los parrafos de divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //agregar citas al html
            contenedorCitas.appendChild(divCita);


        } )
    }
    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();


addEventListener();
function addEventListener(){
    mascotaInput.addEventListener('input',datosCita);
    propietarioInput.addEventListener('input',datosCita);
    telefonoInput.addEventListener('input',datosCita);
    fechaInput.addEventListener('input',datosCita);
    horaInput.addEventListener('input',datosCita);
    sintomasInput.addEventListener('input',datosCita);

    formulario.addEventListener('submit',nuevaCita)

}

const citaObj={
    mascota:'',
    propietario:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:''
}

//agregar datos al Obj
function datosCita(e){
    citaObj[e.target.name] = e.target.value;


}

//Valida y agrega nueva cita

function nuevaCita(e){
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    if(mascota ==='' || propietario ==='' || telefono ==='' || fecha ==='' || hora ==='' || sintomas ==='' ){
        ui.imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado Correctamente');

        administrarCitas.editarCita({...citaObj});

        formulario.querySelector('button[type="submit"]').textContent = "Crear Cita";
        editando = false;
    }else{
        //Generar id unico
        citaObj.id = Date.now();
        //Creando nueva cita
        administrarCitas.agregarCita({...citaObj});
        //mensaje agregado
        ui.imprimirAlerta('Se agrego correctamente')
    }


   
   
    //Resets
    reiniciarObjeto();
    formulario.reset();
    //Mostrar en HTML
    ui.imprimirCitas(administrarCitas);

}

function reiniciarObjeto(){
    citaObj.mascota = ''
    citaObj.propietario = ''
    citaObj.telefono = ''
    citaObj.fecha = ''
    citaObj.hora = ''
    citaObj.sintomas = ''
}

function eliminarCita(id){
    //Eliminar cita
    administrarCitas.eliminarCita(id);
    //Mostrar mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');
    //Mostrar Citas
    ui.imprimirCitas(administrarCitas);
}

//carga datos y modo edicion
function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    //Llenar inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;


    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;


    //cambiar texto de boton
    formulario.querySelector('button[type="submit"]').textContent = "Guardar Cambios";

    editando = true;
}
