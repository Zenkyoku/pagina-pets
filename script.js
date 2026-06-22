document.addEventListener("DOMContentLoaded", () => {

    mostrarSaludo();

    const formulario = document.getElementById("formulario");
    const btnEnviar = document.getElementById("btnEnviar");
    const btnTema = document.getElementById("btnTema");

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const edad = document.getElementById("edad");
    const terminos = document.getElementById("terminos");

    nombre.addEventListener("input", verificarFormulario);
    email.addEventListener("input", verificarFormulario);
    edad.addEventListener("input", verificarFormulario);
    terminos.addEventListener("change", verificarFormulario);

    btnTema.addEventListener("click", cambiarTema);

    formulario.addEventListener("submit", enviarFormulario);

    function mostrarSaludo() {

        const saludo = document.getElementById("saludo");
        const hora = new Date().getHours();

        if (hora < 12) {
            saludo.textContent = "🌅 Buenos días, Maestro Pokewow";
        }
        else if (hora < 20) {
            saludo.textContent = "🌞 Buenas tardes, Maestro Pokewow";
        }
        else {
            saludo.textContent = "🌙 Buenas noches, Maestro Pokewow";
        }
    }

    function cambiarTema() {

        document.body.classList.toggle("modo-oscuro");

        if(document.body.classList.contains("modo-oscuro")){
            btnTema.textContent = "☀️ Modo Claro";
        }
        else{
            btnTema.textContent = "🌙 Modo Oscuro";
        }
    }

    function validarNombre() {

        const error = document.getElementById("errorNombre");

        if(nombre.value.trim() === ""){
            error.textContent = "Debe ingresar un nombre.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validarEmail() {

        const error = document.getElementById("errorEmail");

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!regex.test(email.value)){
            error.textContent = "Ingrese un correo válido.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validarEdad() {

        const error = document.getElementById("errorEdad");

        if(Number(edad.value) < 18){
            error.textContent = "Debes tener al menos 18 años.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function validarTerminos() {

        const error = document.getElementById("errorTerminos");

        if(!terminos.checked){
            error.textContent = "Debes aceptar los términos.";
            return false;
        }

        error.textContent = "";
        return true;
    }

    function verificarFormulario() {

        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const edadValida = validarEdad();
        const terminosValidos = validarTerminos();

        btnEnviar.disabled = !(
            nombreValido &&
            emailValido &&
            edadValida &&
            terminosValidos
        );
    }

    function enviarFormulario(event) {

        event.preventDefault();

        // Capture data before resetting the form
        const datosGuardar = {
            nombre: nombre.value,
            email: email.value,
            edad: edad.value,
        };

        document.getElementById("mensajeExito").textContent =
            `¡Bienvenido al gremio, ${nombre.value}!`;

        guardarFormulario(datosGuardar);
        habilitarRegistros();

        formulario.reset();

        btnEnviar.disabled = true;

        document.getElementById("errorNombre").textContent = "";
        document.getElementById("errorEmail").textContent = "";
        document.getElementById("errorEdad").textContent = "";
        document.getElementById("errorTerminos").textContent = "";
    }

    function guardarFormulario(datos) {

        const cuerpoTabla = document.getElementById("cuerpoTabla");
        
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${datos.nombre}</td>
            <td>${datos.email}</td>
            <td>${datos.edad}</td>
        `;
        
        cuerpoTabla.appendChild(fila);
    };

    function habilitarRegistros() {

        const tabla = document.getElementById("tablaRegistros");
        tabla.style.display = "table"
    }
});