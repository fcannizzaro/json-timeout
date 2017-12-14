'use strict';

var EventEmitter = require('events');

module.exports = function (timeout) {

	var events = new EventEmitter();
	var intervals = {};
	var obj = {};

	var restart = function restart(key) {
		intervals[key] && clearTimeout(intervals[key]);
		intervals[key] = setTimeout(function () {
			delete obj[key];
			events.emit('delete', key);
		}, timeout);
	};

	Object.defineProperty(obj, 'listeners', {
		get: function get() {
			return events;
		}
	});

	Object.defineProperty(obj, 'get', {
		value: function value(key) {
			restart(key);
			events.emit('get', key);
			return obj[key];
		}
	});

	Object.defineProperty(obj, 'set', {
		value: function value(key, _value) {
			restart(key);
			obj[key] = _value;
			events.emit('set', key);
		}
	});

	return obj;
};