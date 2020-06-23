//Captura os campos de confirmação da saida da classe
let formsExcluirAluno = document.getElementsByClassName("form-excluir-aluno");
let botaoConfirmar = document.getElementById("confirmar-excluir-aluno");

for(let i = 0; i < formsExcluirAluno.length; i++){
    formsExcluirAluno[i].addEventListener("submit", evento => {

        evento.preventDefault();
    
        //Exibe o modal de confirmação
        $('#modal-confirmar-excluir-aluno').modal('show');
    
        //Se o usuário confirmar, envia o formulário
        botaoConfirmar.addEventListener("click", evt => {
            formsExcluirAluno[i].submit();
        });
    
    });
}

let feedbackExcluirAluno = document.getElementById("feedbackExcluirAluno").value;
let mensagemFeedbackExcluirAluno = document.getElementById("mensagemFeedbackExcluirAluno");

function excluirAlunoFeedback(){
    if(feedbackExcluirAluno != "inicio"){
        $('#modal-feedback-excluir-aluno').modal('show');
        mensagemFeedbackExcluirAluno.innerText = feedbackExcluirAluno;
    }
}

excluirAlunoFeedback();