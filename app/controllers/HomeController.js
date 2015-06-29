function HomeController() {

}

HomeController.prototype.onCreateView = function (view) {

    ShowBars();
    adminSetup();

    var form = new FilterForm();
    var domForm = view.querySelector("#filter-form");
    domForm.addEventListener("submit",function(e) {
        e.preventDefault();
    });

    view.querySelector("#filterButton").addEventListener("click", function(){

        form.loadFromForm(domForm);
        if (!form.validate()) {
            form.applyErrorsToForm(domForm);
        } else {
            var url = Application.getConfigValue("dataPath") + '/ViewGenerationServlet';
            var params = {
                dateFrom : form.dateFrom,
                dateTo: form.dateTo,
                beds: form.guests
            };
            console.log(params);
            var promise = Ajax.postRequest(url, params, true);
            promise.setOnSuccess(function(xhr) {
                console.log(xhr.responseText);
            })
            promise.setOnFail(function(xhr) {
                console.log(xhr.responseText);
            })
        }
    }, false);

//    view.querySelector("#filterButton").addEventListener("click", function(){
//      var userId=localStorage.getItem('userId');
//        alert(userId);
//
//    }, false);
};


