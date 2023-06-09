const tarjeta = document.querySelector('#tarjeta'),
    btnAbrirFomulario= document.querySelector('#btn-openform'),
    formulario = document.querySelector('#formulario-tarjeta'),
    numeroTarjeta = document.querySelector('#tarjeta .numero'),
    nombreTarjeta = document.querySelector('#tarjeta .nombre'),
    logo = document.querySelector('#logo'),
    firma = document.querySelector('#tarjeta .firma p'),
    mes = document.querySelector('#tarjeta .mes'),
    year = document.querySelector('#tarjeta .year'),
    ccv = document.querySelector('#tarjeta .ccv');

// Volteamos tarjeta hacia el frente.
const mostrarFrente = () => {
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active');
    }
}
/* Giro de la tarjeta */
tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});

/*Abrir el menu deslizable*/

btnAbrirFomulario.addEventListener('click', () => {
    btnAbrirFomulario.classList.toggle('active');
    formulario.classList.toggle('active');
});

/* Mes input */
for(let i=1; i<13; i++) {
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}

/* Año input */
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8 ; i++){
    let opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}

/* Input numero de tarjeta */
formulario.inputNumero.addEventListener('keyup',(e)=>{
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput
    //Expresiones regulares
    //Eliminando espacios en blanco
    .replace(/\s/g,'')
    //Eliminando las letras
    .replace(/\D/g,'')
    //Espacios cada 4 numeros
    .replace(/([0-9]{4})/g,'$1 ')
    //Elimina el ultimo espaciado
    .trim();

    numeroTarjeta.textContent = valorInput;

    if(valorInput == ''){
        numeroTarjeta.textContent = '#### #### #### ####';
    }

    if(valorInput[0] == 4){
        logo.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = 'img/visa.png';
        logo.appendChild(imagen);
    } else if (valorInput[0] == 5){
        logo.innerHTML = '';  
        const imagen = document.createElement('img');
        imagen.src = 'img/Mastercard.png';
        logo.appendChild(imagen);
    }

    //Voltear la tarjeta dependiendo a lo que el usuario escriba
    mostrarFrente();

})

// Input Nombre de la tarjeta

formulario.inputNombre.addEventListener('keyup',(e)=>{
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if(valorInput == ''){
        nombreTarjeta.textContent = 'Robinson Marcos';
    }
    mostrarFrente();
});

// Select mes
formulario.selectMes.addEventListener('change', (e) => {
    mes.textContent = e.target.value;
    mostrarFrente();
});
// Select año
formulario.selectYear.addEventListener('change', (e) => {
    year.textContent = e.target.value.slice(2);
    mostrarFrente();
});

//CCV
formulario.inputCCV.addEventListener('keyup', () => {
    if(!tarjeta.classList.contains('active')){
        tarjeta.classList.toggle('active');
    }

    formulario.inputCCV.value = formulario.inputCCV.value
    //Eliminando espacios en blanco
    .replace(/\s/g,'')
    //Eliminando las letras
    .replace(/\D/g,'');

    ccv.textContent = formulario.inputCCV.value;
});