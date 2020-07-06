/* Validando form de editar recado */
 
let formEditar = document.getElementsByClassName('formEditarRecado');

let feed = document.getElementsByClassName('feedbackAlert');

let feedSucessoRecado = document.getElementsByClassName('feedbackSucessoRecado');

let tituloA = document.getElementsByClassName('titulo');

let descricaoA = document.getElementsByClassName('descricao');

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
    
        }else{

            formEditar[i].submit();
        }
    })
 
}