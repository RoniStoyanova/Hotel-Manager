
function RoomController() {

}

RoomController.prototype.onCreateView = function (view) {

    ShowBars();

    view.querySelector("#rooms").addEventListener("load", function(){

        var url = Application.getConfigValue("dataPath") + '/CreateRoomServlet';
        var params = {
            allRooms: f
        };
        var promise = Ajax.getRequest(url, params, true);
        promise.setOnSuccess(function(xhr) {
            console.log(xhr.responseText);
        })
        promise.setOnFail(function(xhr) {
            console.log(xhr.responseText);
            var response = JSON.parse(xhr.responseText);
        })
    }, false);
}
