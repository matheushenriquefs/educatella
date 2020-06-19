//Captura os elementos para tratar o campo de acesar uma classe
let formEntrarClasse = document.getElementById("formEntrarClasse");
let feedback = document.getElementById("feedback");

//Cria um event listener para quando o formulário for enviado
formEntrarClasse.addEventListener('submit', evento => {

    //Previne o submit padrão do formulário
    evento.preventDefault();

    let codigoClasse = document.getElementById("codigoClasse").value;

    //Se o código da classe for vazio, exibe uma mensagem, se não for, o formulário é acionado
    if(codigoClasse == ""){
        feedback.innerText = "Você deve preencher um código!";
    }else{
        formEntrarClasse.submit();
    }

});

let feedbackClasse = document.getElementById("feedbackAcessarClasse").value;
let mensagemFeedbackClasse = document.getElementById("mensagemFeedbackClasse");

function acessarClasseFeedback(){
    if(feedbackClasse != "inicio"){
        $('#modal-feedback-classe').modal('show');
        mensagemFeedbackClasse.innerText = feedbackClasse;
    }
}

acessarClasseFeedback();