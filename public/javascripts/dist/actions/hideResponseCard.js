"use strict";

var hideResponseCard = function hideResponseCard() {
  var cardResponse = document.querySelector(".card");

  if (typeof cardResponse !== "null" && !cardResponse.classList.contains("d-none")) {
    setTimeout(function () {
      cardResponse.classList.add("d-none");
    }, 3000);
  }
};

document.addEventListener("DOMContentLoaded", hideResponseCard);