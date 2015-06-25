function LoginController() {

}

LoginController.prototype.onCreateView = function (view) {
    view.querySelector("#loginButton").addEventListener("click", function(){
        var form = new LoginForm();

        var domForm = document.getElementById("login-form");
        domForm.addEventListener("submit",function(e) {
            e.preventDefault();
        })
        form.loadFromForm(domForm);
        if (!form.validate()) {
            form.applyErrorsToForm(domForm);
        } else {

            var url = Application.getConfigValue("dataPath") + '/LoginServlet';
            var params = { user: form.username, password: form.password };
            var promise = Ajax.postRequest(url, params, true);
            promise.setOnSuccess(function(xhr) {
                console.log(xhr.responseText);
            })
            promise.setOnFail(function(xhr) {
                console.log(xhr.responseText);
                var response = JSON.parse(xhr.responseText);
                form.addError("username",response.massage);
                form.applyErrorsToForm(domForm);
            })
        }
    }, false);
}