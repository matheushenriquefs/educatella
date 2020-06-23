let feedbackNota = document.getElementById("feedbackNota").value;
let mensagemFeedbackNota = document.getElementById("mensagemFeedbackNota");

function acessarNotaFeedback(){
    if(feedbackNota != "inicio"){
        $('#modal-feedback-nota').modal('show');
        mensagemFeedbackNota.innerText = feedbackNota;
    }
}

acessarNotaFeedback();