class Usuario{
    constructor(nombre, apellido, email, user, password){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.user = user;
        this.password = password;
    }
    iniciaSesion(){
        btnIniciarSesion.classList.add('d-none');
        btnRegistrate.classList.add('d-none')
        btnUser.classList.remove('d-none');
        lblBienvenida.classList.remove('d-none');
        btnUser.innerHTML = `<i class="fa-solid fa-user pe-2"></i>${user}`
    }
    terminaSesion(){
        if(btnCerrarSesion.onclick){

        }
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
//Variables para el DOM-----------------
//--------------------------------------
var btnIniciarSesion = document.getElementById('btnIniciarSesion');
var btnRegistrate = document.getElementById('btnRegistrate');
var btnUser = document.getElementById('btnUser');
var btnCerrarSesion = document.getElementById('btnCerrarSesion');
var lblBienvenida = document.getElementById('lblBienvenida');


//---------------------------------------------
// Aqui creo un array de objetos Usuario-------
//---------------------------------------------
var usuariosActivos = [];
usuariosActivos.push(new Usuario ('humberto','sanchez','humberto@gmail.com', 'beto','humberto123'));
usuariosActivos.push(new Usuario ('lorenzo','vargas','lorenzo-v@outlook.com', 'lolo', 'lorenzo123456'));
usuariosActivos.push(new Usuario ('carlos','chacon','cchacon@protonmail.com', 'carlitos','carlos789'));
usuariosActivos.push(new Usuario ('jerry','casalino','jerry_casalino@gmail.com', 'jerrylin', 'jc789123'));
usuariosActivos.push(new Usuario ('pablo','perez','ppbrito@outlook.com', 'pablito', 'perez123'));


//-------------------------------
//Menu de bienvenida-------------
//-------------------------------
var opcion=prompt("Bienvenido, elige una opcion: \n1. Registrate\n2. Cambia Divisa\n3. Cantidad de usuarios activos\n4. Recupera tu cuenta");
switch(opcion){
    case '1':
        var nombre = prompt("ingresa tu nombre:");
        var apellido = prompt("ingresa tu apellido:");
        var email= prompt("ingresa tu email:");
        var user = prompt("ingresa tu nombre de usuario");
        var password= prompt("ingresa tu password:");
        var nuevoUsuario = new Usuario (nombre, apellido, email, user, password);
        alert("Hola "+nuevoUsuario.nombre+", te registraste exitosamente");
        nuevoUsuario.iniciaSesion();
        break;
    case '2':
        var cantidadDinero = prompt("ingresa la cantidad de dinero: ");
        var divisaOrigen = prompt("ingresa la divisa de origen: ");
        if(divisaOrigen == "euros" || divisaOrigen == "dolares"){
            var divisaDestino = "soles";
        }else{
            var divisaDestino = prompt("ingresa la divisa a la que quieres cambiar tu dinero: ");
        }
        break;
    case '3':
        var cantUsuarios = 0;
        usuariosActivos.forEach(() => cantUsuarios +=1);
        alert("cantidad de usuarios activos: "+cantUsuarios)
        break;
    case '4':
        var buscaUsuario = prompt("Escribe tu nombre de usuario:")
        if(usuariosActivos.some(usuario => usuario.user == buscaUsuario)){
            alert("Usuario encontrado, revisa tu correo y sigue las instrucciones para recuperar tu cuenta")
        }else{
            alert("El usuario no existe")
        }
    default:
        break;
}

var result = new Cambio (cantidadDinero, divisaOrigen, divisaDestino)

if (result.divisaOrigen == "soles" && result.divisaDestino == "euros"){
    alert("Recibes "+result.solesToEuros().toFixed(2)+" euros");
}
if (result.divisaOrigen == "soles" && result.divisaDestino == "dolares"){
    alert("Recibes "+result.solesToDolares().toFixed(2)+ " dolares");
}
if (result.divisaOrigen == "euros"){
    alert("Recibes "+result.eurosToSoles().toFixed(2)+" soles");
}
if (result.divisaOrigen == "dolares"){
    alert("Recibes "+result.dolaresToSoles().toFixed(2)+" soles");
}


