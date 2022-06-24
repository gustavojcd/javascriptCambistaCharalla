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

var usuariosActivos = [];
var viewCambio = document.getElementById('viewCambio');
var viewBienvenida = document.getElementById('viewBienvenida')

//Formulario Comprar
let frmCalcularCompra = document.getElementById('frmCalcularCompra');
let rdoButtonsComprar = frmCalcularCompra.querySelectorAll("input[name='cripto']");
var lblComprar = document.getElementById('lblComprar');
lblComprar.innerText = `Escribe la cantidad que quieres comprar y\nluego presiona COMPRAR:`

var lblPrecioCompra = document.getElementById('lblPrecioCompra');

var btnCalcularCompra = document.getElementById('btnCalcularCompra');

//Formulario Venta
let frmCalcularVenta = document.getElementById('frmCalcularVenta');
let rdoButtonsVender = frmCalcularVenta.querySelectorAll("input[name='cripto']");
var lblVender = document.getElementById('lblVender');
lblVender.innerText = `Escribe la cantidad que quieres vender y\nluego presiona VENDER:`

var lblPrecioVenta = document.getElementById('lblPrecioVenta');

var btnCalcularVenta = document.getElementById('btnCalcularVenta');

//Formulario Billetera
var billetera = document.getElementById('billetera');
var billeteraModal = new bootstrap.Modal(document.getElementById('billeteraModal'));
var frmBilletera = document.getElementById('frmBilletera');
var txtPen = 1000;
var txtBtc = 0;
var txtEth = 0;
var txtLtc = 0;

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
        localStorage.setItem('usuarioActivo', true);
    }
    cerrarSesion() {
        btnIniciaSesion.classList.remove('d-none');
        btnRegistrate.classList.remove('d-none')
        btnUser.classList.add('d-none');
        lblBienvenida.classList.add('d-none');
        btnUser.innerHtml = "";
        viewBienvenida.classList.remove('d-none');
        viewCambio.classList.add('d-none');
        localStorage.setItem('usuarioActivo', false);
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
            localStorage.setItem('ultimoActivo', JSON.stringify(usuariosActivos[indice]));
            iniciaSesionModal.hide();
            swal({
                title: 'Bienvenido',
                text: `Hola ${usuariosActivos[indice].nombre}, bienvenido a Cambista Online`,
                icon: 'success',
                button: 'Aceptar'
            })
            limpiaDatos();
        } else if (nuevoUsuario) {
            if (nuevoUsuario.email === txtEmailIniciaSesion && nuevoUsuario.password === txtPassIniciaSesion) {
                usuariosActivos.push(new Usuario(nuevoUsuario.nombre, nuevoUsuario.apellido, nuevoUsuario.email, nuevoUsuario.user, nuevoUsuario.password));
                usuariosActivos[usuariosActivos.length - 1].iniciaSesion();
                iniciaSesionModal.hide();
                limpiaDatos();
            } else {
                lblErrorIniciaSesion.innerText = "El usuario no existe o la clave es incorrecta";
            }
        }
        else {
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
    var txtCantCompra = document.getElementById('txtCantCompra').value;
    var txtCantCompraPen;
    var find = frmCalcularCompra.querySelector("input[name='cripto']:checked").value;
    if (txtCantCompra.length === 0) {
        swal("ERROR!", "Debes escribir la cantidad que quieres comprar.", "error");
    } else {
        switch (find) {
            case 'BTC':
                recuperado = JSON.parse(localStorage.getItem('BTC-PEN'));
                txtCantCompraPen = parseFloat(txtCantCompra * recuperado.min_ask[0]);
                swal({
                    title: "Estas Seguro?",
                    text: `Para completar la operacion necesitas tener en tu billetera: S/ ${txtCantCompraPen.toFixed(2)}`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((confirmaCompra) => {
                        if (confirmaCompra) {
                            if (txtPen >= txtCantCompraPen) {
                                txtPen = txtPen - txtCantCompraPen;
                                txtBtc = txtBtc + parseFloat(txtCantCompra);
                                limpiaDatos();
                                swal("Operacion Exitosa!", `Operacion ejecutada con exito, revisa tu billetera.`, "success");
            
                            } else {
                                swal("ERROR!", `Saldo insuficiente para completar la operacion, porfavor revisa tu billetera.`, "error");
                                limpiaDatos();
                            }

                        } else {
                            swal("Operacion Cancelada");
                            limpiaDatos();
                        }
                    });
                break;
            case 'ETH':
                recuperado = JSON.parse(localStorage.getItem('ETH-PEN'));
                txtCantCompraPen = parseFloat(txtCantCompra * recuperado.min_ask[0]);
                swal({
                    title: "Estas Seguro?",
                    text: `Para completar la operacion necesitas tener en tu billetera: S/ ${txtCantCompraPen.toFixed(2)}`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((confirmaCompra) => {
                        if (confirmaCompra) {
                            if (txtPen >= txtCantCompraPen) {
                                txtPen = txtPen - txtCantCompraPen;
                                txtEth = txtEth + parseFloat(txtCantCompra);
                                limpiaDatos();
                                swal("Operacion Exitosa!", `Operacion ejecutada con exito revisa tu billetera.`, "success");
                              
                            } else {
                                swal("ERROR!", `Saldo insuficiente para completar la operacion, porfavor revisa tu billetera.`, "error");
                                limpiaDatos();
                            }
                        } else {
                            swal("Operacion Cancelada");
                            limpiaDatos();
                        }
                    });
                break;
            case 'LTC':
                recuperado = JSON.parse(localStorage.getItem('LTC-PEN'));
                txtCantCompraPen = parseFloat(txtCantCompra * recuperado.min_ask[0]);
                swal({
                    title: "Estas Seguro?",
                    text: `Para completar la operacion necesitas tener en tu billetera: S/ ${txtCantCompraPen.toFixed(2)}`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((confirmaCompra) => {
                        if (confirmaCompra) {
                            if (txtPen >= txtCantCompraPen) {
                                txtPen = txtPen - txtCantCompraPen;
                                txtLtc = txtLtc + parseFloat(txtCantCompra);
                                limpiaDatos();
                                swal("Operacion Exitosa!", `Operacion ejecutada con exito revisa tu billetera.`, "success");
                            
                            } else {
                                swal("ERROR!", `Saldo insuficiente para completar la operacion, porfavor revisa tu billetera.`, "error");
                                limpiaDatos();
                            }
                        } else {
                            swal("Operacion Cancelada");
                            limpiaDatos();
                        }
                    });
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
            lblPrecioCompra.innerText = `Precio de compra: 1 BTC = ${recuperado.min_ask[0]} PEN`;
            break;
        case 'ETH':
            recuperado = JSON.parse(localStorage.getItem('ETH-PEN'));
            lblPrecioCompra.innerText = `Precio de compra: 1 ETH = ${recuperado.min_ask[0]} PEN`;
            break;
        case 'LTC':
            recuperado = JSON.parse(localStorage.getItem('LTC-PEN'));
            lblPrecioCompra.innerText = `Precio de compra: 1 LTC = ${recuperado.min_ask[0]} PEN`;
            break;
        default:
            break;
    }
}
function calcularVenta() {
    var recuperado;
    var find = frmCalcularVenta.querySelector("input[name='cripto']:checked").value;
    var txtCantVender = document.getElementById('txtCantVender').value;
    var txtCantVenderPen;
    if (txtCantVender.length === 0) {
        swal("ERROR!", "Debes escribir la cantidad que quieres vender.", "error");
    } else {
        switch (find) {
            case 'BTC':
                recuperado = JSON.parse(localStorage.getItem('BTC-PEN'));
                txtCantVenderPen = parseFloat(txtCantVender * recuperado.max_bid[0]);
                swal({
                    title: "Estas Seguro?",
                    text: `Para completar la operacion necesitas tener en tu billetera: ${txtCantVender} BTC."`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((confirmaVenta) => {
                    if (confirmaVenta) {
                        if (txtBtc >= txtCantVender) {
                            txtPen = txtPen + txtCantVenderPen;
                            txtBtc = txtBtc - parseFloat(txtCantVender);
                            limpiaDatos();
                            swal("Operacion Exitosa!", `Operacion ejecutada con exito, revisa tu billetera.`, "success");
                       
                        } else {
                            swal("ERROR!", `Saldo insuficiente, porfavor revisa tu billetera`, "error");
                            limpiaDatos();
                        }
                    } else {
                      swal("Operacion Cancelada");
                      limpiaDatos()
                    }
                  });
                break;
            case 'ETH':
                recuperado = JSON.parse(localStorage.getItem('ETH-PEN'));
                txtCantVenderPen = parseFloat(txtCantVender * recuperado.max_bid[0]);

                swal({
                    title: "Estas Seguro?",
                    text: `Para completar la operacion necesitas tener en tu billetera: ${txtCantVender} ETH.`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((confirmaVenta) => {
                    if (confirmaVenta) {
                        if (txtEth >= txtCantVender) {
                            txtPen = txtPen + txtCantVenderPen;
                            txtEth = txtEth - parseFloat(txtCantVender);
                            limpiaDatos();
                            swal("Operacion Exitosa!", `Operacion ejecutada con exito, revisa tu billetera.`, "success");
                       
                        } else {
                            swal("ERROR!", `Saldo insuficiente, porfavor revisa tu billetera`, "error");
                            limpiaDatos();
                        }
                    } else {
                      swal("Operacion Cancelada");
                      limpiaDatos();
                    }
                  });

                
                break;
            case 'LTC':
                recuperado = JSON.parse(localStorage.getItem('LTC-PEN'));
                txtCantVenderPen = parseFloat(txtCantVender * recuperado.max_bid[0]);
                swal({
                    title: "Estas Seguro?",
                    text: `Para completar la operacion necesitas tener en tu billetera: ${txtCantVender} LTC.`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((confirmaVenta) => {
                    if (confirmaVenta) {
                        if (txtLtc >= txtCantVender) {
                            txtPen = txtPen + txtCantVenderPen;
                            txtLtc = txtLtc - parseFloat(txtCantVender);
                            limpiaDatos();
                            swal("Operacion Exitosa!", `Operacion ejecutada con exito, revisa tu billetera.`, "success");
                 
                        } else {
                            swal("ERROR!", `Saldo insuficiente, porfavor revisa tu billetera`, "error");
                            limpiaDatos();
                        }
                    } else {
                      swal("Operacion Cancelada");
                      limpiaDatos();
                    }
                  });
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
            lblPrecioVenta.innerText = `Precio de venta: 1 BTC = ${recuperado.max_bid[0]} PEN`;
            break;
        case 'ETH':
            recuperado = JSON.parse(localStorage.getItem('ETH-PEN'));
            lblPrecioVenta.innerText = `Precio de venta: 1 ETH = ${recuperado.max_bid[0]} PEN`;
            break;
        case 'LTC':
            recuperado = JSON.parse(localStorage.getItem('LTC-PEN'));
            lblPrecioVenta.innerText = `Precio de venta: 1 LTC = ${recuperado.max_bid[0]} PEN`;
            break;
        default:
            break;
    }
}
function mostrarBilletera() {
    frmBilletera.innerHTML = `<div class="mb-3">
                                <label for="txtPen" class="form-label">PEN:</label>
                                <input type="number" class="" id="txtPen" placeholder="" value=${txtPen.toFixed(2)} disabled>
                            </div>
                            <div class="mb-3">
                                <label for="txtBtc" class="form-label">BTC:</label>
                                <input type="number" class="" id="txtBtc" placeholder="" value=${txtBtc} disabled>
                            </div>
                            <div class="mb-3">
                                <label for="txtLtc" class="form-label">LTC:</label>
                                <input type="number" class="" id="txtLtc" placeholder="" value=${txtLtc} disabled>
                            </div>
                            <div class="mb-3">
                                <label for="txtEth" class="form-label">ETH:</label>
                                <input type="number" class="" id="txtEth" placeholder="" value=${txtEth} disabled>
                            </div>`
}
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
usuariosActivos.push(new Usuario('humberto', 'sanchez', 'humberto@gmail.com', 'beto', 'humberto123'));
usuariosActivos.push(new Usuario('lorenzo', 'vargas', 'lorenzo-v@outlook.com', 'lolo', 'lorenzo123456'));
usuariosActivos.push(new Usuario('carlos', 'chacon', 'cchacon@protonmail.com', 'carlitos', 'carlos789'));
usuariosActivos.push(new Usuario('jerry', 'casalino', 'jerry_casalino@gmail.com', 'jerrylin', 'jc789123'));
usuariosActivos.push(new Usuario('pablo', 'perez', 'ppbrito@outlook.com', 'pablito', 'perez123'));
//--------------------------------------------------------------------
//Se llama a la funcion para cargar los datos de la billetera del usuario
//--------------------------------------------------------------------
billetera.addEventListener('click', () => {
    mostrarBilletera();
    billeteraModal.show();
});
//--------------------------------------------------------------------
//Se llama a las funciones para iniciar y cerrar sesion
//--------------------------------------------------------------------
btnIniciaSesionModal.addEventListener('click', validaInicioSesion);
btnCancelaInicioModal.addEventListener('click', limpiaDatos);
btnCerrarSesion.addEventListener('click', (e) => {
    e.preventDefault();
    var indice = usuariosActivos.findIndex(usuario => usuario.user == btnUser.textContent);
    usuariosActivos[indice].cerrarSesion();
});
//--------------------------------------------------------------------
//Se llama a la funcion para registrarse
//--------------------------------------------------------------------
btnRegistrateModal.addEventListener('click', creaNuevoUsuario);
btnCancelaRegistroModal.addEventListener('click', limpiaDatos);
//--------------------------------------------------------------------
//--------------------------------------------------------------------
//------------------------------------------------------------------
//los precios de las criptos los extraigo de un archivo .json local
//------------------------------------------------------------------
fetch('js/data.json')
    .then(response => response.json())
    .then(data => {
        for (element of data) {
            localStorage.setItem(element.market_id, JSON.stringify(element));
        }
    })
//-------------------------------------------------------------------------------------------------------------------------------
//Se llama a la funcion para mostrar los precios de compra y venta y tambiem a las funciones para calcular la compra y la venta
//-------------------------------------------------------------------------------------------------------------------------------
rdoButtonsComprar.forEach(rdoButton => {
    rdoButton.addEventListener('change', () => {
        limpiaDatos();
        mostrarPrecioCompra();
    })
});
rdoButtonsVender.forEach(rdoButton => {
    rdoButton.addEventListener('change', () => {
        limpiaDatos();
        mostrarPrecioVenta();
    })
});
btnCalcularCompra.addEventListener('click', calcularCompra);
btnCalcularVenta.addEventListener('click', calcularVenta);
mostrarPrecioCompra();
mostrarPrecioVenta();
//------------------------------------------------------------------
//--------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//esta parte del codigo es para mantener la sesion activa despues de actualizar la pagina
//---------------------------------------------------------------------------------------
var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
if (usuarioActivo) {
    var ultimoActivo = JSON.parse(localStorage.getItem('ultimoActivo'));
    usuariosActivos.push(new Usuario(ultimoActivo.nombre, ultimoActivo.apellido, ultimoActivo.email, ultimoActivo.password));
    var indice = usuariosActivos.findIndex(usuario => usuario.nombre === ultimoActivo.nombre);
    usuariosActivos[indice].iniciaSesion();
} else {
    swal({
        title: 'Bienvenido a Cambista Online',
        text: `Registrate y recibe un super bono de bienvenida`,
        button: 'Aceptar'
    })
}