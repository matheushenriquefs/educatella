/* Validando form de criar classe */

let formCriar = document.getElementById("form-criar-classe");

let feedbackA = document.getElementById("feedbackCriar");

let feedbackJ = document.getElementById("feedbackSucesso");

formCriar.addEventListener("submit", evt => {

    evt.preventDefault();

    let materia = document.getElementById("nomeCriar").value;  

    if (materia == null || materia == "") {
        feedbackA.innerText = "O campo matéria deve ser preenchido!";
        setTimeout(()=>{
            feedbackA.innerText = '';
        }, 3000);
        materia.focus();

    } else {
        formCriar.submit()
    }

});

/* Validando form de editar classe */


let formEditar = document.getElementsByClassName('formEditar');

let feed = document.getElementsByClassName('feedbackEditar');

let feedSucesso = document.getElementsByClassName('feedbackEditSucesso');

let tituloA = document.getElementsByClassName('modalMateria');

let descricaoA = document.getElementsByClassName('modalCodigo');

for(let i = 0; i < formEditar.length; i++){

formEditar[i].addEventListener("submit", ev => {
    
        ev.preventDefault();
    
    
        if (tituloA[i].value == ""){
            feed[i].innerText = "O campo matéria deve ser preenchido!";
            setTimeout(()=>{
                feed[i].innerText = '';
            }, 3000);
            tituloA[i].focus();
    
        }else if (descricaoA[i].value == ""){
            feed[i].innerText = "O campo código deve ser preenchido!"
            setTimeout(()=>{
                feed[i].innerText = '';
            }, 3000);
            descricaoA[i].focus();
    
        }else{

            feed[i].innerText = '';
            formEditar[i].submit();
        }
    })

}

let feedbackClasse = document.getElementById("feedbackAcessarClasse").value;
let mensagemFeedbackClasse = document.getElementById("mensagemFeedbackClasse");

function acessarClasseFeedback(){
    if(feedbackClasse != "inicio"){
        $('#modal-feedback-classe').modal('show');
        mensagemFeedbackClasse.innerText = feedbackClasse;
    }
}

acessarClasseFeedback();