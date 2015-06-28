
function ReservationController() {

}

ReservationController.prototype.onCreateView = function (view) {
    ShowBars();

    var form = new ReservationForm();
    var domForm = view.querySelector("#reservation-form");
    domForm.addEventListener("submit" , function(e){
        e.preventDefault();
    });

    view.querySelector("#reservationButton").addEventListener("click", function(){

        form.loadFromForm(domForm);
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

            var params = {
                roomId : form.roomNumber ,
                reservationStatus : status,
                dateFrom : form.dateFrom,
                dateTo : form.dateTo,
                firstName : form.firstName,
                lastName : form.lastName,
                passport : form.passport,
                egn : form.egn,
                eMail : form.email
            };

            console.log(params);

            var promise = Ajax.postRequest(url, params, true);
            promise.setOnSuccess(function(xhr) {
                console.log(xhr.responseText);

                window.location.hash = '#/rooms';

                var response = JSON.parse(xhr.responseText);

            });
            promise.setOnFail(function(xhr) {
                console.log(xhr.responseText);
            })
        //}

    }, false);
};

