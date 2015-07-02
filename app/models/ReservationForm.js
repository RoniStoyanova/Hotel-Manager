function ReservationForm(){
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
        if (!Validation.validateRequired(fieldValue)) {
            _this.addError(fieldName, 'Field required!')
        }
    });

    this.addValidator('lastName', function(fieldName, fieldValue) {
        if (!Validation.validateRequired(fieldValue)) {
            _this.addError(fieldName, 'Field required!')
        }
    });

    this.addValidator('egn', function(fieldName, fieldValue) {
        if (!Validation.validateNumber(fieldValue)) {
            _this.addError(fieldName, 'Use only numbers!')
        }
    });

    this.addValidator('egn', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldValue,10,10)) {
            _this.addError(fieldName, '10 digits required!')
        }
    });

    this.addValidator('passport', function(fieldName, fieldValue) {
        if (!Validation.validateRequired(fieldValue)) {
            _this.addError(fieldName, 'Field required')
        }
    });

    this.addValidator('passport', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldValue,9,9)) {
            _this.addError(fieldName, '9 digits required!')
        }
    });

    this.addValidator('email', function(fieldName, fieldValue) {
        if (!Validation.validateEmail(fieldValue)) {
            _this.addError(fieldName, 'Invalid email !');
        }
    });

    var today = new Date();
    this.addValidator('dateFrom', function(fieldName, fieldValue) {
        var value = fieldValue;
        var date = new Date(value);
        if (!Validation.validateDateIn(date, today)) {
            _this.addError(fieldName, 'You can\' make reservations for past days!');
        }
    });

}

ReservationForm.prototype = Object.create(Model.prototype);
ReservationForm.prototype.constructor = ReservationForm;
