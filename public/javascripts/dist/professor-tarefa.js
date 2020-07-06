/* Validando form de criar tarefa */

let formCriar = document.getElementById("formCriar");

let feedbackA = document.getElementById("feedbackCriar");

let feedbackJ = document.getElementById("feedbackSucesso"); 


formCriar.addEventListener("submit", evt => {

    evt.preventDefault();

    let titulo = document.getElementById("tituloCriar").value;

    let descricao = document.getElementById("descricaoCriar").value; 

    let arquivo = document.getElementById('inputArquivo').value;

    let data = document.getElementById('dataCriar').value;

    if (titulo == "" || titulo == null) {
        feedbackA.innerText = "O campo título deve ser preenchido!";
        setTimeout(()=>{
            feedbackA.innerText = '';
        }, 3000);
        titulo.focus();

    } else if (descricao == "" || descricao == null) {
        feedbackA.innerText = "O campo descrição deve ser preenchido!";
        setTimeout(()=>{
            feedbackA.innerText = '';
        }, 3000);
        descricao.focus();
    
    } else if (arquivo == "" || arquivo == null) {
        feedbackA.innerText = "O campo arquivo deve ser preenchido!";
        setTimeout(()=>{
            feedbackA.innerText = '';
        }, 3000);
        arquivo.focus();
    
    } else if (data == "" || data == null) {
        feedbackA.innerText = "O campo data deve ser preenchido!";
        setTimeout(()=>{
            feedbackA.innerText = '';
        }, 3000);
        data.focus();
    
    }else {

        formCriar.submit()
    }

});


/* Validando form de editar tarefa */
 
let formEditar = document.getElementsByClassName('formEditar');

let feed = document.getElementsByClassName('feedbackEditar');

let feedSucesso = document.getElementsByClassName('feedbackEditSucesso');

let tituloA = document.getElementsByClassName('modalTarefaTitulo');

let descricaoA = document.getElementsByClassName('modalTarefaDesc');

let dataA = document.getElementsByClassName('modalTarefaData');

for(let i = 0; i < formEditar.length; i++){

    formEditar[i].addEventListener("submit", ev => {
    
        ev.preventDefault();
    
    
        if (tituloA[i].value == ""){
            feed[i].innerText = "O campo título deve ser preenchido!";
            setTimeout(()=>{
                feed[i].innerText = '';
            }, 3000);
            tituloA[i].focus();
     
        }else if (descricaoA[i].value == ""){
            feed[i].innerText = "O campo descrição deve ser preenchido!"
            setTimeout(()=>{
                feed[i].innerText = '';
            }, 3000);
            descricaoA[i].focus();
    
        }else if (dataA[i].value == ""){
            feed[i].innerText = "O campo data deve ser preenchido!"
            setTimeout(()=>{
                feed[i].innerText = '';
            }, 3000);
            dataA[i].focus();
    
        }else{

            formEditar[i].submit();
        }
    })
 
}

/* Excluir tarefa */

let formExcluir = document.getElementsByClassName("formExcluir");

let feedExcluir = document.getElementsByClassName("feedbackExcluir");

for(let i = 0; i < formExcluir.length; i++){

    formExcluir[i].addEventListener("submit", evt => {
    
        evt.preventDefault();
    
        formExcluir[i].submit();
    
    })}
    

let feedbackTarefa = document.getElementById("feedbackEnviarTarefa").value;
let mensagemFeedbackTarefa = document.getElementById("mensagemFeedbackEnviarTarefa");

function enviarTarefaFeedback(){
    if(feedbackTarefa != "inicio"){
        $('#modal-feedback-tarefa').modal('show');
        mensagemFeedbackTarefa.innerText = feedbackTarefa;
    }
}

enviarTarefaFeedback(); 