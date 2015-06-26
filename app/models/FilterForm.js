function FilterForm () {
    this.dateFrom = '';
    this.dateTo = '';
    this.guests = '';

    Model.call(this);

    var _this = this;
    // Да си напиша валидации
}

FilterForm.prototype = Object.create(Model.prototype);
FilterForm.prototype.constructor = FilterForm;
