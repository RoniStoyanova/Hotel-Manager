function InfoAccountController() {

}

InfoAccountController.prototype.onCreateView = function (view) {

    //var form = new RegistrationForm();
    //var domForm = document.getElementById("accountinfo-form");
    //domForm.addEventListener("submit", function (e) {
    //    e.preventDefault();
    //});
    //
    //window.onload = function () {
    //
    //    view.getElementById("infoFirstName").disabled = true;
    //    view.getElementById("infoLastName").disabled = true;
    //    view.getElementById("infoUserName").disabled = true;
    //    view.getElementById("infoEmail").disabled = true;
    //    view.getElementById("infoPassword").disabled = true;
    //    view.getElementById("infoConfirmPassword").disabled = true;
    //    view.getElementById("infoRadio1").disabled = true;
    //    view.getElementById("infoRadio2").disabled = true;
    //
    //};
    //
    //view.querySelector("#editInfoButton").addEventListener("click", function () {
    //
    //    view.getElementById("infoFirstName").disabled = false;
    //    view.getElementById("infoLastName").disabled = false;
    //    view.getElementById("infoUserName").disabled = false;
    //    view.getElementById("infoEmail").disabled = false;
    //    view.getElementById("infoPassword").disabled = false;
    //    view.getElementById("infoConfirmPassword").disabled = false;
    //
    //    // Edit form
    //    form.loadFromForm(domForm);
    //    if (!form.validate()) {
    //        form.applyErrorsToForm(domForm);
    //    } else {
    //        //To do - da smenq servleta
    //        var url = Application.getConfigValue("dataPath") + '/RegistrationServlet';
    //
    //        var params = {
    //            // da im pratq id
    //        };
    //
    //        var promise = Ajax.postRequest(url, params, true);
    //
    //        promise.setOnSuccess(function (xhr) {
    //            console.log(xhr.responseText);
    //        });
    //        promise.setOnFail(function (xhr) {
    //            console.log(xhr.responseText);
    //        });
    //    }
    //}, false);

}





    //view.querySelector("#editInfoButton").addEventListener("click", function(){
    //
    //    form.loadFromForm(domForm);
    //    if (!form.validate()) {
    //        form.applyErrorsToForm(domForm);
    //    } else {
    //
    //        var url = Application.getConfigValue("dataPath") + '/RegistrationServlet';
    //
    //        var params = {
    //            firstName: form.firstname,
    //            lastName: form.lastname,
    //            userName: form.username,
    //            eMail: form.email,
    //            password: form.password,
    //            userRole: form.position
    //        };
    //
    //        var promise = Ajax.postRequest(url, params, true);
    //
    //        promise.setOnSuccess(function (xhr) {
    //            console.log(xhr.responseText);
    //        });
    //        promise.setOnFail(function (xhr) {
    //            console.log(xhr.responseText);
    //        });
    //    }
    //}, false);
//}
