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
            var params = {
                roomNumber : form.roomNumber,
                beds : form.beds,
                price : form.price,
	            description : form.description,

                wifi : form.wifi,
                tv : form.tv,
	            airConditioning : form.airConditioning,
                hairdryer: form.hairDryer,
                refrigerator : form.refrigerator,
                bath :form.bathroom,
                kitchen : form.kitchen,
	            livingRoom : form.livingRoom
        };
            var promise = Ajax.postRequest(url, params, true);
            promise.setOnSuccess(function(xhr) {
                console.log(xhr.responseText);
                window.location.hash = '#/rooms';
            })
            promise.setOnFail(function(xhr) {
                console.log(xhr.responseText);
                var response = JSON.parse(xhr.responseText);
                form.applyErrorsToForm(domForm);
            })
        }
    }, false);
}