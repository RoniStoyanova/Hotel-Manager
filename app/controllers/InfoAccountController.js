function InfoAccountController() {

}

InfoAccountController.prototype.onCreateView = function (view) {

    ShowBars();

    function makeFormDisable() {
        view.querySelector("#infoFirstName").disabled = true;
        view.querySelector("#infoLastName").disabled = true;
        view.querySelector("#infoUserName").disabled = true;
        view.querySelector("#infoEmail").disabled = true;
        view.querySelector("#infoPassword").disabled = true;
        view.querySelector("#infoConfirmPassword").disabled = true;
        view.querySelector("#infoRadio1").disabled = true;
        view.querySelector("#infoRadio2").disabled = true;
    }

    function makeFormEnable() {
        view.querySelector("#infoFirstName").disabled = false;
        view.querySelector("#infoLastName").disabled = false;
        view.querySelector("#infoUserName").disabled = false;
        view.querySelector("#infoEmail").disabled = false;
        view.querySelector("#infoPassword").disabled = false;
        view.querySelector("#infoConfirmPassword").disabled = false;
    }

    var form = new RegistrationForm();
    var domForm =view.querySelector("#accountinfo-form");
    domForm.addEventListener("submit", function (e) {
        e.preventDefault();
    });

    form.loadFromForm(domForm);
    var url = Application.getConfigValue("dataPath") + '/LoginServlet';
    var params = {
        userId : "1"
    };
    var promise = Ajax.getRequest(url, params, true);
    promise.setOnSuccess(function (xhr) {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        //"firstName":"Veronika",
        //    "lastName":"Stoyanova",
        //    "userName":"Veronika",
        //    "password":"123456",
        //    "eMail":"roni@gmail.com",
        //    "userRole":"admin"
        console.log(response.firstName);
        view.querySelector("#infoFirstName").value = response.firstName;
        view.querySelector("#infoLastName").value = response.lastName;
        view.querySelector("#infoUserName").value = response.userName;
        view.querySelector("#infoEmail").value = response.eMail;
        view.querySelector("#infoPassword").value = response.password;
        view.querySelector("#infoConfirmPassword").value = response.password;

        if (response.userRole == 'admin') {
            view.querySelector("#infoRadio1").checked = true;
        } else {
            view.querySelector("#infoRadio1").checked = false;
        }
    });
    promise.setOnFail(function (xhr) {
        console.log(xhr.responseText);
    });

    makeFormDisable();

    view.querySelector("#editInfoButton").addEventListener("click", function () {

        makeFormEnable();

        view.querySelector("#editInfoButton").style.display = "none";
        view.querySelector("#saveChanges").style.display = "block";

    }, false);

    view.querySelector("#saveChanges").addEventListener('click', function() {
        form.loadFromForm(view.querySelector("#accountinfo-form"));
        if(!form.validate()) {
            form.applyErrorsToForm(domForm);
        } else {
            url = Application.getConfigValue("dataPath") + '/LoginServlet';

            var position;
            if (view.querySelector("#infoRadio1").checked) {
                position = "admin";
            } else {
                position = "user"
            }
            var params = {
                firstName: form.firstname,
                lastName: form.lastname,
                userName: form.username,
                eMail: form.email,
                password: form.password,
                userRole: position
            };
            //console.log(params);
            var promise = Ajax.postRequest(url, params, true);

            promise.setOnSuccess(function (xhr) {
                console.log(xhr.responseText);

                view.querySelector("#editInfoButton").style.display = "block";
                view.querySelector("#saveChanges").style.display = "none";
                makeFormDisable();

            });
            promise.setOnFail(function (xhr) {
                console.log(xhr.responseText);
            });
        }
    }, false);
};

