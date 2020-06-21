// Captura as datas ainda não tratadas em um input hidden
let datasBanco = document.getElementsByClassName('dataBanco');
// Captura a classe em que data tratada será escrita
let datas = document.getElementsByClassName('data');

for(var i = 0; i < datasBanco.length; i++){
    //Instância um objeto do tipo date com a data não tratada
    let myDate = new Date(datasBanco[i].value);

    //trata as datas no caso de apenas um dígito
    let dia = String(myDate.getDate()).length == 2 ? myDate.getDate() : "0" + myDate.getDate();
    let mes = String((myDate.getMonth() + 1)).length == 2 ? (myDate.getMonth() + 1) : "0" + (myDate.getMonth() + 1);
    let ano = String(myDate.getFullYear());
    let hora = String(myDate.getHours()).length == 2 ? myDate.getHours() : "0" + myDate.getHours();
    let minutos = String(myDate.getMinutes()).length == 2 ? myDate.getMinutes() : "0" + myDate.getMinutes();

    //Escreve nos campos corretos do HTML a data tratada
    datas[i].innerHTML = (dia) + '/' + (mes) + '/' + (ano) + "<br>" + (hora) + ":" + (minutos);
}