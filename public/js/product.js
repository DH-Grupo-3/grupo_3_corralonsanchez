const formulario = document.getElementById('product-form');
const inputs = document.querySelectorAll('#product-form input');
const textArea = document.querySelectorAll('#product-form textarea');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	imagen: /.*(png|jpg|jpeg|gif)$/,
	precio: /^\d+(,\d+)*(\.\d+)?/, //^\d{1,10}$/, // 0 a 10 numeros.
	stock: /^\d{1,10}$/, // 0 a 10 numeros.
	// oferta:
	descripcion: /^[a-zA-ZÀ-ÿ\s]{20,100}$/, // Letras y espacios, pueden llevar acentos.
};

const campos = {
	nombre: false,
	imagen: false,
	precio: false,
	category: false,
	stock: false,
	ofer: false,
	descripcion: false,
};

const validarFormulario = (e) => {
	switch (e.target.name) {
		case 'product_name':
			validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
		case 'product_image':
			validarCampo(expresiones.imagen, e.target, 'imagen');
			break;
		case 'product_price':
			validarCampo(expresiones.precio, e.target, 'precio');
			break;
		case 'product_stock':
			validarCampo(expresiones.stock, e.target, 'stock');
			break;
		case 'ofer':
			break;
		case 'product_description':
			validarText(expresiones.descripcion, e.target, 'descripcion');
			break;
	}
};

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document
			.querySelector(`#grupo__${campo} .formulario__validacion-estado`)
			.classList.add('fa-circle-check');
		document
			.querySelector(`#grupo__${campo} .formulario__validacion-estado`)
			.classList.remove('fa-circle-xmark');
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

const validarText = (expresion, textarea, campo) => {
	if (expresion.test(textarea.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document
			.querySelector(`#grupo__${campo} .formulario__validacion-estado`)
			.classList.add('fa-circle-check');
		document
			.querySelector(`#grupo__${campo} .formulario__validacion-estado`)
			.classList.remove('fa-circle-xmark');
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

textArea.forEach((textarea) => {
	textarea.addEventListener('keyup', validarFormulario);
	textarea.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if (
		campos.nombre &&
		campos.imagen &&
		campos.precio &&
		campos.category &&
		campos.stock &&
		campos.ofer &&
		campos.descripcion
	) {
		// formulario.reset();

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
