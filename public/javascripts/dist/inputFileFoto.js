
/* Input file - nome do arquivo */

let label = document.getElementById("file-label");

let input = document.getElementById("alterarImagem");

label.addEventListener("click", function(){

    input.click();

});

input.addEventListener("change", function(){

    let nome = "Não há arquivo selecionado. Selecionar arquivo...";

    if(input.files.length > 0) nome = input.files[0].name;

    label.innerHTML = nome;

});