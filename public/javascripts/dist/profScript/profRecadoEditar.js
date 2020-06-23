function selector (id){ 
    return document.getElementsByClassName(id)
 };



const tituloRecado= selector("titulo");
const descricaoRecado = selector("descricao");
const editarRecados = selector("card p-3")


for (let i =0; editarRecados.length >= i;i++){

    editarRecados[i].addEventListener("submit",function(evt){
        evt.preventDefault()
        if(tituloRecado[i].value.trim() ==="" ){
    
            alert("O titulo e tem que ser prenchido")
    
        } else if (descricaoRecado[i].value.trim() ===""){
           
         alert("A Descrição tem que ser prenchida")
         }else {
        
             alert ("Você edito seu Recado");
             editarRecados[i].submit();
        
         }
     })
}