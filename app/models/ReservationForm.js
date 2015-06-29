function ReservationForm(){
    this.roomNumber = '';
    this.dateFrom  = '';
    this.dateTo = '';
    this.reservationStatus = '';
    this.firstName      = '';
    this.lastName       = '';
    this.egn            = '';
    this.passport       = '';
    this.email          = '';

    Model.call(this);

    var _this = this;
    this.addValidator('firstName', function(fieldName, fieldValue) {
        if (!Validation.validateRequired(fieldName)) {
            _this.addError(fieldName, 'Use only characters!')
        }
    });

    this.addValidator('lastName', function(fieldName, fieldValue) {
        if (!Validation.validateRequired(fieldName)) {
            _this.addError(fieldName, 'Use only characters!')
        }
    });

    this.addValidator('egn', function(fieldName, fieldValue) {
        if (!Validation.validateNumber(fieldName)) {
            _this.addError(fieldName, 'Use only numbers!')
        }
    });

    this.addValidator('egn', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldName,10,10)) {
            _this.addError(fieldName, '10 digits required!')
        }
    });

    this.addValidator('passport', function(fieldName, fieldValue) {
        if (!Validation.validateRequired(fieldName)) {
            _this.addError(fieldName, 'Error !')
        }
    });

    this.addValidator('email', function(fieldName, fieldValue) {
        if (!Validation.validateEmail(fieldName)) {
            _this.addError(fieldName, 'Invalid email !');
        }
    });

    //this.addValidator('phone', function(fieldName, fieldValue) {
    //    if (!Validation.validateNumber(fieldName)) {
    //        _this.addError(fieldName, 'Use only numbers!')
    //    }
    //});

    //this.addValidator('Check_in_Date', function(Check_in_Date){             // ???????????????
    //    var firstDate = _this.Check_in_Date;
    //    var secondDate = _this.Check_out_Date;
    //    if (!Validation.validateTwoDates(firstDate, secondDate)) {
    //        _this.addError(Check_in_Date, 'Invalid date!');
    //    }
    //});

}

ReservationForm.prototype = Object.create(Model.prototype);
ReservationForm.prototype.constructor = ReservationForm;
