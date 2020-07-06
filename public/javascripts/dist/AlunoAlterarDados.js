//Captura os elementos para tratar o campo de alterar imagem
let formAlterarImagem = document.getElementById("formAlterarImagem");
let feedbackAlterarImagem = document.getElementById("feedbackAlterarImagem");
let alterarImagem = document.getElementById("alterarImagem");

//Chama a função para validar o campo
validarCampo(formAlterarImagem, feedbackAlterarImagem, alterarImagem, "Você deve anexar uma imagem!");

//Captura os elementos para tratar o campo de alterar imagem
let formAlterarNome = document.getElementById("formAlterarNome");
let feedbackAlterarNome = document.getElementById("feedbackAlterarNome");
let alterarNome = document.getElementById("alterarNome");

//Chama a função para validar o campo
validarCampo(formAlterarNome, feedbackAlterarNome, alterarNome, "Você deve digitar um nome!");

//Captura os elementos para tratar o campo de alterar E-mail
let formAlterarEmail = document.getElementById("formAlterarEmail");
let feedbackAlterarEmail = document.getElementById("feedbackAlterarEmail");
let alterarEmail = document.getElementById("alterarEmail");
let alterarEmailSenha = document.getElementById("alterarEmailSenha");

//Chama a função para validar o campo
validarCampo2Campos(formAlterarEmail, feedbackAlterarEmail, alterarEmail, alterarEmailSenha, "Você deve digitar um e-mail!", "Você deve digitar uma senha!", "Você deve digitar um e-mail e uma senha!");

//Captura os elementos para tratar o campo de alterar Senha
let formAlterarSenha = document.getElementById("formAlterarSenha");
let feedbackAlterarSenha = document.getElementById("feedbackAlterarSenha");
let alterarSenhaAntiga = document.getElementById("alterarSenhaAntiga");
let alterarSenhaNova = document.getElementById("alterarSenhaNova");

//Chama a função para validar o campo
validarCampo2Campos(formAlterarSenha, feedbackAlterarSenha, alterarSenhaAntiga, alterarSenhaNova, "Você deve digitar sua senha atual!", "Você deve digitar uma nova senha!", "Você deve digitar sua senha atual e sua nova senha!");


//Função que valida se um campo está vazio (para formulários com um campo)
function validarCampo(formulario, campoFeedback, campo, mensagem){
    //Cria um event listener para quando o formulário for enviado
    formulario.addEventListener('submit', evento => {

        //Previne o submit padrão do formulário
        evento.preventDefault();

        //Se o código da classe for vazio, exibe uma mensagem, se não for, o formulário é acionado
        if(campo.value == ""){
            campoFeedback.innerText = mensagem;
            setTimeout(()=>{
                campoFeedback.innerText = '';
            }, 3000);
        }else{
            formulario.submit();
        }

    });
}

//Função que valida se um campo está vazio (para formulários com dois campos)
function validarCampo2Campos(formulario, campoFeedback, campo1, campo2, mensagem1, mensagem2, mensagem3){
    //Cria um event listener para quando o formulário for enviado
    formulario.addEventListener('submit', evento => {

        //Previne o submit padrão do formulário
        evento.preventDefault();

        //Se o código da classe for vazio, exibe uma mensagem, se não for, o formulário é acionado
        if(campo1.value == "" && campo2.value == ""){
            campoFeedback.innerText = mensagem3;
            setTimeout(()=>{
                campoFeedback.innerText = '';
            }, 3000);
        }else if(campo1.value == ""){
            campoFeedback.innerText = mensagem1;
            setTimeout(()=>{
                campoFeedback.innerText = '';
            }, 3000);
        }else if(campo2.value == ""){
            campoFeedback.innerText = mensagem2;
            setTimeout(()=>{
                campoFeedback.innerText = '';
            }, 3000);
        }else{
            formulario.submit();
        }

    });
}

let feedbackAlterarDados = document.getElementById("feedbackAlterarDados").value;
let mensagemFeedbackAlterarDados = document.getElementById("mensagemFeedbackAlterarDados");

function alterarDadosFeedback(){
    if(feedbackAlterarDados != "inicio"){
        $('#modal-feedback-alterar-dados').modal('show');
        mensagemFeedbackAlterarDados.innerText = feedbackAlterarDados;
    }
}

alterarDadosFeedback();

//Captura os campos de confirmação da saida da classe
let formSairClasse = document.getElementById("formSairClasse");
let botaoConfirmar = document.getElementById("confirmarSairClasse");

formSairClasse.addEventListener("submit", evento => {

    evento.preventDefault();

    //Esconde o modal de sair da classe
    $('#modal-sair-classe').modal('hide');
    //Exibe o modal de confirmação
    $('#modal-confirmar-sair-classe').modal('show');

    //Se o usuário confirmar, envia o formulário
    botaoConfirmar.addEventListener("click", evt => {
        formSairClasse.submit();
    });

});