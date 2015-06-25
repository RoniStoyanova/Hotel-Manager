function LoginForm () {
    this.username = '';
    this.password = '';

    Model.call(this);

    var _this = this;
    this.addValidator('username', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldValue, 5)) {
            _this.addError(fieldName, 'User name must be at least 5 characters!')
        }
    });

    this.addValidator('password', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldValue, 4)) {
            _this.addError(fieldName, 'User name must be at least 4 characters!')
        }
    });
}

LoginForm.prototype = Object.create(Model.prototype);
LoginForm.prototype.constructor = LoginForm;
