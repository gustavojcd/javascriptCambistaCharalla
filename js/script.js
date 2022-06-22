//window.addEventListener('DOMContentLoaded', () => {
swal({
    title: 'Bienvenido a Cambista Online',
    text: `Registrate y recibe un super bono de bienvenida`,
    button: 'Aceptar'
})
//--------------------------------------
//Variables Globales-----------------
//--------------------------------------
//Muestra Modal iniciar sesion y Registro
var btnIniciaSesion = document.getElementById('btnIniciaSesion');
var btnRegistrate = document.getElementById('btnRegistrate');

//Se activa al iniciar sesion
var btnUser = document.getElementById('btnUser');
var btnCerrarSesion = document.getElementById('btnCerrarSesion');
var lblBienvenida = document.getElementById('lblBienvenida');

//Botones para iniciar sesion y registro (estan dentro del modal iniciar sesion y registro)
var btnRegistrateModal = document.getElementById('btnRegistrateModal');
var btnCancelaRegistroModal = document.getElementById('btnCancelaRegistroModal');
var btnIniciaSesionModal = document.getElementById('btnIniciaSesionModal');
var btnCancelaInicioModal = document.getElementById('btnCancelaInicioModal');

//para manipular el modal de bootstrap
var iniciaSesionModal = new bootstrap.Modal(document.getElementById('iniciaSesionModal'));
var registroModal = new bootstrap.Modal(document.getElementById('registroModal'));
var billeteraModal = new bootstrap.Modal(document.getElementById('billeteraModal'));

var usuariosActivos = [];
var viewCambio = document.getElementById('viewCambio');
var viewBienvenida = document.getElementById('viewBienvenida')

//Formulario Comprar
let frmCalcularCompra = document.getElementById('frmCalcularCompra');
let rdoButtonsComprar = frmCalcularCompra.querySelectorAll("input[name='cripto']");
var lblComprar = document.getElementById('lblComprar');
lblComprar.innerText = `Escribe la cantidad que quieres comprar y\nluego presiona COMPRAR:`

var lblPrecioCompra = document.getElementById('lblPrecioCompra');
var txtCantCompra = document.getElementById('txtCantCompra');
var txtCantCompraPen;
var btnCalcularCompra = document.getElementById('btnCalcularCompra');

//Formulario Venta
let frmCalcularVenta = document.getElementById('frmCalcularVenta');
let rdoButtonsVender = frmCalcularVenta.querySelectorAll("input[name='cripto']");
var lblVender = document.getElementById('lblVender');
lblVender.innerText = `Escribe la cantidad que quieres vender y\nluego presiona VENDER:`

var lblPrecioVenta = document.getElementById('lblPrecioVenta');
var txtCantVender = document.getElementById('txtCantVender');
var txtCantVenderPen;
var btnCalcularVenta = document.getElementById('btnCalcularVenta');

//Formulario Billetera
var txtPen = document.getElementById('txtPen');
var txtBtc = document.getElementById('txtBtc');
var txtEth = document.getElementById('txtEth');
var txtLtc = document.getElementById('txtLtc');

//--------------------------------------
//Clases------------------------------
//--------------------------------------
class Usuario {
    constructor(nombre, apellido, email, user, password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.user = user;
        this.password = password;
    }
    iniciaSesion() {
        btnIniciaSesion.classList.add('d-none');
        btnRegistrate.classList.add('d-none')
        btnUser.classList.remove('d-none');
        lblBienvenida.classList.remove('d-none');
        btnUser.innerHTML = `<i class="fa-solid fa-user pe-2"></i>${this.user}`
        viewBienvenida.classList.add('d-none');
        viewCambio.classList.remove('d-none');
    }
    cerrarSesion() {
        btnIniciaSesion.classList.remove('d-none');
        btnRegistrate.classList.remove('d-none')
        btnUser.classList.add('d-none');
        lblBienvenida.classList.add('d-none');
        btnUser.innerHtml = "";
        viewBienvenida.classList.remove('d-none');
        viewCambio.classList.add('d-none');
    }
}

//--------------------------------------
//Funciones------------------------------
//--------------------------------------
function limpiaDatos() {
    var elements = document.querySelectorAll('.form-control');
    for (input of elements) {
        input.value = "";
    }
    lblErrorIniciaSesion.innerText = "";
    lblErrorRegistro.innerText = "";
}
function validaInput(container) {
    var frmContainer = document.getElementById(container)
    var elements = frmContainer.querySelectorAll('.form-control');
    for (input of elements) {
        if (input.value.length === 0) {
            return true;
        }
    }
    return false;
}
function validaInicioSesion() {
    var lblErrorIniciaSesion = document.getElementById('lblErrorIniciaSesion');
    var txtEmailIniciaSesion = document.getElementById('txtEmailIniciaSesion').value.toLowerCase();
    var txtPassIniciaSesion = document.getElementById('txtPassIniciaSesion').value.trim();
    var nuevoUsuario = JSON.parse(localStorage.getItem('nuevoUsuario'));

    if (validaInput('frmIniciaSesion')) {
        lblErrorIniciaSesion.innerText = "Debes llenar todos los datos requeridos";
    } else {
        if (usuariosActivos.some(usuario => usuario.email === txtEmailIniciaSesion && usuario.password === txtPassIniciaSesion)) {
            var indice = usuariosActivos.findIndex(usuario => usuario.email === txtEmailIniciaSesion);
            usuariosActivos[indice].iniciaSesion();
            iniciaSesionModal.hide();
            swal({
                title: 'Bienvenido',
                text: `Hola ${usuariosActivos[indice].nombre}, recibiste un bono de S/1000.00 soles, revisa tu billetera`,
                icon: 'success',
                button: 'Aceptar'
            })
            limpiaDatos();
        }
        if (nuevoUsuario.email === txtEmailIniciaSesion && nuevoUsuario.password === txtPassIniciaSesion) {
            usuariosActivos.push(new Usuario(nuevoUsuario.nombre, nuevoUsuario.apellido, nuevoUsuario.email, nuevoUsuario.user, nuevoUsuario.password));
            usuariosActivos[usuariosActivos.length - 1].iniciaSesion();
            iniciaSesionModal.hide();
            limpiaDatos();
        } else {
            lblErrorIniciaSesion.innerText = "El usuario no existe o la clave es incorrecta";
        }
    }
}
function creaNuevoUsuario() {
    var txtNombre = document.getElementById('txtNombre').value.toLowerCase();
    var txtApellido = document.getElementById('txtApellido').value.toLowerCase();
    var txtEmail = document.getElementById('txtEmail').value.toLowerCase();
    var txtUser = document.getElementById('txtUser').value.trim();
    var txtPassword = document.getElementById('txtPassword').value.trim();
    var lblErrorRegistro = document.getElementById('lblErrorRegistro');
    if (validaInput('frmRegistro')) {
        lblErrorRegistro.innerText = "Debes llenar todos los datos requeridos";
    } else {
        usuariosActivos.push(new Usuario(txtNombre, txtApellido, txtEmail, txtUser, txtPassword));
        localStorage.setItem('nuevoUsuario', JSON.stringify(usuariosActivos[usuariosActivos.length - 1]));
        swal({
            title: 'Registro exitoso',
            text: `Hola ${txtNombre}, te registraste exitosamente, porfavor inicia sesion`,
            icon: 'success',
            button: 'Aceptar'
        })
        registroModal.hide();
        limpiaDatos();
    }

}
function calcularCompra() {
    var recuperado;
    var find = frmCalcularCompra.querySelector("input[name='cripto']:checked").value;
    if (txtCantCompra.value == '') {
        swal("ERROR!", "Debes escribir la cantidad que quieres comprar.", "error");
    } else {
        switch (find) {
            case 'BTC':
                recuperado = JSON.parse(localStorage.getItem('BTC-PEN'));
                txtCantCompraPen = txtCantCompra.value * recuperado.min_ask[0];
                if(txtPen.value >= txtCantCompraPen){
                    swal("Operacion Exitosa!", `Operacion ejecutada con exito revisa tu billetera.`, "success");
                    txtPen.value = (txtPen.value - txtCantCompraPen).toFixed(2);
                    txtBtc.value = txtBtc.value + txtCantCompra.value;
                    limpiaDatos();
                }else{
                    swal("ERROR!", `Necesitas tener en tu billetera: ${txtCantCompraPen} PEN.`, "error");
                    limpiaDatos();
                }
                break;
            case 'ETH':
                recuperado = JSON.parse(localStorage.getItem('ETH-PEN'));
                txtCantCompraPen = txtCantCompra.value * recuperado.min_ask[0];
                if(txtPen.value >= txtCantCompraPen){
                    swal("Operacion Exitosa!", `Operacion ejecutada con exito revisa tu billetera.`, "success");
                    txtPen.value = txtPen.value - txtCantCompraPen;
                    txtEth.value = txtEth.value + txtCantCompra.value;
                    limpiaDatos();
                }else{
                    swal("ERROR!", `Necesitas tener en tu billetera: ${txtCantCompraPen.toFixed(2)} PEN.`, "error");
                    limpiaDatos();
                }
                break;
            case 'LTC':
                recuperado = JSON.parse(localStorage.getItem('LTC-PEN'));
                txtCantCompraPen = txtCantCompra.value * recuperado.min_ask[0];
                if(txtPen.value >= txtCantCompraPen){
                    swal("Operacion Exitosa!", `Operacion ejecutada con exito revisa tu billetera.`, "success");
                    txtPen.value = txtPen.value - txtCantCompraPen;
                    txtLtc.value = txtLtc.value + txtCantCompra.value;
                    limpiaDatos();
                }else{
                    swal("ERROR!", `Necesitas tener en tu billetera: ${txtCantCompraPen.toFixed(2)} PEN.`, "error");
                    limpiaDatos();
                }
                break;
            default:
                break;
        }
    }
}

function mostrarPrecioCompra() {
    var recuperado;
    var find = frmCalcularCompra.querySelector("input[name='cripto']:checked").value;
    switch (find) {
        case 'BTC':
            recuperado = JSON.parse(localStorage.getItem('BTC-PEN'));
            lblPrecioCompra.innerText = `El precio de compra es: ${recuperado.min_ask[0]} PEN`;
            break;
        case 'ETH':
            recuperado = JSON.parse(localStorage.getItem('ETH-PEN'));
            lblPrecioCompra.innerText = `El precio de compra es: ${recuperado.min_ask[0]} PEN`;
            break;
        case 'LTC':
            recuperado = JSON.parse(localStorage.getItem('LTC-PEN'));
            lblPrecioCompra.innerText = `El precio de compra es: ${recuperado.min_ask[0]} PEN`;
            break;
        default:
            break;
    }
}

function calcularVenta() {
    var recuperado;
    var find = frmCalcularVenta.querySelector("input[name='cripto']:checked").value;

    if (txtCantVender.value == '') {
        swal("ERROR!", "Debes escribir la cantidad que quieres vender.", "error");
    } else {
        switch (find) {
            case 'BTC':
                recuperado = JSON.parse(localStorage.getItem('BTC-PEN'));
                txtCantVenderPen = txtCantVender.value * recuperado.max_bid[0];
                if(txtBtc.value >= txtCantVender.value){
                    swal("Operacion Exitosa!", `Operacion ejecutada con exito revisa tu billetera.`, "success");
                    txtPen.value = txtPen.value + txtCantVenderPen;
                    txtBtc.value = txtBtc.value - txtCantVender.value;
                    limpiaDatos();
                }else{
                    swal("ERROR!", `Necesitas tener en tu billetera: ${txtCantVender.value} BTC.`, "error");
                    limpiaDatos();
                }
                break;
            case 'ETH':
                recuperado = JSON.parse(localStorage.getItem('ETH-PEN'));
                txtCantVenderPen = txtCantVender.value * recuperado.max_bid[0];
                if(txtEth.value >= txtCantVender.value){
                    swal("Operacion Exitosa!", `Operacion ejecutada con exito revisa tu billetera.`, "success");
                    txtPen.value = txtPen.value + txtCantVenderPen;
                    txtEth.value = txtEth.value - txtCantVender.value;
                    limpiaDatos();
                }else{
                    swal("ERROR!", `Necesitas tener en tu billetera: ${txtCantVender.value} ETH.`, "error");
                    limpiaDatos();
                }
                break;
            case 'LTC':
                recuperado = JSON.parse(localStorage.getItem('LTC-PEN'));
                txtCantVenderPen = txtCantVender.value * recuperado.max_bid[0];
                if(txtLtc.value >= txtCantVender.value){
                    swal("Operacion Exitosa!", `Operacion ejecutada con exito revisa tu billetera.`, "success");
                    txtPen.value = txtPen.value + txtCantVenderPen;
                    txtLtc.value = txtLtc.value - txtCantVender.value;
                    limpiaDatos();
                }else{
                    swal("ERROR!", `Necesitas tener en tu billetera: ${txtCantVender.value} LTC.`, "error");
                    limpiaDatos();
                }
                break;
            default:
                break;
        }
    }
}

function mostrarPrecioVenta() {
    var recuperado;
    var find = frmCalcularVenta.querySelector("input[name='cripto']:checked").value;
    switch (find) {
        case 'BTC':
            recuperado = JSON.parse(localStorage.getItem('BTC-PEN'));
            lblPrecioVenta.innerText = `El precio de venta es: ${recuperado.max_bid[0]} PEN`;
            break;
        case 'ETH':
            recuperado = JSON.parse(localStorage.getItem('ETH-PEN'));
            lblPrecioVenta.innerText = `El precio de venta es: ${recuperado.max_bid[0]} PEN`;
            break;
        case 'LTC':
            recuperado = JSON.parse(localStorage.getItem('LTC-PEN'));
            lblPrecioVenta.innerText = `El precio de venta es: ${recuperado.max_bid[0]} PEN`;
            break;
        default:
            break;
    }
}
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
usuariosActivos.push(new Usuario('humberto', 'sanchez', 'humberto@gmail.com', 'beto', 'humberto123'));
usuariosActivos.push(new Usuario('lorenzo', 'vargas', 'lorenzo-v@outlook.com', 'lolo', 'lorenzo123456'));
usuariosActivos.push(new Usuario('carlos', 'chacon', 'cchacon@protonmail.com', 'carlitos', 'carlos789'));
usuariosActivos.push(new Usuario('jerry', 'casalino', 'jerry_casalino@gmail.com', 'jerrylin', 'jc789123'));
usuariosActivos.push(new Usuario('pablo', 'perez', 'ppbrito@outlook.com', 'pablito', 'perez123'));
usuariosActivos.push(new Usuario('asdf', 'asdf', 'asdf', 'asdf', 'asdf'));

btnIniciaSesionModal.addEventListener('click', () => {
    validaInicioSesion();
    mostrarBilletera();
});

function mostrarBilletera() {
    txtPen.value = '1000'
}


btnCancelaInicioModal.addEventListener('click', limpiaDatos);
btnCerrarSesion.addEventListener('click', (e) => {
    e.preventDefault();
    var indice = usuariosActivos.findIndex(usuario => usuario.user == btnUser.textContent);
    usuariosActivos[indice].cerrarSesion();
});
btnRegistrateModal.addEventListener('click', creaNuevoUsuario);
btnCancelaRegistroModal.addEventListener('click', limpiaDatos);

fetch('js/data.json')
    .then(response => response.json())
    .then(data => {
        for (element of data) {
            localStorage.setItem(element.market_id, JSON.stringify(element));
        }
    })

rdoButtonsComprar.forEach(rdoButton => {
    rdoButton.addEventListener('change', ()=>{
        limpiaDatos();
        mostrarPrecioCompra();
    })
});
rdoButtonsVender.forEach(rdoButton => {
    rdoButton.addEventListener('change', ()=>{
        limpiaDatos();
        mostrarPrecioVenta();
    })
});
btnCalcularCompra.addEventListener('click', calcularCompra);
btnCalcularVenta.addEventListener('click', calcularVenta);
mostrarPrecioCompra();
mostrarPrecioVenta() 