function GuestViewController() {

}

GuestViewController.prototype.onCreateView = function(view) {
    ShowBars();
    adminSetup();
    showNavigation();

    var userRole = localStorage.getItem("userRole");

    view.querySelector("#saveGuestButton").style.display = "none";
    if (userRole == "admin") {
        view.querySelector("#editGuestButton").style.display = "none";
    }

    function makeFormDisable() {
        view.querySelector("#guestFirstName").disabled = true;
        view.querySelector("#guestLastName").disabled = true;
        view.querySelector("#guestEGN").disabled = true;
        view.querySelector("#guestPassport").disabled = true;
        view.querySelector("#guestEmail").disabled = true;
        view.querySelector("#resRoomNumber").disabled = true;
        view.querySelector("#resDateFrom").disabled = true;
        view.querySelector("#resDateTo").disabled = true;
        view.querySelector("#resStatus1").disabled = true;
        view.querySelector("#resStatus2").disabled = true;
        view.querySelector("#resStatus3").disabled = true;
        view.querySelector("#resStatus4").disabled = true;

    }

    function makeFormEnable() {
        view.querySelector("#guestFirstName").disabled = false;
        view.querySelector("#guestLastName").disabled = false;
        view.querySelector("#guestEGN").disabled = false;
        view.querySelector("#guestPassport").disabled = false;
        view.querySelector("#guestEmail").disabled = false;
        //view.querySelector("#resRoomNumber").disabled = false;
        view.querySelector("#resDateFrom").disabled = false;
        view.querySelector("#resDateTo").disabled = false;
        view.querySelector("#resStatus1").disabled = false;
        view.querySelector("#resStatus2").disabled = false;
        view.querySelector("#resStatus3").disabled = false;
        view.querySelector("#resStatus4").disabled = false;

    }

    var form = new ReservationForm();
    var domForm =view.querySelector("#guest-form");
    domForm.addEventListener("submit", function (e) {
        e.preventDefault();
    });

    form.loadFromForm(domForm);
    var url = Application.getConfigValue("dataPath") + '/GuestServlet';

    var reservationId = localStorage.getItem("reservationId");
    var params = {
        id: reservationId
    };

    var promise = Ajax.getRequest(url, params, true);
    promise.setOnSuccess(function (xhr) {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);

        view.querySelector("#guestFirstName").value = response.firstName;
        view.querySelector("#guestLastName").value = response.lastName;
        view.querySelector("#guestEGN").value = response.egn;
        view.querySelector("#guestEmail").value = response.eMail;
        view.querySelector("#guestPassport").value = response.passport;

        view.querySelector("#resDateFrom").value = response.dateFrom;
        view.querySelector("#resDateTo").value = response.dateTo;
        view.querySelector("#resRoomNumber").value = response.roomId;

        if (response.reservationStatus == 1) {
            view.querySelector("#resStatus1").checked = true;
        }
        if (response.reservationStatus == 2) {
            view.querySelector("#resStatus2").checked = true;
        }
        if (response.reservationStatus == 3) {
            view.querySelector("#resStatus3").checked = true;
        }
        if (response.reservationStatus == 4) {
            view.querySelector("#resStatus4").checked = true;
        }
    });
    promise.setOnFail(function (xhr) {
        console.log(xhr.responseText);
    });

    makeFormDisable();

    view.querySelector("#editGuestButton").addEventListener("click", function () {

        makeFormEnable();

        view.querySelector("#editGuestButton").style.display = "none";
        view.querySelector("#saveGuestButton").style.display = "block";

    }, false);

    view.querySelector("#saveGuestButton").addEventListener('click', function() {
        form.loadFromForm(view.querySelector("#guest-form"));
        //if(!form.validate()) {
        //    form.applyErrorsToForm(domForm);
        //} else {
            url = Application.getConfigValue("dataPath") + '/UserEditServlet';

            var reservationStatus;
            if ( view.querySelector("#resStatus1").checked) {
                reservationStatus = 1;
            }
            if (view.querySelector("#resStatus2").checked) {
                reservationStatus = 2
            }
            if (view.querySelector("#resStatus3").checked) {
                reservationStatus = 3
            }
            if (view.querySelector("#resStatus4").checked) {
                reservationStatus = 4
            }

            var params = {
                roomId : form.roomId,
                dateFrom: form.dateFrom ,
                dateTo : form.dateTo,
                reservationStatus: reservationStatus,
                firstName: form.firstName,
                lastName: form.lastname,
                egn: form.egn,
                eMail: form.email,
                passport: form.passport

            };
            //console.log(params);
            var promise = Ajax.postRequest(url, params, true);

            promise.setOnSuccess(function (xhr) {
                console.log(xhr.responseText);

                view.querySelector("#editGuestButton").style.display = "block";
                view.querySelector("#saveGuestButton").style.display = "none";
                makeFormDisable();

            });
            promise.setOnFail(function (xhr) {
                console.log(xhr.responseText);
            });
        //}
    }, false);
};