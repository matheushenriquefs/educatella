
let labelArquivo = document.getElementById("botaoArquivo");

let inputArquivo = document.getElementById("inputArquivo");

labelArquivo.addEventListener("click", function(ev){

    inputArquivo.click();

});
inputArquivo.addEventListener("change", function(evt){

    let nomeArquivo = "Não há arquivo selecionado. Selecionar arquivo...";

    if(inputArquivo.files.length > 0) nomeArquivo = inputArquivo.files[0].name;

    labelArquivo.innerHTML = nomeArquivo;

});

  
 