function selector (id){ 
   return document.getElementById(id)
};

const formRecados = selector("criar-recado");
const tituloRecado= selector("titulo");
const descricaoRecado = selector("descricao");



formRecados.addEventListener("submit",function(evt){
    evt.preventDefault()
    if(tituloRecado.value.trim() ==="" ){
        
        alert("O titulo tem que ser prenchido")

    } else if (descricaoRecado.value.trim() ===""){
     
     alert("A Descrição tem que ser prenchida")
     }else {
        
         alert ("Você Criou um novo Recado");
         formRecados.submit();
    
     }
 })
