//--------------------------------------
//Variables Globales-----------------
//--------------------------------------
var btnIniciaSesion = document.getElementById('btnIniciaSesion');
var btnRegistrate = document.getElementById('btnRegistrate');
var btnUser = document.getElementById('btnUser');
var btnCerrarSesion = document.getElementById('btnCerrarSesion');
var lblBienvenida = document.getElementById('lblBienvenida');
var btnRegistrateModal = document.getElementById('btnRegistrateModal');
var btnCancelaRegistroModal = document.getElementById('btnCancelaRegistroModal');
var btnIniciaSesionModal = document.getElementById('btnIniciaSesionModal');
var btnCancelaInicioModal = document.getElementById('btnCancelaInicioModal');
var iniciaSesionModal = new bootstrap.Modal(document.getElementById('iniciaSesionModal'));
var registroModal = new bootstrap.Modal(document.getElementById('registroModal'));
var usuariosActivos = [];
var btnComprar = document.getElementById('btnComprar');
var btnVender = document.getElementById('btnVender');

//--------------------------------------
//Clases------------------------------
//--------------------------------------
class Usuario{
    constructor(nombre, apellido, email, user, password){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.user = user;
        this.password = password;
    }
    iniciaSesion(){
        btnIniciaSesion.classList.add('d-none');
        btnRegistrate.classList.add('d-none')
        btnUser.classList.remove('d-none');
        lblBienvenida.classList.remove('d-none');
        btnUser.innerHTML = `<i class="fa-solid fa-user pe-2"></i>${this.user}`
    }
    cerrarSesion(){
        btnIniciaSesion.classList.remove('d-none');
        btnRegistrate.classList.remove('d-none')
        btnUser.classList.add('d-none');
        lblBienvenida.classList.add('d-none');
        btnUser.innerHtml = "";
    }
}
class Cambio{
    constructor(cantidadDinero, divisaOrigen, divisaDestino){
        this.cantidadDinero = cantidadDinero;
        this.divisaOrigen = divisaOrigen;
        this.divisaDestino = divisaDestino;
    }
    solesToEuros(){
        return cantidadDinero/3.9330;
    }
    solesToDolares(){
        return cantidadDinero/3.775;
    }

    eurosToSoles(){
        return cantidadDinero*3.9330;
    }
    
    dolaresToSoles(){
        return cantidadDinero*3.775;
    }
}

//--------------------------------------
//Funciones------------------------------
//--------------------------------------
function validaInicioSesion () {
    var lblErrorIniciaSesion = document.getElementById('lblErrorIniciaSesion');
    var txtEmailIniciaSesion = document.getElementById('txtEmailIniciaSesion').value.toLowerCase();
    var txtPassIniciaSesion = document.getElementById('txtPassIniciaSesion').value.trim();

    if(txtEmailIniciaSesion.length == 0 || txtPassIniciaSesion.length == 0){
        lblErrorIniciaSesion.innerText = "Debes llenar todos los datos requeridos";
    }else{
        if(usuariosActivos.some(usuario => usuario.email === txtEmailIniciaSesion && usuario.password === txtPassIniciaSesion)){
            var indice = usuariosActivos.findIndex(usuario => usuario.email === txtEmailIniciaSesion);
            usuariosActivos[indice].iniciaSesion();
            iniciaSesionModal.hide();
            limpiaDatos();
        }else{
            lblErrorIniciaSesion.innerText = "El usuario no existe o la clave es incorrecta";
        }   
    }
}
function validaRegistro () {
    var lblErrorRegistro = document.getElementById('lblErrorRegistro');
    var frmRegistro = document.getElementById('frmRegistro');
    var elements = frmRegistro.querySelectorAll('.form-control');
    for (input of elements){
        if (input.value.length == 0){
            lblErrorRegistro.innerText = "Debes llenar todos los datos requeridos";
            return false;
        }
    }
    return true;
}
function creaNuevoUsuario () {
    
    var txtNombre = document.getElementById('txtNombre').value.toLowerCase();
    var txtApellido = document.getElementById('txtApellido').value.toLowerCase();
    var txtEmail = document.getElementById('txtEmail').value.toLowerCase();
    var txtUser = document.getElementById('txtUser').value.trim();
    var txtPassword = document.getElementById('txtPassword').value.trim();
    if (validaRegistro()){
        usuariosActivos.push( new Usuario(txtNombre, txtApellido, txtEmail, txtUser, txtPassword));
        alert(`Hola ${txtNombre}, te registraste exitosamente porfavor inicia sesion`);
        registroModal.hide();
        limpiaDatos();
    }
}
function limpiaDatos () {
    var elements = document.querySelectorAll('.form-control');
    for (input of elements){
        input.value="";
    }
    lblErrorIniciaSesion.innerText= "";
    lblErrorRegistro.innerText="";
}

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
usuariosActivos.push(new Usuario ('humberto','sanchez','humberto@gmail.com', 'beto','humberto123'));
usuariosActivos.push(new Usuario ('lorenzo','vargas','lorenzo-v@outlook.com', 'lolo', 'lorenzo123456'));
usuariosActivos.push(new Usuario ('carlos','chacon','cchacon@protonmail.com', 'carlitos','carlos789'));
usuariosActivos.push(new Usuario ('jerry','casalino','jerry_casalino@gmail.com', 'jerrylin', 'jc789123'));
usuariosActivos.push(new Usuario ('pablo','perez','ppbrito@outlook.com', 'pablito', 'perez123'));
usuariosActivos.push(new Usuario ('asdf','asdf','asdf','asdf','asdf'));

btnIniciaSesionModal.addEventListener('click',validaInicioSesion);
btnCancelaInicioModal.addEventListener('click', limpiaDatos);
btnCerrarSesion.addEventListener('click',(e) => {
    e.preventDefault();
    var indice = usuariosActivos.findIndex(usuario => usuario.user == btnUser.textContent);
    usuariosActivos[indice].cerrarSesion();
});
btnRegistrateModal.addEventListener('click',creaNuevoUsuario);
btnCancelaRegistroModal.addEventListener('click', limpiaDatos);