function RegistrationController() {

}

RegistrationController.prototype.onCreateView = function (view) {
    var form = new RegistrationForm();

    var domForm = document.getElementById("registration-form");
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
    view.querySelector("#registrationButton").addEventListener("click", function () {
        form.loadFromForm(domForm);
        var isValid = form.validate();
        form.applyErrorsToForm(domForm);


        var url = Application.getConfigValue("dataPath") + '/RegistrationServlet';
        var params = {
            firstName: form.firstname,
            lastName: form.lastname,
            userName: form.username,
            eMail: form.email,
            password: form.password,
            userRole: form.position
        };
        var promise = Ajax.postRequest(url, params, true);

        promise.setOnSuccess(function (xhr) {
            console.log(xhr.responseText);
        });
        promise.setOnFail(function (xhr) {
            console.log(xhr.responseText);
        });

    }, false);
}
