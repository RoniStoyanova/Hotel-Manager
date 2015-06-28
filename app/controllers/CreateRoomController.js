function CreateRoomController() {

}

CreateRoomController.prototype.onCreateView = function (view) {

    ShowBars();

    var form = new RoomForm();
    var domForm = view.querySelector("#createroom-form");
    domForm.addEventListener("submit",function(e) {
        e.preventDefault();
    });

    view.querySelector("#createroomButton").addEventListener("click", function(){

        form.loadFromForm(domForm);
        if (!form.validate()) {
            form.applyErrorsToForm(domForm);
        } else {
            var url = Application.getConfigValue("dataPath") + '/CreateRoomServlet';

            var wifi = view.querySelector('#wifi').checked;
            var tv = view.querySelector('#tv').checked;
            var airConditioning = view.querySelector('#airConditioning').checked;
            var refrigerator = view.querySelector('#refrigerator').checked;
            var hairDryer = view.querySelector('#hairDryer').checked;
            var bathroom = view.querySelector('#bathroom').checked;
            var kitchen = view.querySelector('#kitchen').checked;
            var livingRoom = view.querySelector('#livingRoom').checked;

            var params = {
                roomNumber : form.roomNumber,
                beds : form.beds,
                price : form.price,
	            description : form.description,

                wifi : wifi,
                tv : tv,
	            airConditioning : airConditioning,
                hairdryer: hairDryer,
                refrigerator : refrigerator,
                bath : bathroom,
                kitchen : kitchen,
	            livingRoom : livingRoom,

                roomStatus : 1
        };

            console.log(params);
            var promise = Ajax.postRequest(url, params, true);
            promise.setOnSuccess(function(xhr) {
                console.log(xhr.responseText);
                window.location.hash = '#/rooms';
            });
            promise.setOnFail(function(xhr) {
                console.log(xhr.responseText);
            });
        }
    }, false);
}