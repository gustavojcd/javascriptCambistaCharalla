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
var viewCambio = document.getElementById('viewCambio');
var viewBienvenida = document.getElementById('viewBienvenida')

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
        localStorage.setItem('userName', this.user);
        viewBienvenida.classList.add('d-none');
        viewCambio.classList.remove('d-none');
    }
    cerrarSesion(){
        btnIniciaSesion.classList.remove('d-none');
        btnRegistrate.classList.remove('d-none')
        btnUser.classList.add('d-none');
        lblBienvenida.classList.add('d-none');
        btnUser.innerHtml = "";
        localStorage.clear();
        viewBienvenida.classList.remove('d-none');
        viewCambio.classList.add('d-none');
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
function limpiaDatos () {
    var elements = document.querySelectorAll('.form-control');
    for (input of elements){
        input.value="";
    }
    lblErrorIniciaSesion.innerText= "";
    lblErrorRegistro.innerText="";
}
function validaInput(container){
    var frmContainer = document.getElementById(container)
    var elements = frmContainer.querySelectorAll('.form-control');
    for (input of elements){
        if (input.value.length === 0){
            return true;
        }
    }
    return false;
}
function validaInicioSesion () {
    var lblErrorIniciaSesion = document.getElementById('lblErrorIniciaSesion');
    var txtEmailIniciaSesion = document.getElementById('txtEmailIniciaSesion').value.toLowerCase();
    var txtPassIniciaSesion = document.getElementById('txtPassIniciaSesion').value.trim();

    if(validaInput('frmIniciaSesion')){
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
function creaNuevoUsuario () {
    var txtNombre = document.getElementById('txtNombre').value.toLowerCase();
    var txtApellido = document.getElementById('txtApellido').value.toLowerCase();
    var txtEmail = document.getElementById('txtEmail').value.toLowerCase();
    var txtUser = document.getElementById('txtUser').value.trim();
    var txtPassword = document.getElementById('txtPassword').value.trim();
    var lblErrorRegistro = document.getElementById('lblErrorRegistro');
    if (validaInput('frmRegistro')){
        lblErrorRegistro.innerText = "Debes llenar todos los datos requeridos";
    }else{
        usuariosActivos.push( new Usuario(txtNombre, txtApellido, txtEmail, txtUser, txtPassword));
        alert(`Hola ${txtNombre}, te registraste exitosamente porfavor inicia sesion`);
        registroModal.hide();
        limpiaDatos();
    }
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

var eth = {"market_id":"ETH-PEN","last_price":["6500.09","PEN"],"min_ask":["6606.99","PEN"],"max_bid":["6533.01","PEN"]};
var btc = {"market_id":"BTC-PEN","last_price":["110273.9","PEN"],"min_ask":["111481.1","PEN"],"max_bid":["110289.51","PEN"]};
var ltc = {"market_id":"LTC-PEN","last_price":["230.0","PEN"],"min_ask":["230.99","PEN"],"max_bid":["225.01","PEN"]};

localStorage.setItem(eth.market_id,JSON.stringify(eth));
localStorage.setItem(btc.market_id,JSON.stringify(btc));
localStorage.setItem(ltc.market_id,JSON.stringify(ltc));

let frmComprar = document.getElementById('frmComprar');
let rdoButtons = frmComprar.querySelectorAll("input[name='cripto']");
var lblComprar = document.getElementById('lblComprar');
var txtCantCompra = document.getElementById('txtCantCompra');
var txtCantCompraPen = document.getElementById('txtCantCompraPen');
var btnComprar = document.getElementById('btnComprar');
function findSelected () {
    let selected = frmComprar.querySelector("input[name='cripto']:checked").value;
    lblComprar.innerText = `Escribe la cantidad de ${selected} que quieres comprar:`
    txtCantCompra.setAttribute('placeholder', selected);
    return selected;
}
rdoButtons.forEach(rdoButton=>{
    rdoButton.addEventListener('change',findSelected);
})
findSelected();
function calcularCompra(){
    var recuperado;
    var find = findSelected();
    switch(find){
        case 'BTC':
            recuperado = JSON.parse(localStorage.getItem('BTC-PEN'));
            txtCantCompraPen.value = txtCantCompra.value * recuperado.min_ask[0];
            break;
        case 'ETH':
            recuperado = JSON.parse(localStorage.getItem('ETH-PEN'));
            txtCantCompraPen.value = txtCantCompra.value * recuperado.min_ask[0];
            break;
        case 'LTC':
            recuperado = JSON.parse(localStorage.getItem('LTC-PEN'));
            txtCantCompraPen.value = txtCantCompra.value * recuperado.min_ask[0];
            break;
        default:
            break;
    } 
}
btnComprar.addEventListener('click', calcularCompra);