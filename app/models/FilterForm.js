function FilterForm () {
    this.dateFrom = '';
    this.dateTo = '';
    this.guests = '';

    Model.call(this);

    var _this = this;

    var today = new Date();
    this.addValidator('dateFrom', function(fieldName, fieldValue) {
        var value = fieldValue;
        var date = new Date(value);
        if (!Validation.validateDateIn(date, today)) {
            _this.addError(fieldName, 'You can\' make reservations for past days!');
        }
    });

    this.addValidator('dateFrom', function(fieldName, fieldValue) {
        var value = fieldValue;
        var date = new Date(value);
        if (!Validation.validateRequired(date)) {
            _this.addError(fieldName, 'Enter check-in date!!');
        }
    });

    this.addValidator('dateTo', function(fieldName, fieldValue) {
        var dateFrom = new Date(_this.dateFrom);
        var dateTo = new Date(fieldValue);
        if (!Validation.validateDateIn(dateTo, dateFrom)) {
            _this.addError(fieldName, 'You can\' make reservations for past days!');
        }
    });
}

FilterForm.prototype = Object.create(Model.prototype);
FilterForm.prototype.constructor = FilterForm;
