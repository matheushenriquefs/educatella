"use strict";

// Script de logout
var logout = document.getElementById("logout");
logout.addEventListener("click", function () {
  event.preventDefault();
  fetch("/logout", {
    credentials: "include"
  }).then(function (res) {
    var url = window.location.href;
    var loginUrl = "/login";
    var redirectUrl = url.split("/");
    window.location.href = "".concat(redirectUrl[0], "//").concat(redirectUrl[2]).concat(loginUrl);
  });
});