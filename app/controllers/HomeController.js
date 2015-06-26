function HomeController() {

}

HomeController.prototype.onCreateView = function (view) {
    view.querySelector("#filterButton").addEventListener("click", function(){
        var form = new LoginForm();

        var domForm = document.getElementById("login-form");
        domForm.addEventListener("submit",function(e) {
            e.preventDefault();
        })
        form.loadFromForm(domForm);
        if (!form.validate()) {
            form.applyErrorsToForm(domForm);
        } else {
            // Да взема името на сервлета
            var url = Application.getConfigValue("dataPath") + '/LoginServlet';
            var params = { a: form.dateFrom, b: form.dateTo, c: from.guests };
            var promise = Ajax.postRequest(url, params, true);
            promise.setOnSuccess(function(xhr) {
                console.log(xhr.responseText);
            })
            promise.setOnFail(function(xhr) {
                console.log(xhr.responseText);
                //var response = JSON.parse(xhr.responseText);
                //form.addError("username",response.massage);
                //form.applyErrorsToForm(domForm);
            })
        }
    }, false);
}
