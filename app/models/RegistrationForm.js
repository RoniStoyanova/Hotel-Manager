function RegistrationForm() {
    this.firstname = '';
    this.lastname = '';
    this.username = '';
    this.email = '';
    this.password = '';
    this.secondPassword = '';
    this.userRole = '';


    Model.call(this);

    var _this = this;
    this.addValidator('firstname', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldName,1)) {
            _this.addError(fieldName, 'Field required!')
        }
    });
    this.addValidator('lastname', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldName,1)) {
            _this.addError(fieldName, 'Field required!')
        }
    });
    this.addValidator('username', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldValue, 6)) {
            _this.addError(fieldName, 'User name must be at least 6 characters!')
        }
    });
    this.addValidator('email', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldName,1)) {
            _this.addError(fieldName, 'Field required!')
        }
    });
    this.addValidator('email', function(fieldName, fieldValue) {
        if (!Validation.validateEmail(fieldValue)) {
            _this.addError(fieldName, 'E-mail is not valid!')
        }
    });
    this.addValidator('password', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldValue, 6)) {
            _this.addError(fieldName, 'Password must be at least 6 characters!')
        }
    });

    this.addValidator('secondPassword', function(fieldName, fieldValue) {
        var firstPass = _this.password;
        if (!Validation.validateSecondPassword(fieldValue, firstPass)) {
            _this.addError(fieldName, 'Password doesn\'t match!')
        }
    });



}

RegistrationForm.prototype = Object.create(Model.prototype);
RegistrationForm.prototype.constructor = RegistrationForm;
