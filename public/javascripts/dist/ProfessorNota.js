let formNotas = document.getElementsByClassName("formNotas");
let feedbackNotas = document.getElementsByClassName("feedbackAplicarNota");
let selectNotas = document.getElementsByClassName("selectNota");

for(let i = 0; i < formNotas.length; i++){
    selectNotas[i].addEventListener("change", evento => {

        evento.preventDefault();
        feedbackNotas[i].innerText = "Nota aplicada!";
        
        setTimeout(()=>{
            feedbackNotas[i].innerText = '';
            formNotas[i].submit();
        }, 1000);

    });
}