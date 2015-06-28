function RegistrationController() {

}

RegistrationController.prototype.onCreateView = function (view) {

    ShowBars();

    var form = new RegistrationForm();
    var domForm = view.querySelector("#registration-form");
    domForm.addEventListener("submit", function (e) {
        e.preventDefault();
    });
    // to do
    //view.querySelector('[name=username]').addEventListener("input" , function() {
    //
    //    var urlUsercheck = Application.getConfigValue("dataPath") + '/CheckUserServlet';
    //    var paramsUserCheck = {
    //        username : form.username
    //    };
    //
    //    var firstPromise = Ajax.postRequest(urlUsercheck, paramsUserCheck, true)
    //
    //    firstPromise.setOnSuccess(function ())
    //
    //})
    view.querySelector("#registrationButton").addEventListener('click', function() {
        form.loadFromForm(domForm);
        if(!form.validate()) {
            form.applyErrorsToForm(domForm);
        } else {
            url = Application.getConfigValue("dataPath") + '/RegistrationServlet';

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
                console.log(xhr.responseText);
                window.location.hash = '#/accounts';
            });
            promise.setOnFail(function (xhr) {
                console.log(xhr.responseText);
            });
        }
    }, false);
}
