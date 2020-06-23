function selector (id){ 
    return document.getElementsByClassName(id)
 };

const apagarRecados = selector("card p-3")


for (let i =0; apagarRecados.length >= i;i++){

    apagarRecados[i].addEventListener("submit",function(evt){
        evt.preventDefault()
        var r = confirm("Tem certeça!");
        if (r == true) {
            alert ("Você elimino seu Recado");
            apagarRecados[i].submit();
                 } else {
                 }
        
         })}
     
