
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
        console.log(response);
        console.log(response[1].beds);
        //for (var i = 0; i < response.length; i++) {
        //
        //    if (response[i].beds == 1) {
        //        var roomView = document.createElement("div");
        //        document.querySelector(".single").appendChild(roomView);
        //        roomView.id = response[i].roomID;
        //        var roomNumber = document.createElement("p");
        //        roomView.appendChild(roomNumber);
        //    } else if (response[i].beds == 2) {
        //        var roomView =document.createElement("div");
        //        document.querySelector(".double").appendChild(roomView);
        //        roomView.id = response[i].roomID;
        //        var roomNumber = document.createElement("p");
        //        roomView.appendChild(roomNumber);
        //    } else if (response[i].beds == 3){
        //        var roomView = document.createElement("DIV");
        //        document.querySelector(".triple").appendChild(roomView);
        //        roomView.id = response[i].roomID;
        //        var roomNumber = document.createElement("P");
        //        roomView.appendChild(roomNumber);
        //    } else {
        //        var roomView = document.createElement("div");
        //        document.querySelector(".more").appendChild(roomView);
        //        roomView.id = response[i].roomID;
        //        var roomNumber = document.createElement("p");
        //        roomView.appendChild(roomNumber);
        //    }
        //}
    });
    promise.setOnFail(function(xhr) {
        console.log(xhr.responseText);
    })

}
