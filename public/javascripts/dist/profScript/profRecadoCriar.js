function selector (id){ 
   return document.getElementById(id)
};
 
const formRecados = selector("criar-recado");
const tituloRecado= selector("titulo");
const descricaoRecado = selector("descricao");

let feedAlerta = selector("feedAlerta");
let feedSucesso = selector("feedSucesso");



formRecados.addEventListener("submit", function(evt){

    evt.preventDefault();

    if(tituloRecado.value.trim() === "" ){

        feedAlerta.innerText = "O campo título deve ser preenchido!";

        setTimeout(()=>{
            feedAlerta.style.display = "none";
        }, 3000);

        tituloRecado.focus();

    }else if (descricaoRecado.value == ""){

        feedAlerta.innerText = "O campo descrição deve ser preenchido!";

        setTimeout(()=>{
            feedAlerta.style.display = "none";
        }, 3000);

        descricaoRecado.focus();

     }else{

        setTimeout(()=>{
            feedSucesso.style.display = "none";
        }, 3000);

        formRecados.submit();
    }
 })
 