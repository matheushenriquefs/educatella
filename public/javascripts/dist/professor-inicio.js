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
            feedbackA.style.display = 'none';
            //opacity=0
        }, 3000);
        materia.focus();

    } else {
        feedbackJ.innerText = "Sua classe foi criada!";
        setTimeout(()=>{
            feedbackJ.style.display = 'none';
            //opacity=0
        }, 3000);
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
                feed[i].style.display = 'none';
                //opacity=0
            }, 3000);
            tituloA[i].focus();
    
        }else if (descricaoA[i].value == ""){
            feed[i].innerText = "O campo código deve ser preenchido!"
            setTimeout(()=>{
                feed[i].style.display = 'none';
                //opacity=0
            }, 3000);
            descricaoA[i].focus();
    
        }else{
            feedSucesso[i].innerText = "Edições concluídas!"
            setTimeout(()=>{
                feedSucesso[i].style.display = 'none';
                //opacity=0
            }, 3000);
            formEditar[i].submit();
        }
    })

}

/* Form deletar */

let formExcluir = document.getElementsByName('formExcluir')

let feedExcluir = document.getElementsByClassName('feedbackExcluir')

for(let i = 0; i < formExcluir.length; i++){

    formExcluir[i].addEventListener("submit", ev => {

        ev.preventDefault();

        
        feedExcluir[i].innerText = "Classe excluída com sucesso!"

        setTimeout(()=>{
            feedExcluir[i].style.display = 'none';
            //opacity=0
        }, 3000);

        formExcluir.submit();

    })

}
