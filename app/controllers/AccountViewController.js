function AccountViewController() {

}

AccountViewController.prototype.onCreateView = function (view) {
    ShowBars();
    adminSetup();

    view.querySelector("#saveAccountButton").style.display = "none";

    function makeFormDisable() {
        view.querySelector("#accountFirstName").disabled = true;
        view.querySelector("#accountLastName").disabled = true;
        view.querySelector("#accountUserName").disabled = true;
        view.querySelector("#accountEmail").disabled = true;
        view.querySelector("#accountPassword").disabled = true;
        view.querySelector("#accountConfirmPassword").disabled = true;
        view.querySelector("#accountRadio1").disabled = true;
        view.querySelector("#accountRadio2").disabled = true;
    }

    function makeFormEnable() {
        view.querySelector("#accountFirstName").disabled = false;
        view.querySelector("#accountLastName").disabled = false;
        view.querySelector("#accountUserName").disabled = false;
        view.querySelector("#accountEmail").disabled = false;
        view.querySelector("#accountPassword").disabled = false;
        view.querySelector("#accountConfirmPassword").disabled = false;
    }

    var form = new RegistrationForm();
    var domForm = view.querySelector("#accountView-form");
    domForm.addEventListener("submit", function (e) {
        e.preventDefault();
    });

    form.loadFromForm(domForm);
    if (Ajax.mockData == true) {
        var url = Application.getConfigValue("dataPath") + '/LoginServlet';
    } else {
        var url = Application.getConfigValue("dataPath") + '/CheckUserServlet';
    }
    var accountId = localStorage.getItem("accountId");
    console.log(accountId);
    var params = {
        userId: accountId
    };

    var promise = Ajax.getRequest(url, params, true);
    promise.setOnSuccess(function (xhr) {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);

        view.querySelector("#accountFirstName").value = response.firstName;
        view.querySelector("#accountLastName").value = response.lastName;
        view.querySelector("#accountUserName").value = response.userName;
        view.querySelector("#accountEmail").value = response.eMail;
        //view.querySelector("#accountPassword").value = response.password;
        //view.querySelector("#accountConfirmPassword").value = response.password;
        //console.log(response.userRole);
        if (response.userRole == 'admin') {
            view.querySelector("#accountRadio1").checked = true;
        } else {
            view.querySelector("#accountRadio2").checked = true;
        }
    });
    promise.setOnFail(function (xhr) {
        console.log(xhr.responseText);
    });

    makeFormDisable();

    view.querySelector("#editAccountButton").addEventListener("click", function () {

        makeFormEnable();

        view.querySelector("#editAccountButton").style.display = "none";
        view.querySelector("#saveAccountButton").style.display = "block";

    }, false);

    view.querySelector("#saveAccountButton").addEventListener('click', function() {
        form.loadFromForm(view.querySelector("#accountView-form"));
        if(!form.validate()) {
            form.applyErrorsToForm(domForm);
        } else {
            form.clearErrors(domForm);
            url = Application.getConfigValue("dataPath") + '/UserEditServlet';
            //url = Application.getConfigValue("dataPath") + '/UserEditServlet';
            var position;
            if (view.querySelector("#accountRadio1").checked) {
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
            //console.log(params);
            var promise = Ajax.postRequest(url, params, true);

            promise.setOnSuccess(function (xhr) {
                console.log(xhr.responseText);

                view.querySelector("#editAccountButton").style.display = "block";
                view.querySelector("#saveAccountButton").style.display = "none";
                makeFormDisable();

            });
            promise.setOnFail(function (xhr) {
                console.log(xhr.responseText);
            });
        }
    }, false);

};
