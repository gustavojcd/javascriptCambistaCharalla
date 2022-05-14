var cantidadDinero = prompt("ingresa la cantidad de dinero: ");
var divisaOrigen = prompt("ingresa la divisa de origen: ");
var divisaDestino = prompt("ingresa la divisa a la que quiere convertir su dinero: ")

class cambio{
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

var result = new cambio (cantidadDinero, divisaOrigen, divisaDestino)

if (result.divisaOrigen == "soles" && result.divisaDestino == "euros"){
    alert(result.solesToEuros());
    console.log(result.solesToEuros());
}
if (result.divisaOrigen == "soles" && result.divisaDestino == "dolares"){
    alert(result.solesToDolares());
    console.log(result.solesToDolares());
}
if (result.divisaOrigen == "euros"){
    alert(result.eurosToSoles());
    console.log(result.eurosToSoles());
}
if (result.divisaOrigen == "dolares"){
    alert(result.dolaresToSoles());
    console.log(result.dolaresToSoles());
}

