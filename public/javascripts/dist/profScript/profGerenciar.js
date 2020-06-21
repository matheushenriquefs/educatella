function selector (id){ 
    return document.getElementsByClassName(id)
 };

const apagarAluno = selector("card p-3")


for (let i =0; apagarAluno.length >= i;i++){

    apagarAluno[i].addEventListener("submit",function(evt){
        evt.preventDefault()
        var r = confirm("Tem certeça!");
        if (r == true) {
            alert ("Você desligo o aluno");
            apagarAluno[i].submit();
                 } else {
                 }
        
         })}
     