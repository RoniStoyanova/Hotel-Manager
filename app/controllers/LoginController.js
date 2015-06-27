function LoginController() {

}

LoginController.prototype.onCreateView = function (view) {

    ShowBars();


    var form = new LoginForm();
    var domForm = view.querySelector("#login-form");
    domForm.addEventListener("submit",function(e) {
        e.preventDefault();
    });

    view.querySelector("#loginButton").addEventListener("click", function(){

        form.loadFromForm(domForm);
        if (!form.validate()) {
            form.applyErrorsToForm(domForm);
        } else {
            var url = Application.getConfigValue("dataPath") + '/LoginServlet';
            var params = {
                user: form.username,
                password: form.password
            };
            var promise = Ajax.postRequest(url, params, true);
            promise.setOnSuccess(function(xhr) {
                console.log(xhr.responseText);

                window.location.hash = '#/home';


                var response = JSON.parse(xhr.responseText);

            });
            promise.setOnFail(function(xhr) {
                console.log(xhr.responseText);

                var response = JSON.parse(xhr.responseText);
                form.addError("username",response.massage);
                form.applyErrorsToForm(domForm);
            })
        }

    }, false);
};
