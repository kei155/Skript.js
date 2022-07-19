"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var moment_1 = __importDefault(require("moment"));
var MMDate = (function () {
    function MMDate(input) {
        this._momentInstance = moment_1.default(input);
    }
    Object.defineProperty(MMDate.prototype, "ymd", {
        get: function () {
            return this.format('yyyyMMDD');
        },
        enumerable: false,
        configurable: true
    });
    MMDate.prototype.getDateInstance = function () {
        return this._momentInstance.toDate();
    };
    MMDate.prototype.format = function (format) {
        return this._momentInstance.format(format);
    };
    MMDate.prototype.diffIn = function (targetInput, unit, isTruncate) {
        if (unit === void 0) { unit = 'days'; }
        if (isTruncate === void 0) { isTruncate = true; }
        unit = '' + unit;
        var confirmedUnit = unit;
        switch (unit.toLowerCase()) {
            case 'milliseconds':
            case 'ms':
                confirmedUnit = 'milliseconds';
                break;
            case 'seconds':
            case 'second':
            case 'sec':
            case 's':
                confirmedUnit = 'seconds';
                break;
            case 'minutes':
            case 'minute':
            case 'min':
                confirmedUnit = 'minutes';
                break;
            case 'hours':
            case 'hour':
            case 'h':
                confirmedUnit = 'hours';
                break;
            case 'days':
            case 'day':
            case 'd':
                confirmedUnit = 'days';
                break;
            case 'weeks':
            case 'week':
            case 'w':
                confirmedUnit = 'weeks';
                break;
            case 'months':
            case 'month':
            case 'm':
                confirmedUnit = 'months';
                break;
            case 'years':
            case 'year':
            case 'y':
                confirmedUnit = 'years';
                break;
            default:
                break;
        }
        return this._momentInstance.diff(moment_1.default(targetInput._momentInstance || targetInput), confirmedUnit, !isTruncate);
    };
    MMDate.prototype.isBeforeOrEqual = function (targetInput, unit) {
        if (unit === void 0) { unit = 'days'; }
        return this._momentInstance.isSameOrBefore(targetInput._momentInstance || targetInput, unit || 'days');
    };
    MMDate.prototype.isBefore = function (targetInput, unit) {
        if (unit === void 0) { unit = 'days'; }
        return this._momentInstance.isBefore(targetInput._momentInstance || targetInput, unit || 'days');
    };
    MMDate.prototype.isAfterOrEqual = function (targetInput, unit) {
        if (unit === void 0) { unit = 'days'; }
        return this._momentInstance.isSameOrAfter(targetInput._momentInstance || targetInput, unit || 'days');
    };
    MMDate.prototype.isAfter = function (targetInput, unit) {
        if (unit === void 0) { unit = 'days'; }
        return this._momentInstance.isAfter(targetInput._momentInstance || targetInput, unit || 'days');
    };
    MMDate.prototype.before = function (term, unit) {
        return new MMDate(this._momentInstance.clone().subtract(term, unit));
    };
    MMDate.prototype.after = function (term, unit) {
        return new MMDate(this._momentInstance.clone().add(term, unit));
    };
    MMDate.prototype.toString = function () {
        return this.format('YYYY-MM-DD HH:mm:ss');
    };
    return MMDate;
}());
module.exports = MMDate;
