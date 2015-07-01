
function RoomController() {

}

RoomController.prototype.onCreateView = function (view) {

    ShowBars();
    adminSetup();

    var url = Application.getConfigValue("dataPath") + '/AllRoomsServlet';
    var params = {

    };
    var promise = Ajax.getRequest(url, params, true);
    promise.setOnSuccess(function(xhr) {

        var response = JSON.parse(xhr.responseText);

        for (var i = 0; i < response.length; i++) {

            if (response[i].beds == 1) {

                var roomView = document.createElement("div");
                document.querySelector(".single").appendChild(roomView);
                //roomView.style.display = "inline-block";
                roomView.style.width = "100%";
                roomView.style.paddingTop = "3px";
                roomView.style.borderBottom = "1px solid black";

                var roomNumber = document.createElement("a");
                roomView.appendChild(roomNumber);
                roomNumber.innerHTML = "Room number: " + response[i].roomNumber;
                roomNumber.style.display = "block";
                roomNumber.id = response[i].id;
                roomNumber.className = "informationLine";
                roomNumber.style.paddingBottom = "5px";


            } else if (response[i].beds == 2) {

                var roomView =document.createElement("div");
                document.querySelector(".double").appendChild(roomView);
                //roomView.style.display = "inline-block";
                roomView.style.width = "100%";
                roomView.style.paddingTop = "3px";
                roomView.style.borderBottom = "1px solid black";

                var roomNumber = document.createElement("a");
                roomView.appendChild(roomNumber);
                roomNumber.innerHTML = "Room number: " + response[i].roomNumber;
                roomNumber.style.display = "block";
                roomNumber.id = response[i].id;
                roomNumber.className = "informationLine";
                roomNumber.style.paddingBottom = "5px";

            } else if (response[i].beds == 3){

                var roomView = document.createElement("DIV");
                document.querySelector(".triple").appendChild(roomView);
                //roomView.style.display = "inline-block";
                roomView.style.width = "100%";
                roomView.style.paddingTop = "3px";
                roomView.style.borderBottom = "1px solid black";

                var roomNumber = document.createElement("a");
                roomView.appendChild(roomNumber);
                roomNumber.innerHTML = "Room number :" + response[i].roomNumber;
                roomNumber.style.display = "block";
                roomNumber.id = response[i].id;
                roomNumber.className = "informationLine"
                roomNumber.style.paddingBottom = "5px";

            } else {

                var roomView = document.createElement("div");
                document.querySelector(".more").appendChild(roomView);
                //roomView.style.display = "inline-block";
                roomView.style.width = "100%";
                roomView.style.paddingTop = "5px";
                roomView.style.borderBottom = "1px solid black";

                var roomNumber = document.createElement("a");
                roomView.appendChild(roomNumber);
                roomNumber.innerHTML = "Room number :" + response[i].roomNumber;
                roomNumber.id = response[i].id;
                roomNumber.className = "informationLine"
                roomNumber.style.padding = "5px";
                roomNumber.style.display = "block";

            }
        }
    });
    promise.setOnFail(function(xhr) {
        console.log(xhr.responseText);
    });

    var singleRoomParent = view.querySelector(".single");
    singleRoomParent.addEventListener("click",function showInfo(e) {
        if (e.target !== e.currentTarget) {
            localStorage.setItem('roomId', e.target.id);
            window.location.hash = '#/roomInformation';
        }
        e.stopPropagation();
    }, false);

    var doubleRoomParent = view.querySelector(".double");
    doubleRoomParent.addEventListener("click",function showInfo(e) {
        if (e.target !== e.currentTarget) {
            localStorage.setItem('roomId', e.target.id);
            window.location.hash = '#/roomInformation';
        }
        e.stopPropagation();
    }, false);

    var tripleRoomParent = view.querySelector(".triple");
    tripleRoomParent.addEventListener("click",function showInfo(e) {
        if (e.target !== e.currentTarget) {
            localStorage.setItem('roomId', e.target.id);
            window.location.hash = '#/roomInformation';
        }
        e.stopPropagation();
    }, false);

    var moreRoomParent = view.querySelector(".more");
    moreRoomParent.addEventListener("click",function showInfo(e) {
        if (e.target !== e.currentTarget) {
            localStorage.setItem('roomId', e.target.id);
            window.location.hash = '#/roomInformation';
        }
        e.stopPropagation();
    }, false);


};
