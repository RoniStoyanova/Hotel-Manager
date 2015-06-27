function ReservationForm(){

    this.Check_in_Date  = '';
    this.Check_out_Date = '';
    this.status         = '';
    this.firstName      = '';
    this.lastName       = '';
    this.egn            = '';
    this.passport       = '';
    this.email          = '';
    this.phone          = '';

    Model.call(this);

    var _this = this;
    this.addValidator('firstName', function(firstName) {
        if (!Validation.validateRequired(firstName)) {
            _this.addError(firstName, 'Use only characters!')
        }
    });

    this.addValidator('lastName', function(lastName) {
        if (!Validation.validateRequired(lastName)) {
            _this.addError(lastName, 'Use only characters!')
        }
    });

    this.addValidator('egn', function(egn, fieldNumber) {
        if (!Validation.validateNumber(fieldNumber)) {
            _this.addError(fieldNumber, 'Use only numbers!')
        }
    });

    this.addValidator('egn', function(egn, fieldNumber) {
        if (!Validation.validateLength(fieldNumber,10,10)) {
            _this.addError(fieldNumber, '10 digits required!')
        }
    });

    this.addValidator('passport', function(fieldPassport) {
        if (!Validation.validateRequired(fieldPassport)) {
            _this.addError(fieldPassport, 'Error !')
        }
    });



    this.addValidator('email', function(value) {
        if (!Validation.validateEmail(value)) {
            _this.addError(value, 'Invalid email !');
        }
    });

    this.addValidator('phone', function(phone, fieldPhone) {
        if (!Validation.validateNumber(fieldPhone)) {
            _this.addError(fieldPhone, 'Use only numbers!')
        }
    });

    this.addValidator('Check_in_Date', function(Check_in_Date){             // ???????????????
        var firstDate = _this.Check_in_Date;
        var secondDate = _this.Check_out_Date;
        if (!Validation.validateTwoDates(firstDate, secondDate)) {
            _this.addError(Check_in_Date, 'Invalid date!');
        }
    });

}

ReservationForm.prototype = Object.create(Model.prototype);
ReservationForm.prototype.constructor = ReservationForm;
