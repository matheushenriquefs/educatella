// Captura as datas ainda não tratadas em um input hidden
let datasBanco = document.getElementsByClassName('dataBanco');
// Captura a classe em que data tratada será escrita
let datas = document.getElementsByClassName('data');

for(var i = 0; i < datasBanco.length; i++){

    //Escreve nos campos corretos do HTML a data tratada
    datas[i].innerHTML = tratarDataBr(datasBanco[i].value);
}

//Recebe a data de criação da tarefa ainda não tratada
let dataCriacaoBanco = document.getElementsByClassName('dataCriacaoBanco');
// Recebe o local onde a data tratada será escrita
let dataCriacao = document.getElementsByClassName('dataCriacao');

for(var i = 0; i < dataCriacaoBanco.length; i++){

    //Escreve nos campos corretos do HTML a data tratada
    dataCriacao[i].innerHTML = "Data da Tarefa: " + tratarData(dataCriacaoBanco[i].value);
}

//Função que trata a data, recebe como parâmetro a data não tratada e retorna a data com quebra de linha com a hora
function tratarDataBr(data){
    //Instância um objeto do tipo date com a data não tratada
    let myDate = new Date(data);

    //trata as datas no caso de apenas um dígito
    let dia = String(myDate.getDate()).length == 2 ? myDate.getDate() : "0" + myDate.getDate();
    let mes = String((myDate.getMonth() + 1)).length == 2 ? (myDate.getMonth() + 1) : "0" + (myDate.getMonth() + 1);
    let ano = String(myDate.getFullYear());

    //Escreve nos campos corretos do HTML a data tratada
    return (dia) + '/' + (mes) + '/' + (ano);
}

//Função que trata a data, recebe como parâmetro a data não tratada e retorna a data sem quebra de linha com a hora
function tratarData(data){
    //Instância um objeto do tipo date com a data não tratada
    let myDate = new Date(data);

    //trata as datas no caso de apenas um dígito
    let dia = String(myDate.getDate()).length == 2 ? myDate.getDate() : "0" + myDate.getDate();
    let mes = String((myDate.getMonth() + 1)).length == 2 ? (myDate.getMonth() + 1) : "0" + (myDate.getMonth() + 1);
    let ano = String(myDate.getFullYear());
    let hora = String(myDate.getHours()).length == 2 ? myDate.getHours() : "0" + myDate.getHours();
    let minutos = String(myDate.getMinutes()).length == 2 ? myDate.getMinutes() : "0" + myDate.getMinutes();

    //Escreve nos campos corretos do HTML a data tratada
    return (dia) + '/' + (mes) + '/' + (ano);
}

//Captura os elementos para tratar o campo de enviar tarefas
let formEnviarTarefa = document.getElementsByClassName("formTarefa");
let tarefaEnviada = document.getElementsByClassName("tarefaEnviada");
let feedback = document.getElementsByClassName("feedbackTarefa");

for(let i = 0; i < formEnviarTarefa.length; i++){

    formEnviarTarefa[i].addEventListener("submit", evento => {

        //Previne o submit padrão do formulário
        evento.preventDefault();

        //Se o código da classe for vazio, exibe uma mensagem, se não for, o formulário é acionado
        if(tarefaEnviada[i].value == ""){
            feedback[i].innerText = "Você deve anexar um arquivo!";
        }else{
            formEnviarTarefa[i].submit();
        }

    });
}

let feedbackTarefa = document.getElementById("feedbackEnviarTarefa").value;
let mensagemFeedbackTarefa = document.getElementById("mensagemFeedbackEnviarTarefa");

function enviarTarefaFeedback(){
    if(feedbackTarefa != "inicio"){
        $('#modal-feedback-tarefa').modal('show');
        mensagemFeedbackTarefa.innerText = feedbackTarefa;
    }
}

enviarTarefaFeedback();