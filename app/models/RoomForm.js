function RoomForm () {
    this.roomNumber    = '';
    this.beds  = '';
    this.price = '';
    this.description   = '';

    this.wifi          = '';
    this.tv            = '';
    this.airConditioning  = '';
    this.refrigerator  = '';
    this.hairDryer     = '';
    this.bathroom      = '';
    this.kitchen       = '';
    this.livingRoom    = '';
    this.wc = '';
    this.sight = '';
    this.lux = '';

    this.roomStatus = '';

    Model.call(this);

    var _this = this;

    this.addValidator('roomNumber', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldName,1)) {
            _this.addError(fieldName, 'Field required!')
        }
    });
    this.addValidator('beds', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldName,1)) {
            _this.addError(fieldName,'Field required!')
        }
    });
    this.addValidator('price', function(fieldName, fieldValue) {
        if (!Validation.validateLength(fieldName,1)) {
            _this.addError(fieldName, 'Field required!')
        }
    });
}

RoomForm.prototype = Object.create(Model.prototype);
RoomForm.prototype.constructor = RoomForm;
