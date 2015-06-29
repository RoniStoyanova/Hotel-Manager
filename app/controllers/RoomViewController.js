function RoomViewController() {

}

RoomViewController.prototype.onCreateView = function (view) {
    ShowBars();
    adminSetup();

    view.querySelector("#saveRoomButton").style.display = "none";
    var userRole = localStorage.getItem('userRole');
    if (userRole == "admin") {
        view.querySelector(".reservation").style.display = "none";
        view.querySelector(".roomInfo").style.float = "none";
        view.querySelector(".roomInfo").style.margin = "15px auto";

    } else {
        view.querySelector("#editRoomButton").style.display = "none";
        view.querySelector(".extras").style.margin = "18px 0"
    }

    function makeFormDisable() {
        view.querySelector("#roomNumber").disabled = true;
        view.querySelector("#beds").disabled = true;
        view.querySelector("#price").disabled = true;
        view.querySelector("#description").disabled = true;
        view.querySelector("#wifi").disabled = true;
        view.querySelector("#tv").disabled = true;
        view.querySelector("#airConditioning").disabled = true;
        view.querySelector("#refrigerator").disabled = true;
        view.querySelector("#hairDryer").disabled = true;
        view.querySelector("#bathroom").disabled = true;
        view.querySelector("#kitchen").disabled = true;
        view.querySelector("#livingRoom").disabled = true;
        view.querySelector("#wc").disabled = true;
        view.querySelector("#sight").disabled = true;
        view.querySelector("#lux").disabled = true;
    }

    function makeFormEnable() {
        //view.querySelector("#roomNumber").disabled = false;
        view.querySelector("#beds").disabled = false;
        view.querySelector("#price").disabled = false;
        view.querySelector("#description").disabled = false;
        view.querySelector("#wifi").disabled = false;
        view.querySelector("#tv").disabled = false;
        view.querySelector("#airConditioning").disabled = false;
        view.querySelector("#refrigerator").disabled = false;
        view.querySelector("#hairDryer").disabled = false;
        view.querySelector("#bathroom").disabled = false;
        view.querySelector("#kitchen").disabled = false;
        view.querySelector("#livingRoom").disabled = false;
        view.querySelector("#wc").disabled = false;
        view.querySelector("#sight").disabled = false;
        view.querySelector("#lux").disabled = false;
    }

    var formReservation = new ReservationForm();
    var domFormReservation = view.querySelector("#reservation-form");
    domFormReservation.addEventListener("submit", function (e) {
        e.preventDefault();
    });

    view.querySelector("#reservationButton").addEventListener("click", function () {

        formReservation.loadFromForm(domFormReservation);
        //if (!form.validate()) {
        //    form.applyErrorsToForm(domForm);
        //} else {
        var url = Application.getConfigValue("dataPath") + '/ReservationServlet';

        var status;
        var confirmed = view.querySelector('#status1').checked;
        if (confirmed) {
            status = 1;
        }
        var notConfirmed = view.querySelector('#status2').checked;
        if (notConfirmed) {
            status = 2;
        }
        var paid = view.querySelector('#status3').checked;
        if (paid) {
            status = 3;
        }
        var annulled = view.querySelector('#status4').checked;
        if (annulled) {
            status = 4;
        }

        var roomId = localStorage.getItem("roomID");

        var params = {
            id: roomId,
            reservationStatus: status,
            dateFrom: formReservation.dateFrom,
            dateTo: formReservation.dateTo,
            firstName: formReservation.firstName,
            lastName: formReservation.lastName,
            passport: formReservation.passport,
            egn: formReservation.egn,
            eMail: formReservation.email
        };

        console.log(params);

        var promise = Ajax.postRequest(url, params, true);
        promise.setOnSuccess(function (xhr) {
            console.log(xhr.responseText);
            view.querySelector("#reservation-form").reset();
            var response = JSON.parse(xhr.responseText);

        });
        promise.setOnFail(function (xhr) {
            console.log(xhr.responseText);
        });


    }, false);


    var formRoomInfo = new RoomForm();
    var domFormRoomInfo = view.querySelector("#createroom-form");
    domFormRoomInfo.addEventListener("submit", function (e) {
        e.preventDefault();
    });

    formRoomInfo.loadFromForm(domFormRoomInfo);
    var url = Application.getConfigValue("dataPath") + '/RoomEditServlet';

    var roomId = localStorage.getItem("roomId");
    var params = {
        id: roomId
    };

    var promise = Ajax.getRequest(url, params, true);
    promise.setOnSuccess(function (xhr) {
        console.log(xhr.responseText);

        var response = JSON.parse(xhr.responseText);

        view.querySelector("#roomNumber").value = response.id;
        view.querySelector("#beds").value = response.beds;
        view.querySelector("#price").value = response.price;
        view.querySelector("#description").value = response.description;

        if (response.wifi == 'true') {
            view.querySelector("#wifi").checked = true;
        }
        if (response.tv == 'true') {
            view.querySelector("#tv").checked = true;
        }
        if (response.airConditioning == 'true') {
            view.querySelector("#airConditioning").checked = true;
        }
        if (response.refrigerator == 'true') {
            view.querySelector("#refrigerator").checked = true;
        }
        if (response.hairDryer == 'true') {
            view.querySelector("#hairDryer").checked = true;
        }
        if (response.bath == 'true') {
            view.querySelector("#bathroom").checked = true;
        }
        if (response.kitchen == 'true') {
            view.querySelector("#kitchen").checked = true;
        }
        if (response.livingRoom == 'true') {
            view.querySelector("#livingRoom").checked = true;
        }
        if (response.wc == 'true') {
            view.querySelector("#wc").checked = true;
        }
        if (response.sight == 'true') {
            view.querySelector("#sight").checked = true;
        }
        if (response.lux == 'true') {
            view.querySelector("#lux").checked = true;
        }

    });
    promise.setOnFail(function (xhr) {
        console.log(xhr.responseText);
    });

    makeFormDisable();

    var userRole = localStorage.getItem("userRole");

        view.querySelector("#editRoomButton").addEventListener("click", function () {

            makeFormEnable();

            view.querySelector("#editRoomButton").style.display = "none";
            view.querySelector("#saveRoomButton").style.display = "block";

        }, false);

        view.querySelector("#saveRoomButton").addEventListener('click', function () {
            formRoomInfo.loadFromForm(view.querySelector("#createroom-form"));
            if (!formRoomInfo.validate()) {
                formRoomInfo.applyErrorsToForm(domFormRoomInfo);
            } else {
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
                    id: formRoomInfo.roomNumber,
                    beds: formRoomInfo.beds,
                    price: formRoomInfo.price,
                    description: formRoomInfo.description,

                    wifi: wifi,
                    tv: tv,
                    airConditioning: airConditioning,
                    hairDryer: hairDryer,
                    refrigerator: refrigerator,
                    bath: bathroom,
                    kitchen: kitchen,
                    livingRoom: livingRoom,
                    lux: lux,
                    sight: sight,
                    wc: wc,

                    intRoomStatus: 1
                };

                console.log(params);
                var promise = Ajax.postRequest(url, params, true);
                promise.setOnSuccess(function (xhr) {
                    console.log(xhr.responseText);

                    view.querySelector("#editRoomButton").style.display = "block";
                    view.querySelector("#saveRoomButton").style.display = "none";
                    makeFormDisable();
                });
                promise.setOnFail(function (xhr) {
                    console.log(xhr.responseText);
                });
            }
        }, false);

};