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
let dataEntregaBanco = document.getElementsByClassName('dataEntregaBanco');
let divEnviarTarefa = document.getElementsByClassName("divEnviarTarefa");
let feedback = document.getElementsByClassName("feedbackTarefa");
let botaoEnviar = document.getElementsByClassName("botao-enviar-tarefa");
console.log(dataEntregaBanco[2].value)
for(let i = 0; i < dataEntregaBanco.length; i++){

    //Recebe a data de entrega tratada
    dataEntrega = tratarData(dataCriacaoBanco[i].value);
    //Escreve nos campos corretos do HTML a data tratada
    dataCriacao[i].innerHTML = "Data da Tarefa: " + dataEntrega;
    //Verifica se passou da data de entrega
    if(!verificaDataEntrega(dataEntregaBanco[i].value)){
        divEnviarTarefa[i].style.display = 'none';
        botaoEnviar[i].style.display = 'none';
        feedback[i].innerText = "Essa Tarefa Já Expirou!";
    }
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

//Função que verifica se a data atual é menor que a data de entrega, se for não permite que o aluno envie a tarefa
function verificaDataEntrega(data){
    let parts = data.split('/'); // separa a data pelo caracter '/'
    let today = new Date();      // pega a data atual
    
    data = new Date(parts[2], parts[1] - 1, parts[0]); // formata 'date'
    
    // compara se a data informada é maior que a data atual
    // e retorna true ou false
    return data >= today ? true : false;
}

//Captura os elementos para tratar o campo de enviar tarefas
let formEnviarTarefa = document.getElementsByClassName("formTarefa");
tarefaEnviada = document.getElementsByClassName("tarefaEnviada");
feedback = document.getElementsByClassName("feedbackTarefa");

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