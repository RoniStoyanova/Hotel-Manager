function LoginController() {

}

LoginController.prototype.onCreateView = function (view) {

    ShowBars();
    //adminSetup();

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
            form.clearErrors(domForm);
            var url = Application.getConfigValue("dataPath") + '/LoginServlet';
            var params = {
                user: form.username,
                password: form.password
            };
            var promise = Ajax.postRequest(url, params, true);
            promise.setOnSuccess(function(xhr) {
                console.log(xhr.responseText);
                var response = JSON.parse(xhr.responseText);

                localStorage.setItem('userId',response.id);
                localStorage.setItem('userRole',response.userRole);
                var userId=localStorage.getItem('userId');
                var userRole = localStorage.getItem('userRole');
                document.querySelector("#accountInfo").innerHTML = response.firstName + " " + response.lastName;
                window.location.hash = '#/home';

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
