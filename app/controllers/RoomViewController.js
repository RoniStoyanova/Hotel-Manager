function RoomViewController() {

}

RoomViewController.prototype.onCreateView = function (view) {
    ShowBars();
    adminSetup();

    view.querySelector("#saveRoomButton").style.display = "none";
    var userRole = localStorage.getItem('userRole');

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
        view.querySelector("#statusRoom1").disabled = true;
        view.querySelector("#statusRoom2").disabled = true;
        view.querySelector("#statusRoom3").disabled = true;
        view.querySelector("#statusRoom4").disabled = true;

    }

    function makeFormEnable() {
        //view.querySelector("#roomNumber").disabled = false;
        view.querySelector("#statusRoom1").disabled = false;
        view.querySelector("#statusRoom2").disabled = false;
        view.querySelector("#statusRoom3").disabled = false;
        view.querySelector("#statusRoom4").disabled = false;
        if (localStorage.getItem("userRole") == "admin") {
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
    }

    var formReservation = new ReservationForm();
    var domFormReservation = view.querySelector("#reservation-form");
    domFormReservation.addEventListener("submit", function (e) {
        e.preventDefault();
    });

    view.querySelector("#reservationButton").addEventListener("click", function () {

        formReservation.loadFromForm(domFormReservation);
        console.log(formReservation);
        //if (!formReservation.validate()) {
        //    formReservation.applyErrorsToForm(domFormReservation);
        //} else {
            formReservation.clearErrors(domFormReservation);
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

            var roomId = localStorage.getItem("roomId");

            var params = {
                roomId: roomId,
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
        //}

    }, false);


    var formRoomInfo = new RoomForm();
    var domFormRoomInfo = view.querySelector("#createroom-form");
    domFormRoomInfo.addEventListener("submit", function (e) {
        e.preventDefault();
    });

    var url = Application.getConfigValue("dataPath") + '/RoomEditServlet';

        var roomId = localStorage.getItem("roomId");
    console.log(roomId)
        var params = {
            id: roomId
        };

        var promise = Ajax.getRequest(url, params, true);
        promise.setOnSuccess(function (xhr) {
            console.log(xhr.responseText);

            var response = JSON.parse(xhr.responseText);
            console.log(response);

            if(Ajax.mockData == false) {
                response = response[0];
            }

            var status = response.intRoomStatus;

            if ( status == 1) {
                view.querySelector('#statusRoom1').checked = true;
            }
            if (status == 2) {
                view.querySelector('#statusRoom2').checked = true;
            }
            if (status == 3) {
                view.querySelector('#statusRoom3').checked = true;
            }
            if (status == 4) {
                view.querySelector('#statusRoom4').checked = true;
            }


            view.querySelector("#roomNumber").value = response.id;
            view.querySelector("#beds").value = response.beds;
            view.querySelector("#price").value = response.price;
            view.querySelector("#description").value = response.description;

            //if (response.wifi == "true") {
            //    view.querySelector("#wifi").checked = true;
            //}
            //if (response.tv == "true") {
            //    view.querySelector("#tv").checked = true;
            //}
            //if (response.airConditioning == "true") {
            //    view.querySelector("#airConditioning").checked = true;
            //}
            //if (response.refrigerator == "true") {
            //    view.querySelector("#refrigerator").checked = true;
            //}
            //if (response.hairDryer == "true") {
            //    view.querySelector("#hairDryer").checked = true;
            //}
            //if (response.bath == "true") {
            //    view.querySelector("#bathroom").checked = true;
            //}
            //if (response.kitchen == "true") {
            //    view.querySelector("#kitchen").checked = true;
            //}
            //if (response.livingRoom == "true") {
            //    view.querySelector("#livingRoom").checked = true;
            //}
            //if (response.wc == "true") {
            //    view.querySelector("#wc").checked = true;
            //}
            //if (response.sight == "true") {
            //    view.querySelector("#sight").checked = true;
            //}
            //if (response.lux == "true") {
            //    view.querySelector("#lux").checked = true;
            //}


            if (response.wifi == true) {
                view.querySelector("#wifi").checked = true;
            }
            if (response.tv == true) {
                view.querySelector("#tv").checked = true;
            }
            if (response.airConditioning == true) {
                view.querySelector("#airConditioning").checked = true;
            }
            if (response.refrigerator == true) {
                view.querySelector("#refrigerator").checked = true;
            }
            if (response.hairDryer == true) {
                view.querySelector("#hairDryer").checked = true;
            }
            if (response.bath == true) {
                view.querySelector("#bathroom").checked = true;
            }
            if (response.kitchen == true) {
                view.querySelector("#kitchen").checked = true;
            }
            if (response.livingRoom == true) {
                view.querySelector("#livingRoom").checked = true;
            }
            if (response.wc == true) {
                view.querySelector("#wc").checked = true;
            }
            if (response.sight == true) {
                view.querySelector("#sight").checked = true;
            }
            if (response.lux == true) {
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
                formRoomInfo.clearErrors(domFormRoomInfo);
                if (Ajax.mockData == true) {
                    var url = Application.getConfigValue("dataPath") + '/RoomGenerationServlet';
                } else {
                    var url = Application.getConfigValue("dataPath") + '/RoomEditServlet';
                }
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

                    intRoomStatus: 1,
                    intRoomExtras: null
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


    view.querySelector("#viewAllReservations").addEventListener("click" , function() {
        if (Ajax.mockData == true) {
            var url = Application.getConfigValue("dataPath") + '/ReservationServlet';
        }else {
            var url = Application.getConfigValue("dataPath") + '/ViewGenerationServlet';
        }
        var roomId = localStorage.getItem("roomId");
        var params = {
            roomId: roomId
        };
        var promise = Ajax.getRequest(url, params, true);
        promise.setOnSuccess(function(xhr) {

            var response = JSON.parse(xhr.responseText);

            for (var i = 0; i < response.length; i++) {

                //Create container for the account
                var reservationView = document.createElement("div");
                document.querySelector(".reservationContainer").appendChild(reservationView);
                //accountView.style.display = "inline-block";
                reservationView.style.width = "100%";
                reservationView.style.paddingTop = "5px";
                reservationView.style.borderBottom = "1px solid black";

                var reservationName = document.createElement("a");
                reservationView.appendChild(reservationName);
                reservationName.innerHTML = (i+1) + ". Check-in: " + response[i].dateFrom + "  Check out: " + response[i].dateTo;
                reservationName.style.display = "block";
                reservationName.className = "informationLine";
                reservationName.style.padding = "5px";
            }

        });
        promise.setOnFail(function(xhr) {
            console.log(xhr.responseText);
        });
    }, false);

    var reservationParent = view.querySelector(".reservationContainer");
    reservationParent.addEventListener("click",function showInfo(e) {
        if (e.target !== e.currentTarget) {
            localStorage.setItem('reservationId', e.target.id);
            window.location.hash = '#/guestView';
        }
        e.stopPropagation();
    }, false);
}