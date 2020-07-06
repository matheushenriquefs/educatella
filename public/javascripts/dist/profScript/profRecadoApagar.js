/* Excluir recado */

let formExcluir = document.getElementsByClassName("formExcluir");

let feedExcluir = document.getElementsByClassName("feedbackExcluir");

for(let i = 0; i < formExcluir.length; i++){

    formExcluir[i].addEventListener("submit", evt => {
    
        formExcluir[i].submit(); 
    
    });
}