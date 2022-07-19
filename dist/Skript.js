"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var md5_1 = __importDefault(require("md5"));
var Skript = (function () {
    function Skript() {
        this.dom = {
            app: this,
            pluckValue: function (cssSelector, filter) {
                var result = [];
                var targets = document.querySelectorAll(cssSelector);
                targets.forEach(function (el, index, parent) {
                    if (typeof filter == 'function' && filter(el) !== true) {
                        return;
                    }
                    if (el instanceof HTMLInputElement ||
                        el instanceof HTMLTextAreaElement ||
                        el instanceof HTMLSelectElement) {
                        result.push(el.value);
                    }
                    else {
                        result.push(el.nodeValue);
                    }
                });
                return result;
            },
            pluckAttribute: function (cssSelector, attributeName, filter) {
                var result = [];
                var targets = document.querySelectorAll(cssSelector);
                targets.forEach(function (el, index, parent) {
                    if (typeof filter == 'function' && filter(el) !== true) {
                        return;
                    }
                    result.push(el.getAttribute(attributeName));
                });
                return result;
            },
            count: function (selector, filter) {
                if (typeof selector !== 'string' && !selector.length) {
                    throw new Error("'" + selector + "(" + typeof selector + ")' - \uC720\uD6A8\uD55C \uC140\uB809\uD130\uAC00 \uC544\uB2D9\uB2C8\uB2E4.");
                }
                var targets = typeof selector === 'string'
                    ? document.querySelectorAll(selector)
                    : selector;
                var count = targets.length;
                if (typeof filter == 'function') {
                    count = 0;
                    for (var index = 0; index < targets.length; index++) {
                        var target = targets[index];
                        if (filter(target, index) === true) {
                            count++;
                        }
                    }
                }
                return count;
            },
            getValue: function (selector, defaultValue) {
                if (defaultValue === void 0) { defaultValue = null; }
                var targetEl = document.querySelector(selector);
                if (targetEl) {
                    return targetEl.value ? targetEl.value : defaultValue;
                }
                else {
                    return defaultValue;
                }
            },
        };
        this.number = {
            comma: function (value) {
                var numberedValue = Number.parseFloat('' + value);
                if (isNaN(numberedValue)) {
                    return '';
                }
                else if (Number.isFinite(numberedValue)) {
                    return numberedValue.toLocaleString();
                }
                else {
                    return numberedValue
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                }
            },
        };
        this.str = {
            contains: function (value, check) {
                value = '' + value;
                check = '' + check;
                return value.indexOf(check) > -1;
            },
            containsAll: function (value, checks) {
                value = '' + value;
                for (var index = 0; index < checks.length; index++) {
                    var check = '' + checks[index];
                    if (check !== '' && value.indexOf(check) == -1) {
                        return false;
                    }
                }
                return true;
            },
            containsAny: function (value, checks) {
                value = '' + value;
                for (var index = 0; index < checks.length; index++) {
                    var check = '' + checks[index];
                    if (check !== '' && value.indexOf(check) > -1) {
                        return true;
                    }
                }
                return false;
            },
            endsWith: function (value, check) {
                value = '' + value;
                var listing = typeof check === 'string' ? [check] : check || [];
                for (var index = 0; index < listing.length; index++) {
                    var check_1 = '' + (listing[index] || '');
                    if (check_1 !== '' &&
                        value.lastIndexOf(check_1) === value.length - check_1.length) {
                        return true;
                    }
                }
                return false;
            },
            finish: function (value, ends) {
                value = '' + value;
                ends = '' + ends;
                return this.endsWith(value, ends) ? value : value + ends;
            },
            startsWith: function (value, check) {
                value = '' + value;
                var listing = typeof check === 'string' ? [check] : check || [];
                for (var index = 0; index < listing.length; index++) {
                    var check_2 = '' + (listing[index] || '');
                    if (check_2 !== '' && value.indexOf(check_2) === 0) {
                        return true;
                    }
                }
                return false;
            },
            start: function (value, starts) {
                value = '' + value;
                starts = '' + starts;
                return this.startsWith(value, starts) ? value : starts + value;
            },
            limit: function (value, limitLength, limitMark) {
                if (limitMark === void 0) { limitMark = '...'; }
                value = '' + value;
                if (value.length > limitLength) {
                    return value.substring(0, limitLength) + limitMark;
                }
                else {
                    return value;
                }
            },
            reverseLimit: function (value, limitLength, limitMark) {
                if (limitMark === void 0) { limitMark = '...'; }
                value = '' + value;
                if (value.length > limitLength) {
                    return limitMark + value.substring(value.length - limitLength);
                }
                else {
                    return value;
                }
            },
            wrap: function (value, target, before, after) {
                if (before === void 0) { before = ''; }
                if (after === void 0) { after = ''; }
                value = '' + value;
                return value.split(target).join(before + target + after);
            },
            padLeft: function (value, length, padString) {
                return this.pad(value, length, padString, 'left');
            },
            padRight: function (value, length, padString) {
                return this.pad(value, length, padString, 'right');
            },
            pad: function (value, length, padString, direction) {
                padString = padString || '';
                if (isNaN(length) || length < 1) {
                    throw new Error('패딩 길이가 유효하지 않습니다.');
                }
                else if (padString === '') {
                    throw new Error('패딩 문자가 지정되지 않았습니다.');
                }
                else if (direction !== 'left' && direction !== 'right') {
                    throw new Error('패딩 방향이 유효하지 않습니다.');
                }
                value = '' + value;
                if (value.length < length) {
                    return this.pad(direction === 'right' ? value + padString : padString + value, length, padString, direction);
                }
                else {
                    return value;
                }
            },
            left: function (text, length) {
                return ('' + text).substring(0, length);
            },
            right: function (text, length) {
                text = '' + text;
                return text.substring(text.length - length, length);
            },
        };
        this.md5 = md5_1.default;
    }
    Skript.prototype.getQueryParam = function (paramKey, querystring) {
        var query = querystring || location.search;
        var params = this.getQueryParams(query);
        var sections = paramKey
            .split('[')
            .map(function (section) { return section.replace(/\]$/, ''); })
            .filter(function (section) { return section !== ''; });
        var target = params;
        sections.forEach(function (section) {
            if (target === null) {
                return;
            }
            if (target[section] === null || target[section] === undefined) {
                target = null;
            }
            else {
                target = target[section];
            }
        });
        return target === undefined ? null : target;
    };
    Skript.prototype.getQueryParams = function (querystring) {
        var _this = this;
        var query = querystring || location.search;
        var params = {};
        query
            .replace(/[^?]*\?/, '')
            .split('&')
            .filter(function (pairString) { return pairString !== ''; })
            .map(function (pairString) {
            var indexOfFirstEqualChar = pairString.indexOf('=');
            var splited = [
                pairString.substring(0, indexOfFirstEqualChar),
                pairString.substring(indexOfFirstEqualChar + 1),
            ];
            var key = decodeURIComponent(splited[0]);
            var value = splited[1] || '';
            var match = key.match(/\[([^\[\]]*)\]/);
            if (match !== null && match.index) {
                var slicedKey = key.substring(0, match.index);
                var restKey = key.substring(match.index);
                if (restKey === '[]') {
                    if (!params[slicedKey]) {
                        params[slicedKey] = [];
                    }
                    params[slicedKey] = params[slicedKey];
                    params[slicedKey].push(_this.formatQueryParamValue(value));
                }
                else {
                    if (!params[slicedKey]) {
                        params[slicedKey] = {};
                    }
                    var matches = restKey.match(/\[([^\[\]]*)\]/g) || [];
                    var targetObject = params[slicedKey];
                    for (var index = 0; index < matches.length; index++) {
                        var cuttedKey = matches[index]
                            .replace(/^\[/, '')
                            .replace(/\]$/, '');
                        if (cuttedKey === '') {
                            if (!targetObject || !Array.isArray(targetObject)) {
                                targetObject = [];
                            }
                            if (value !== '') {
                                targetObject.push(_this.formatQueryParamValue(value));
                            }
                            continue;
                        }
                        if (!targetObject[cuttedKey]) {
                            if (matches.length >= index + 1 &&
                                matches[index + 1] === '[]') {
                                targetObject[cuttedKey] = [];
                            }
                            else {
                                targetObject[cuttedKey] = {};
                            }
                        }
                        if (index === matches.length - 1) {
                            targetObject[cuttedKey] = _this.formatQueryParamValue(value);
                        }
                        else {
                            targetObject = targetObject[cuttedKey];
                        }
                    }
                }
            }
            else {
                params[key] = _this.formatQueryParamValue(value);
            }
        });
        return params;
    };
    Skript.prototype.formatQueryParamValue = function (value) {
        if (value === 'true') {
            return true;
        }
        else if (value === 'false') {
            return false;
        }
        else if (!value.match(/^0/) &&
            !value.match(/[^\d\.]/) &&
            !isNaN(Number.parseFloat(value)) &&
            value == Number.parseFloat(value).toString()) {
            return Number.parseFloat(value);
        }
        else {
            return decodeURIComponent(value);
        }
    };
    Skript.prototype.clone = function (value) {
        if (value === null || typeof value !== 'object')
            return value;
        var copy = value.constructor();
        for (var attr in value) {
            if (value.hasOwnProperty(attr)) {
                copy[attr] = this.clone(value[attr]);
            }
        }
        return copy;
    };
    Skript.prototype.addAction = function (selector, args, baseElementOrDocument) {
        var options = typeof args === 'function'
            ? {
                callback: args,
            }
            : args || {};
        if (selector && options.callback) {
            if (!options.callback) {
                return;
            }
            options.eventType = options.eventType || 'click';
            var targets_1 = this.getTargetsFromSelector(selector, baseElementOrDocument);
            for (var i = 0; i < targets_1.length; i++) {
                var target = targets_1[i];
                var eventTypeArray = options.eventType.split(',');
                for (var j = 0; j < eventTypeArray.length; j++) {
                    var eventType = eventTypeArray[j].trim();
                    if (eventType === '$enter') {
                        target.addEventListener('keyup', function (event) {
                            if (event && event.key === 'Enter') {
                                options.callback.call(this, targets_1);
                            }
                        });
                    }
                    else if (eventType === '$esc') {
                        target.addEventListener('keyup', function (event) {
                            if (event && (event.key === 'Esc' || event.key === 'Escape')) {
                                options.callback.call(this, targets_1);
                            }
                        });
                    }
                    else {
                        target.addEventListener(eventType, function () {
                            options.callback.call(this, targets_1);
                        });
                    }
                }
            }
        }
    };
    Skript.prototype.runAction = function (selector, func, baseElementOrDocument) {
        if (selector && func && typeof func == 'function') {
            var targets = this.getTargetsFromSelector(selector, baseElementOrDocument);
            for (var i = 0; i < targets.length; i++) {
                var target = targets[i];
                func.call(target, targets, i);
            }
        }
        else {
            throw new Error('대상 선택기준이 없거나 실행할 함수가 없습니다.');
        }
    };
    Skript.prototype.getTargetsFromSelector = function (selector, baseElementOrDocument) {
        var targets;
        if (selector instanceof HTMLElement) {
            targets = [selector];
        }
        else if (selector instanceof NodeList) {
            targets = selector;
        }
        else if (selector === 'window' || selector === window) {
            targets = [window];
        }
        else if (selector === 'document' || selector === document) {
            targets = [document];
        }
        else if (typeof selector === 'string') {
            if (baseElementOrDocument instanceof HTMLElement) {
                targets = baseElementOrDocument.querySelectorAll(selector || 'temp.not-exist-selector');
            }
            else {
                targets = document.querySelectorAll(selector || 'temp.not-exist-selector');
            }
        }
        else {
            targets = selector;
        }
        return targets;
    };
    Skript.prototype.querify = function (obj) {
        if (typeof obj === 'string') {
            return "?" + obj + "=";
        }
        var pairs = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var element = obj[key];
                setPairString(pairs, key, element);
            }
        }
        return pairs.length > 0 ? "?" + pairs.join('&') : '';
        function setPairString(_pairs, _key, _element) {
            if (_element !== null && typeof _element === 'object') {
                if (Array.isArray(_element)) {
                    if (_element.length === 0) {
                        _pairs.push(_key + "[]=");
                    }
                    else {
                        _element.forEach(function (val) {
                            if (val !== null && typeof val === 'object') {
                                if (Array.isArray(val)) {
                                    setPairString(_pairs, _key + "[]", val);
                                }
                                else {
                                    if (isSpecialElement(val)) {
                                        _pairs.push(_key + "=" + encodeURIComponent(getSpecialElementValue(_element)));
                                    }
                                    else {
                                        for (var key in val) {
                                            if (val.hasOwnProperty(key)) {
                                                var nestedElement = val[key];
                                                setPairString(_pairs, _key + "[][" + key + "]", nestedElement);
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (typeof val === 'function') {
                                    return;
                                }
                                if (isSpecialElement(val)) {
                                    _pairs.push(_key + "[]=" + encodeURIComponent(getSpecialElementValue(val)));
                                }
                                else {
                                    _pairs.push(_key + "[]=" + encodeURIComponent(returnBlankIfNullOrUndefined(val)));
                                }
                            }
                        });
                    }
                }
                else {
                    if (isSpecialElement(_element)) {
                        _pairs.push(_key + "=" + encodeURIComponent(getSpecialElementValue(_element)));
                    }
                    else {
                        for (var key in _element) {
                            if (_element.hasOwnProperty(key)) {
                                var nestedElement = _element[key];
                                setPairString(_pairs, _key + "[" + key + "]", nestedElement);
                            }
                        }
                    }
                }
            }
            else {
                if (typeof _element === 'function') {
                    return;
                }
                if (isSpecialElement(_element)) {
                    _pairs.push(_key + "=" + encodeURIComponent(getSpecialElementValue(_element)));
                }
                else {
                    _pairs.push(_key + "=" + encodeURIComponent(returnBlankIfNullOrUndefined(_element)));
                }
            }
        }
        function returnBlankIfNullOrUndefined(val) {
            if (val === null || val === undefined) {
                return '';
            }
            else {
                return val;
            }
        }
        function isSpecialElement(val) {
            if (!val) {
                return false;
            }
            return (val.constructor === Date ||
                (typeof val.getDateInstance === 'function' &&
                    val.getDateInstance() &&
                    val.getDateInstance().constructor === Date));
        }
        function getSpecialElementValue(val) {
            if (val === null || val === undefined) {
                return '';
            }
            if (val.constructor === Date) {
                var year = val.getFullYear();
                if (isNaN(year)) {
                    return 'Invalid Date';
                }
                var month = '' + (val.getMonth() + 1);
                if (month.length < 2)
                    month = '0' + month;
                var date = '' + val.getDate();
                if (date.length < 2)
                    date = '0' + date;
                var hour = '' + val.getHours();
                if (hour.length < 2)
                    hour = '0' + hour;
                var minute = '' + val.getMinutes();
                if (minute.length < 2)
                    minute = '0' + minute;
                var second = '' + val.getSeconds();
                if (second.length < 2)
                    second = '0' + second;
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
            }
            else if (typeof val.getDateInstance === 'function' &&
                val.getDateInstance() &&
                val.getDateInstance().constructor === Date) {
                return returnBlankIfNullOrUndefined(val);
            }
            else {
                return returnBlankIfNullOrUndefined(val);
            }
        }
    };
    Skript.prototype.syncQueryParamsToPage = function (customHandlers, querystring) {
        var query = querystring || location.search;
        var sections = query.replace(/^\?/, '').split('&');
        var matchCounts = {};
        sections
            .map(function (section) { return section.split('='); })
            .forEach(function (pair) {
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(decodeURI(pair[1]).replace(/\+/g, ' '));
            if (matchCounts[key]) {
                matchCounts[key] = matchCounts[key] + 1;
            }
            else {
                matchCounts[key] = 1;
            }
            if (customHandlers) {
                for (var handlerKey in customHandlers) {
                    if (customHandlers.hasOwnProperty(handlerKey) &&
                        typeof customHandlers[handlerKey] === 'function') {
                        var reg = new RegExp(handlerKey
                            .split('[*]')
                            .map(function (section) {
                            return section.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
                        })
                            .join('\\[([^\\]]*)\\]') + '$');
                        if (key.match(reg)) {
                            return customHandlers[handlerKey](key, value, matchCounts[key]);
                        }
                    }
                }
            }
            if (customHandlers &&
                customHandlers[key] &&
                typeof customHandlers[key] === 'function') {
                return customHandlers[key](key, value, matchCounts[key]);
            }
            var matchElements = document.querySelectorAll("[name=\"" + key + "\"]");
            var matchElement = null;
            if (matchElements.length > 1) {
                matchElement = matchElements[matchCounts[key] - 1];
            }
            else {
                matchElement = matchElements[0];
            }
            if (matchElement instanceof HTMLInputElement) {
                switch (matchElement.getAttribute('type')) {
                    case 'checkbox':
                    case 'radio':
                        var target = document.querySelector("[name=\"" + key + "\"][value=\"" + value + "\"]");
                        if (target instanceof HTMLInputElement) {
                            target.checked = true;
                        }
                        break;
                    default:
                        matchElement.value = value;
                        break;
                }
            }
            else if (matchElement instanceof HTMLSelectElement) {
                matchElement.value = value;
            }
            else if (matchElement instanceof HTMLTextAreaElement) {
                matchElement.value = value;
            }
        });
    };
    Skript.prototype.extract = function (selector, options) {
        var element = document.querySelector(selector);
        var opt = options || {
            dataType: 'json',
            appends: {},
        };
        if (element === null) {
            throw new Error('대상 엘리먼트가 존재하지 않습니다.');
        }
        else if (typeof opt.dataType !== 'string') {
            throw new Error('반환 데이터 타입이 유효하지 않습니다');
        }
        if (opt.dataType.toLowerCase() === 'json') {
            return this.extractJson(element, opt.appends);
        }
        else if (opt.dataType.toLowerCase() === 'formdata') {
            return this.extractFormData(element, opt.appends);
        }
        else {
            throw new Error('반환 데이터 타입이 유효하지 않습니다');
        }
    };
    Skript.prototype.extractJson = function (element, appends, includeEmptyValue) {
        var namedElements = element.querySelectorAll('[name]');
        var extracted = appends || {};
        for (var i = 0; i < namedElements.length; i++) {
            var el = namedElements[i];
            var elName = el.getAttribute('name') || '';
            var isMultiple = elName.indexOf('[]') !== -1;
            elName = elName.replace('[]', '');
            if (el instanceof HTMLSelectElement &&
                (includeEmptyValue || (el.value && el.value != ''))) {
                extracted[elName] = el.value;
            }
            else if (el instanceof HTMLInputElement) {
                switch ((el.getAttribute('type') || '').toLowerCase()) {
                    case 'checkbox':
                        if (el.checked) {
                            if (isMultiple) {
                                extracted[elName] = Array.isArray(extracted[elName])
                                    ? extracted[elName]
                                    : [];
                                extracted[elName].push(el.value);
                            }
                            else {
                                extracted[elName] = el.value;
                            }
                        }
                        break;
                    case 'radio':
                        if (el.checked) {
                            extracted[elName] = el.value;
                        }
                        break;
                    case 'text':
                    case 'password':
                    case 'email':
                    case 'hidden':
                    case 'search':
                    case 'number':
                    case 'tel':
                    case 'date':
                    case 'datetime':
                    case 'datetime-local':
                        if (includeEmptyValue || (el.value && el.value != '')) {
                            if (isMultiple) {
                                extracted[elName] = Array.isArray(extracted[elName])
                                    ? extracted[elName]
                                    : [];
                                extracted[elName].push(el.value);
                            }
                            else {
                                extracted[elName] = el.value;
                            }
                        }
                        break;
                    case 'file':
                        break;
                    default:
                }
            }
            else if (el instanceof HTMLTextAreaElement) {
                if (includeEmptyValue || (el.value && el.value != '')) {
                    extracted[elName] = el.value;
                }
            }
        }
        return extracted;
    };
    Skript.prototype.extractFormData = function (element, appends, fileHandler) {
        var namedElements = element.querySelectorAll('[name]');
        var extracted = appends || {};
        var formData = new FormData();
        for (var key in extracted) {
            formData.append(key, extracted[key]);
        }
        var fileCount = 0;
        var fileOfContainer = {};
        for (var i = 0; i < namedElements.length; i++) {
            var el = namedElements[i];
            var elName = el.getAttribute('name') || '';
            var isMultiple = elName.indexOf('[]') !== -1;
            if (el instanceof HTMLSelectElement && el.value && el.value != '') {
                formData.append(elName, el.value);
            }
            else if (el instanceof HTMLInputElement ||
                Object.getPrototypeOf(el).toString() == '[object HTMLInputElement]') {
                var inputElement = el;
                switch ((el.getAttribute('type') || '').toLowerCase()) {
                    case 'checkbox':
                        if (inputElement.checked) {
                            if (isMultiple) {
                                formData.append(elName, inputElement.value);
                            }
                            else {
                                formData.delete(elName);
                                formData.append(elName, inputElement.value);
                            }
                        }
                        break;
                    case 'radio':
                        if (inputElement.checked) {
                            formData.append(elName, inputElement.value);
                        }
                        break;
                    case 'text':
                    case 'password':
                    case 'email':
                    case 'hidden':
                    case 'search':
                    case 'tel':
                    case 'date':
                    case 'datetime':
                    case 'datetime-local':
                        if (inputElement.value && inputElement.value != '') {
                            formData.append(elName, inputElement.value);
                        }
                        break;
                    case 'file':
                        if (inputElement.files) {
                            fileCount += inputElement.files.length;
                        }
                        if (fileHandler) {
                            fileHandler(formData, elName, inputElement.files, inputElement);
                        }
                        else {
                            if (inputElement.files && inputElement.files.length > 0) {
                                if (inputElement.files.length > 1) {
                                    for (var index = 0; index < inputElement.files.length; index++) {
                                        var file = inputElement.files[index];
                                        formData.append(elName + "[" + index + "]", file);
                                    }
                                }
                                else {
                                    formData.append(elName, inputElement.files[0]);
                                }
                            }
                        }
                        break;
                    default:
                }
            }
            else if (el instanceof HTMLTextAreaElement) {
                if (el.value && el.value != '') {
                    formData.append(elName, el.value);
                }
            }
            else if (el instanceof HTMLElement && el.hasAttribute('contenteditable')) {
                formData.append(elName, el.innerText);
            }
        }
        if (fileCount > 0) {
            var metadata = {
                totalCount: fileCount,
                files: {},
            };
            for (var formName in fileOfContainer) {
                metadata.files[formName] = [];
                for (var i = 0; i < fileOfContainer[formName].length; i++) {
                    var info = fileOfContainer[formName][i];
                    metadata.files[formName].push({
                        isNew: info instanceof File,
                        url: info instanceof File
                            ? null
                            : (info.name || '').replace(/\?.*/, ''),
                    });
                }
            }
            formData.append('metadata_files', JSON.stringify(metadata));
        }
        return formData;
    };
    Skript.prototype.wait = function (second) {
        return new Promise(function (resolve) {
            var timeoutId = window.setTimeout(function () {
                resolve(timeoutId);
            }, second * 1000);
        });
    };
    Skript.prototype.range = function (start, end) {
        if (typeof start !== 'number') {
            throw new Error('시작값이 없거나 숫자가 아닙니다.');
        }
        else if (typeof end !== 'number') {
            throw new Error('종료값이 없거나 숫자가 아닙니다.');
        }
        else if (end < start) {
            throw new Error('시작값이 종료값보다 큽니다.');
        }
        var arr = [];
        for (var num = start; num <= end; num++) {
            arr.push(num);
        }
        return arr;
    };
    Skript.prototype.random = function (min, max, isFloor) {
        if (isFloor === void 0) { isFloor = true; }
        if (typeof min !== 'number') {
            throw new Error('최소값이 없거나 숫자가 아닙니다.');
        }
        else if (typeof max !== 'number') {
            throw new Error('최대값이 없거나 숫자가 아닙니다.');
        }
        else if (max < min) {
            throw new Error('최소값이 최대값보다 큽니다.');
        }
        var interval = max - min + 1;
        return ((isFloor === true
            ? Math.floor(Math.random() * interval)
            : Math.random() * interval) + min);
    };
    Skript.prototype.groupBy = function (arr, keyName, keyModifier) {
        var groupped = {};
        Array.prototype.forEach.call(arr, function (item) {
            var confirmedKey = item[keyName];
            if (('' + keyName).indexOf('.') > -1) {
                confirmedKey = item;
                keyName.split('.').forEach(function (splitedKey) {
                    if (confirmedKey[splitedKey]) {
                        confirmedKey = confirmedKey[splitedKey];
                    }
                    else {
                        confirmedKey = '';
                    }
                });
            }
            if (typeof keyModifier === 'function') {
                confirmedKey = keyModifier(confirmedKey);
            }
            if (groupped[confirmedKey]) {
                groupped[confirmedKey].push(item);
            }
            else {
                groupped[confirmedKey] = [item];
            }
        });
        return groupped;
    };
    Skript.prototype.tick = function (interval) {
        return {
            intervalId: -1,
            count: 1,
            tester: function () { return true; },
            endHandler: function () { },
            do: function (action) {
                var _this = this;
                this.intervalId = window.setInterval(function () {
                    if (_this.tester() === false) {
                        clearInterval(_this.intervalId);
                        _this.endHandler();
                    }
                    else {
                        action(_this.count++);
                    }
                }, interval * 1000);
                return this;
            },
            until: function (tester) {
                if (typeof tester === 'function') {
                    this.tester = tester;
                }
                return this;
            },
            whenEnd: function (endHandler) {
                if (typeof endHandler === 'function') {
                    this.endHandler = endHandler;
                }
                return this;
            },
        };
    };
    Skript.prototype.runWhenReady = function (checkTarget, task, tryCount, intervalSecond) {
        if (tryCount === void 0) { tryCount = 0; }
        if (intervalSecond === void 0) { intervalSecond = 1; }
        var checkTargetConfirmed = typeof checkTarget === 'string' || typeof checkTarget === 'function'
            ? [checkTarget]
            : checkTarget;
        var count = 0;
        var intervalId = setInterval(function () {
            if (tryCount > 0 && count > tryCount) {
                clearInterval(intervalId);
            }
            for (var index = 0; index < checkTargetConfirmed.length; index++) {
                if (typeof checkTargetConfirmed[index] === 'function') {
                    try {
                        if (checkTargetConfirmed[index]() !== true) {
                            count++;
                            return;
                        }
                    }
                    catch (error) {
                        console.error(error);
                        clearInterval(intervalId);
                    }
                }
                else if (typeof checkTargetConfirmed[index] === 'string') {
                    var targetString = checkTargetConfirmed[index];
                    var splited = targetString.split('.');
                    var targetObj = window[splited[0]];
                    for (var j = 1; j < splited.length; j++) {
                        targetObj = targetObj[splited[j]];
                        if (targetObj === null || targetObj === undefined) {
                            count++;
                            return;
                        }
                    }
                    if (targetObj === null || targetObj === undefined) {
                        count++;
                        return;
                    }
                }
                else {
                    clearInterval(intervalId);
                    throw new Error("Unexpected Type [" + typeof checkTargetConfirmed[index] + "] : \uBB38\uC790\uC5F4 \uB610\uB294 boolean\uC744 \uBC18\uD658\uD558\uB294 \uD568\uC218\uC5EC\uC57C\uD569\uB2C8\uB2E4.");
                }
            }
            try {
                task();
            }
            catch (error) {
                console.error(error);
            }
            finally {
                clearInterval(intervalId);
            }
        }, intervalSecond * 1000);
    };
    Skript.prototype.uuidv4 = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };
    Skript.prototype.countdown = function (targetDatetime, intervalType, countdownHandler, excuteOnInitialized) {
        var _this = this;
        if (excuteOnInitialized === void 0) { excuteOnInitialized = false; }
        var targetDate;
        if (typeof targetDatetime === 'string') {
            targetDate = new Date(targetDatetime);
            if (isNaN(targetDate.getTime())) {
                throw new Error("Date \uD0C0\uC785\uC73C\uB85C \uBCC0\uD658\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. (" + targetDatetime + ")");
            }
        }
        else {
            targetDate = targetDatetime;
        }
        var targetDateTime = targetDate.getTime();
        var intervalSecond = 1;
        switch (intervalType.toLowerCase()) {
            case 's':
            case 'second':
            case 'seconds':
                break;
            case 'ms':
            case 'millisecond':
            case 'milliseconds':
                intervalSecond = 0.001;
                break;
            case 'm':
            case 'minute':
            case 'minutes':
                intervalSecond = 60;
                break;
            case 'h':
            case 'hour':
            case 'hours':
                intervalSecond = 3600;
                break;
            default:
                break;
        }
        if (excuteOnInitialized === true) {
            var diffInMs = targetDateTime - Date.now();
            countdownHandler(diffInMs, {
                hour: Math.floor(diffInMs / 1000 / 60 / 60),
                minute: Math.floor(diffInMs / 1000 / 60) % 60,
                second: Math.floor(diffInMs / 1000) % 60,
            });
        }
        return new Promise(function (resolve, reject) {
            try {
                _this.tick(intervalSecond)
                    .do(function () {
                    var diffInMillisecond = targetDateTime - Date.now();
                    countdownHandler(diffInMillisecond, {
                        hour: Math.floor(diffInMillisecond / 1000 / 60 / 60),
                        minute: Math.floor(diffInMillisecond / 1000 / 60) % 60,
                        second: Math.floor(diffInMillisecond / 1000) % 60,
                    });
                })
                    .until(function () {
                    return targetDateTime > Date.now();
                })
                    .whenEnd(function () {
                    resolve();
                });
            }
            catch (error) {
                reject(error);
            }
        });
    };
    return Skript;
}());
module.exports = Skript;
