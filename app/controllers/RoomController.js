
function RoomController() {

}

RoomController.prototype.onCreateView = function (view) {

    ShowBars();

    var url = Application.getConfigValue("dataPath") + '/AllRoomsServlet';
    var params = {

    };
    var promise = Ajax.getRequest(url, params, true);
    promise.setOnSuccess(function(xhr) {
        var response = JSON.parse(xhr.responseText);
        //console.log(response);
        //console.log(response[1].beds);
        for (var i = 0; i < response.length; i++) {

            if (response[i].beds == 1) {


                var roomView = document.createElement("div");
                document.querySelector(".single").appendChild(roomView);
                roomView.style.display = "inline-block";
                roomView.style.width = "100%";
                roomView.style.paddingTop = "10px";

                var roomNumber = document.createElement("p");
                roomView.appendChild(roomNumber);
                roomNumber.innerHTML = "Room number: " + response[i].roomNumber;
                roomNumber.style.display = "inline";

                //Button for reservation
                var reservationButton = document.createElement("button");
                roomView.appendChild(reservationButton);
                reservationButton.innerHTML = "reservation";
                reservationButton.className = "ButtonReservation";



                //Button for room information
                var infoButton = document.createElement("button");
                roomView.appendChild(infoButton);
                infoButton.innerHTML = "information";
                infoButton.className = "ButtonInformation";

            } else if (response[i].beds == 2) {
                var roomView =document.createElement("div");
                document.querySelector(".double").appendChild(roomView);
                roomView.style.display = "inline-block";
                roomView.style.width = "100%";
                roomView.style.paddingTop = "10px";

                var roomNumber = document.createElement("p");
                roomView.appendChild(roomNumber);
                roomNumber.innerHTML = "Room number: " + response[i].roomNumber;
                roomNumber.style.display = "inline";

                //Button for reservation
                var reservationButton = document.createElement("button");
                roomView.appendChild(reservationButton);
                reservationButton.innerHTML = "reservation";
                reservationButton.className = "ButtonReservation";

                //Button for room information
                var infoButton = document.createElement("button");
                roomView.appendChild(infoButton);
                infoButton.innerHTML = "information";
                infoButton.className = "ButtonInformation";


            } else if (response[i].beds == 3){
                var roomView = document.createElement("DIV");
                document.querySelector(".triple").appendChild(roomView);
                roomView.style.display = "inline-block";
                roomView.style.width = "100%";
                roomView.style.paddingTop = "10px";

                var roomNumber = document.createElement("P");
                roomView.appendChild(roomNumber);
                roomNumber.innerHTML = "Room number :" + response[i].roomNumber;
                roomNumber.style.display = "inline";

                //Button for reservation
                var reservationButton = document.createElement("button");
                roomView.appendChild(reservationButton);
                reservationButton.innerHTML = "reservation";
                reservationButton.className = "ButtonReservation";

                //Button for room information
                var infoButton = document.createElement("button");
                roomView.appendChild(infoButton);
                infoButton.innerHTML = "information";
                infoButton.className = "ButtonInformation";


            } else {
                var roomView = document.createElement("div");
                document.querySelector(".more").appendChild(roomView);
                roomView.style.display = "inline-block";
                roomView.style.width = "100%";
                roomView.style.paddingTop = "10px";

                var roomNumber = document.createElement("p");
                roomView.appendChild(roomNumber);
                roomNumber.innerHTML = "Room number :" + response[i].roomNumber;
                roomNumber.style.display = "inline";

                //Button for reservation
                var reservationButton = document.createElement("button");
                roomView.appendChild(reservationButton);
                reservationButton.innerHTML = "reservation";
                reservationButton.className = "ButtonReservation";

                //Button for room information
                var infoButton = document.createElement("button");
                roomView.appendChild(infoButton);
                infoButton.innerHTML = "information";
                infoButton.className = "ButtonInformation";

            }
        }


    });
    promise.setOnFail(function(xhr) {
        console.log(xhr.responseText);
    });

    view.querySelector("#registrationButton").addEventListener("click", function() {
        window.location.hash = '#/reservation';
    })

    //var info = document.createElement("div");
    //document.querySelector(".single").appendChild(info);
    //info.style.display = "none";

    //if (info.style.display == "none'") {
//        view.querySelectorAll(".ButtonInformation").addEventListener('click', function () {
//
//            var url = Application.getConfigValue("dataPath") + '/AlRoomServlet';
//            var params = {};
//            var promise = Ajax.getRequest(url, params, true);
//            promise.setOnSuccess(function (xhr) {
//                console.log(xhr.responseText);
//
//                var response = JSON.parse(xhr.responseText);
//
//                var x;
//                var extras = '';
//                for (x in response) {
//                    if (response[x] == 'true') {
//                        extras += response[x] + ' ';
//                    }
//                }
//
//                var p1 = document.createElement("p");
//                document.appendChild(p1);
//                p1.innerHTML = "Beds: " + response.beds + "  Price: " + response.price + "\n" + "Extras: " + extras;
//
//            });
//            promise.setOnFail(function (xhr) {
//                console.log(xhr.responseText);
//
//            });
//
//
//        }, false);
////    }


};
