function HomeController() {

}

HomeController.prototype.onCreateView = function (view) {

    ShowBars();
    adminSetup();
    showNavigation();



    var form = new FilterForm();
    var domForm = view.querySelector("#filter-form");
    domForm.addEventListener("submit",function(e) {
        e.preventDefault();
    });

    view.querySelector("#filterButton").addEventListener("click", function(){

        form.loadFromForm(domForm);
        if (!form.validate()) {
            form.applyErrorsToForm(domForm);
        } else {
            form.clearErrors(domForm);
            view.querySelector(".error").innerHTML = '';
            var url = Application.getConfigValue("dataPath") + '/ViewGenerationServlet';
            var params = {
                dateFrom : form.dateFrom,
                dateTo: form.dateTo,
                beds: form.guests
            };
            console.log(params);
            var promise = Ajax.postRequest(url, params, true);
            promise.setOnSuccess(function(xhr) {
                console.log(xhr.responseText);
                var response = JSON.parse(xhr.responseText);
                for ( var i = 0; i < response.length; i++) {

                    var freeRoomView = document.createElement("div");
                    document.querySelector(".freeRooms").appendChild(freeRoomView);
                    //freeRoomView.style.display = "inline-block";
                    freeRoomView.style.width = "100%";
                    freeRoomView.style.paddingTop = "5px";
                    freeRoomView.style.borderBottom = "1px solid black";

                    var freeRoomNumber = document.createElement("a");
                    freeRoomView.appendChild(freeRoomNumber);
                    freeRoomNumber.innerHTML = "Room number: " + response[i].roomId;
                    freeRoomNumber.style.display = "block";
                    freeRoomNumber.id = response[i].roomId;
                    freeRoomNumber.className = "informationLine";
                    freeRoomNumber.style.padding = "5px";
                }
            });
            promise.setOnFail(function(xhr) {
                console.log(xhr.responseText);
            })
        }
    }, false);

    var freeRoomParent = view.querySelector(".freeRooms");
    freeRoomParent.addEventListener("click",function showInfo(e) {
        if (e.target !== e.currentTarget) {
            localStorage.setItem('roomId', e.target.id);
            window.location.hash = '#/roomInformation';
        }
        e.stopPropagation();
    }, false);
};


