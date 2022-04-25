const formulario = document.getElementById('register');
const inputs = document.querySelectorAll('#register input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	cel: /^\d{7,14}$/, // 7 a 14 numeros.
	dni: /^\d{1,10}$/, // 0 a 10 numeros.
	address: /^[a-zA-Z0-9À-ÿ\s ]{1,40}$/, //
	birth: /^.{10,14}$/,
};

const campos = {
	full_name: false,
	dni: false,
	cel: false,
	address: false,
	email: false,
	password: false,
	date_of_birth: false,
};

const validarFormulario = (e) => {
	switch (e.target.name) {
		case 'full_name':
			validarCampo(expresiones.nombre, e.target, 'full_name');
			break;
		case 'dni':
			validarCampo(expresiones.dni, e.target, 'dni');
			break;
		case 'cel':
			validarCampo(expresiones.cel, e.target, 'cel');
			break;
		case 'address':
			validarCampo(expresiones.address, e.target, 'address');
			break;
		case 'email':
			validarCampo(expresiones.email, e.target, 'email');
			break;
		case 'password':
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
			break;
		case 'date_of_birth':
			validarCampo(expresiones.birth, e.target, 'date_of_birth');
			break;
		case 'password2':
			validarPassword2();
			break;
	}
};

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

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('pass1');
	const inputPassword2 = document.getElementById('pass2');
	if (inputPassword1.value !== inputPassword2.value) {
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document
			.querySelector(`#grupo__password2 .formulario__validacion-estado`)
			.classList.add('fa-circle-xmark');
		document
			.querySelector(`#grupo__password2 .formulario__validacion-estado`)
			.classList.remove('fa-circle-check');
		document
			.querySelector(`#grupo__password2 .formulario__input-error`)
			.classList.add('formulario__input-error-activo');
		campos[password] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document
			.querySelector(`#grupo__password2 .formulario__validacion-estado`)
			.classList.remove('fa-circle-xmark');
		document
			.querySelector(`#grupo__password2 .formulario__validacion-estado`)
			.classList.add('fa-circle-check');
		document
			.querySelector(`#grupo__password2 .formulario__input-error`)
			.classList.remove('formulario__input-error-activo');
		campos[password] = true;
	}
};

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if (
		campos.full_name &&
		campos.dni &&
		campos.cel &&
		campos.address &&
		campos.email &&
		campos.password &&
		campos.date_of_birth
	) {
		document
			.getElementById('formulario__mensaje-exito')
			.classList.add('formulario__mensaje-exito-activo');
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		setTimeout(() => {
			document
				.getElementById('formulario__mensaje-exito')
				.classList.remove('formulario__mensaje-exito-activo');
		}, 3000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');

			setTimeout(() => {
				formulario.submit();
			}, 3000);
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});

