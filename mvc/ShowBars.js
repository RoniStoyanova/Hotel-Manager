function ShowBars() {
    if(window.location.hash != '' ) {
        document.querySelector(".navigationBar").style.display = "block";
        document.querySelector(".information").style.display = "block";
    } else {
        document.querySelector(".navigationBar").style.display = "hidden";
        document.querySelector(".information").style.display = "hidden";
    }
}

function adminSetup() {
    var userRole = localStorage.getItem("userRole");
    if ( userRole == 'admin') {
        document.querySelector(".adminSetup1").style.display = "list-item";
        document.querySelector(".adminSetup2").style.display = "list-item";
    } else {
        document.querySelector(".adminSetup1").style.display = "none";
        document.querySelector(".adminSetup2").style.display = "none";
    }
}
