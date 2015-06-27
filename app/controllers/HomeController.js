function HomeController() {

}

HomeController.prototype.onCreateView = function (view) {

    ShowBars();

    var form = new FilterForm();
    var domForm = view.querySelector("#filter-form");
    domForm.addEventListener("submit",function(e) {
        e.preventDefault();
    })

    view.querySelector("#filterButton").addEventListener("click", function(){

        form.loadFromForm(domForm);
        if (!form.validate()) {
            form.applyErrorsToForm(domForm);
        } else {
            // Да взема името на сервлета
            var url = Application.getConfigValue("dataPath") + '/FilterServlet';
            var params = { dateFrom : form.dateFrom, dateTo: form.dateTo, guests: form.guests };
            var promise = Ajax.postRequest(url, params, true);
            promise.setOnSuccess(function(xhr) {
                console.log(xhr.responseText);
            })
            promise.setOnFail(function(xhr) {
                console.log(xhr.responseText);
            })
        }
    }, false);

}


