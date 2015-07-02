function RoomCreateController() {

}

RoomCreateController.prototype.onCreateView = function (view) {

    ShowBars();
    adminSetup();
    //showNavigation();

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
            form.clearErrors(domForm);
            var url = Application.getConfigValue("dataPath") + '/RoomGenerationServlet';

            var wifi = view.querySelector('#wifi').checked;
            var tv = view.querySelector('#tv').checked;
            var airConditioning = view.querySelector('#airConditioning').checked;
            var refrigerator = view.querySelector('#refrigerator').checked;
            var hairDryer = view.querySelector('#hairDryer').checked;
            var bathroom = view.querySelector('#bathroom').checked;
            var kitchen = view.querySelector('#kitchen').checked;
            var livingRoom = view.querySelector('#livingRoom').checked;
            var wc = view.querySelector('#wc').checked;
            var sight = view.querySelector('#sight').checked;
            var lux = view.querySelector('#lux').checked;

            var params = {
                id : form.roomNumber,
                beds : form.beds,
                price : form.price,
	            description : form.description,

                wifi : wifi,
                tv : tv,
	            airConditioning : airConditioning,
                hairDryer: hairDryer,
                refrigerator : refrigerator,
                bath : bathroom,
                kitchen : kitchen,
	            livingRoom : livingRoom,
                lux: lux,
                sight : sight,
                wc : wc,

                intRoomStatus : 1
        };
            var promise = Ajax.postRequest(url, params, true);
            promise.setOnSuccess(function(xhr) {

                window.location.hash = '#/rooms';
            });
            promise.setOnFail(function(xhr) {

                form.addError("roomNumber","Room exist");
                form.applyErrorsToForm(domForm);
                console.log(xhr.responseText);
            });
        }
    }, false);
};