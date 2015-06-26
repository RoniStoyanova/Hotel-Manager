function RegistrationController() {

}

RegistrationController.prototype.onCreateView = function (view) {
    view.querySelector("#registrationButton").addEventListener("click", function(){
        var form = new RegistrationForm();

        var domForm = document.getElementById("registration-form");
        domForm.addEventListener("submit",function(e) {
            e.preventDefault();
        })
        form.loadFromForm(domForm);
        if (!form.validate()) {
            form.applyErrorsToForm(domForm);
        } else {

            var url = Application.getConfigValue("dataPath") + '/RegistrationServlet';
            var params = {
                firstName: form.firstname,
                lastName : form.lastname,
                userName : form.username,
                eMail : form.email,
                password: form.password,
                userRole : form.position };
            var promise = Ajax.postRequest(url, params, true);
            promise.setOnSuccess(function(xhr) {
                console.log(xhr.responseText);
            })
            promise.setOnFail(function(xhr) {
                console.log(xhr.responseText);
                var response = JSON.parse(xhr.responseText);
                if (response.massage == "taken") {
                    form.addError("username",'User name is taken!');
                    form.applyErrorsToForm(domForm);
                }

                form.applyErrorsToForm(domForm);
                //form.addError("email",response.massage);
                //form.applyErrorsToForm(domForm);
            })
        }
    }, false);
}