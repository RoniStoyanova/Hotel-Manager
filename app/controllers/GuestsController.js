function GuestsController() {

}

GuestsController.prototype.onCreateView = function (view) {
    ShowBars();
    adminSetup();

    var url = Application.getConfigValue("dataPath") + '/ReservationServlet';
    var params = {

    };
    var promise = Ajax.getRequest(url, params, true);
    promise.setOnSuccess(function(xhr) {
        var response = JSON.parse(xhr.responseText);
        //console.log(response);
        //console.log(response[1].beds);
        for (var i = 0; i < response.length; i++) {

            //Create container for the account
            var guestsView = document.createElement("div");
            document.querySelector("#guestsContainer").appendChild(guestsView);
            guestsView.style.display = "inline-block";
            guestsView.style.width = "100%";
            guestsView.style.paddingTop = "10px";
            guestsView.style.borderBottom = "1px solid black"

            var guestName = document.createElement("p");
            guestsView.appendChild(guestName);
            guestName.innerHTML = response[i].firstName + " " + response[i].lastName;
            guestName.style.display = "inline";

        }
    });
    promise.setOnFail(function(xhr) {
        console.log(xhr.responseText);
    });

}

