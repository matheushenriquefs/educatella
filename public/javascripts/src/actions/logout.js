// Script de logout

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {

    event.preventDefault();

    fetch("/logout", {

        credentials: "include"

    })
    .then(res => {
        
        const url = window.location.href;
        const loginUrl = "/login";
        let redirectUrl = url.split("/");
        
        window.location.href = `${redirectUrl[0]}//${redirectUrl[2]}${loginUrl}`;

    });

});