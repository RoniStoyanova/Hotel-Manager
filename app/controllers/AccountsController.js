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
            //accountView.style.display = "inline-block";
            accountView.style.width = "100%";
            accountView.style.paddingTop = "5px";
            accountView.style.borderBottom = "1px solid black"

            var accountName = document.createElement("a");
            accountView.appendChild(accountName);
            accountName.innerHTML = response[i].firstName + " " + response[i].lastName;
            accountName.style.display = "block";
            accountName.className = "informationLine";
            accountName.style.padding = "5px";
        }

    });
    promise.setOnFail(function(xhr) {
        console.log(xhr.responseText);
    });

    var accountParent = view.querySelector("#accountsContainer");
    accountParent.addEventListener("click",function showInfo(e) {
        if (e.target !== e.currentTarget) {
            localStorage.setItem('accountId', e.target.id);
            window.location.hash = '#/accountView';
        }
        e.stopPropagation();
    }, false);

};
