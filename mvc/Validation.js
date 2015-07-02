/**
 * Created by vasil on 6/9/15.
 */
var Validation = {

    validateRequired : function (value) {
        value = value == undefined ? '' : value;
        return String(value).replace(/^[\s\t\r\n]*\S+/ig, '').length > 0;
    },

    validateEmail : function (value) {
        return String(value).match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/g) ? true : false;
    },

    validateLength : function (value, min, max) {
        value = value == undefined ? '' : value;
        return (min !== undefined ? String(value).length >= min : true)  &&
            (max !== undefined ? String(value).length <= max : true);
    },

    validateNumber: function(value, min, max) {
        if (!String(value).match(/^\d+(\.\d+){0,1}$/)) {
            return false;
        }

        return (min !== undefined ? parseFloat(value) >= min : true) &&
            (max !== undefined ? parseFloat(value) <= max : true)
    },

    validateInList : function(value, list, strict) {
        var inList = false;
        for (var i = 0; i < list.length; i++) {
            if (strict && list[i] === value) {
                inList = true;
            } else if (!strict && list[i] == value) {
                inList = true;
            }
        }

        return inList;
    },

    validateSecondPassword : function(value1, value2) {
        return value1 == value2 ? true : false;
    },

    validateDateIn : function(value1,value2){
        if ( value1 < value2) {
            return false;
        } else {
            return true;
        }
    },

    validateDateOut : function(value1,value2) {
        if ( value1 > value2) {
            return false;
        } else {
            return true;
        }
    }

};