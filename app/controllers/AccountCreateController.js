function AccountCreateController() {

}

AccountCreateController.prototype.onCreateView = function (view) {

    ShowBars();
    adminSetup();
    //showNavigation();


    var form = new RegistrationForm();
    var domForm = view.querySelector("#registration-form");
    domForm.addEventListener("submit", function (e) {
        e.preventDefault();
    });
    view.querySelector("#registrationButton").addEventListener('click', function() {
        form.loadFromForm(domForm);
        if(!form.validate()) {
            form.applyErrorsToForm(domForm);
        } else {
            form.clearErrors(domForm);
            var url = Application.getConfigValue("dataPath") + '/RegistrationServlet';
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

            var promise = Ajax.postRequest(url, params, true);

            promise.setOnSuccess(function (xhr) {
                //form.clearFields(domForm);
                window.location.hash = '#/accounts';
            });
            promise.setOnFail(function (xhr) {
                console.log(xhr.responseText);
            });
        }
    }, false);
}
