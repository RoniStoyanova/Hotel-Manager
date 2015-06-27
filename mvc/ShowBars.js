function ShowBars() {
    if(window.location.hash != '' ) {
        document.querySelector(".navigationBar").style.display = "block";
        document.querySelector(".information").style.display = "block";
    } else {
        document.querySelector(".navigationBar").style.display = "hidden";
        document.querySelector(".information").style.display = "hidden";
    }
}