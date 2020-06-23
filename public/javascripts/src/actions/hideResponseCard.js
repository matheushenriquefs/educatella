const hideResponseCard = () => {

    const cardResponse = document.querySelector(".card");

    if(typeof cardResponse !== "null" && !cardResponse.classList.contains("d-none")){

        setTimeout(() => {

            cardResponse.classList.add("d-none")

        }, 3000);

    }

}

document.addEventListener("DOMContentLoaded", hideResponseCard);