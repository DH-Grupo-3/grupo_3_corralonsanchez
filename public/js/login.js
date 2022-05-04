const formulario = document.getElementById('login');
const inputs = document.querySelectorAll('#login input');
const regExpresiones = {	
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{8,12}$/
};

const campos = {
	email: false,
	password: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "email":
            validarCampo(regExpresiones.email, e.target, 'email');
        break;
        case "password":
            validarCampo(regExpresiones.password, e.target, 'password');
        break;
    };
}

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document
			.querySelector(`#grupo__${campo} .formulario__validacion-estado`)
			.classList.remove('fa-circle-xmark');
		document
			.querySelector(`#grupo__${campo} .formulario__validacion-estado`)
			.classList.add('fa-circle-check');
		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document
			.querySelector(`#grupo__${campo} .formulario__validacion-estado`)
			.classList.add('fa-circle-xmark');
		document
			.querySelector(`#grupo__${campo} .formulario__validacion-estado`)
			.classList.remove('fa-circle-check');
		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
};

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});


formulario.addEventListener("submit", (e) => {
    e.preventDefault(); 
    if ( campos.email && campos.password ) {
		document.getElementById('login__mensaje').classList.remove('login__mensaje-activo');
        formulario.submit();
    } else {
		document.getElementById('login__mensaje').classList.add('login__mensaje-activo');
	}
});

