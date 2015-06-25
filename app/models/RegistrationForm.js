function RegistrationForm() {
    this.firstname = '';
    this.lastname = '';
    this.username = '';
    this.email = '';
    this.password = '';
    this.secondpassword = '';
    this.position = '';


    Model.call(this);

    var _this = this;
    this.addValidator('firstname', function(fieldName, fieldValue) {
        if (!Validation.validateRequired(fieldValue)) {
            _this.addError(fieldName, 'First name must be filled out!')
        }
    });
    this.addValidator('lastname', function(fieldName, fieldValue) {
        if (!Validation.validateRequired(fieldValue)) {
            _this.addError(fieldName, 'Last name must be filled out!')
        }
    });
    this.addValidator('username', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldValue, 6)) {
            _this.addError(fieldName, 'User name must be at least 6 characters!')
        }
    });
    this.addValidator('email', function(fieldName, fieldValue) {
        if (!Validation.validateRequired(fieldValue)) {
            _this.addError(fieldName, 'E-mail must be filled out!')
        }
    });
    this.addValidator('email', function(fieldName, fieldValue) {
        if (!Validation.validateEmail(fieldValue)) {
            _this.addError(fieldName, 'E-mail is not valid!')
        }
    });
    this.addValidator('password', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldValue, 6)) {
            _this.addError(fieldName, 'User name must be at least 6 characters!')
        }
    });
    //this.addValidator('secondpassword', function(fieldName, fieldValue) {
    //    if (!Validation.validateSecondPassword(fieldValue, )) {
    //        _this.addError(fieldName, 'User name must be at least 6 characters!')
    //    }
    //});
    this.addValidator('position', function(fieldName, fieldValue) {
        if (!Validation.validateRequired(fieldValue)) {
            _this.addError(fieldName, 'Postion must be checked out!')
        }
    });
}

RegistrationForm.prototype = Object.create(Model.prototype);
RegistrationForm.prototype.constructor = RegistrationForm;
