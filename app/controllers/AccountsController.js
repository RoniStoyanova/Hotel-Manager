function AccountsController() {

}

AccountsController.prototype.onCreateView = function (view) {
    ShowBars();
    adminSetup();

    var url = Application.getConfigValue("dataPath") + '/AccountServlet';
    var params = {

    };
    var promise = Ajax.getRequest(url, params, true);
    promise.setOnSuccess(function(xhr) {

        var response = JSON.parse(xhr.responseText);

        for (var i = 0; i < response.length; i++) {
            
            //Create container for the account
            var accountView = document.createElement("div");
            document.querySelector("#accountsContainer").appendChild(accountView);
            accountView.style.display = "inline-block";
            accountView.style.width = "100%";
            accountView.style.paddingTop = "10px";
            accountView.style.borderBottom = "1px solid black"

            var accountName = document.createElement("p");
            accountView.appendChild(accountName);
            accountName.innerHTML = response[i].firstName + " " + response[i].lastName;
            accountName.style.display = "inline";

        }

    });
    promise.setOnFail(function(xhr) {
        console.log(xhr.responseText);
    });
}
