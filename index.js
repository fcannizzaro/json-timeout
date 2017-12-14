const EventEmitter = require('events');

module.exports = (timeout) => {

	const events = new EventEmitter();
	const intervals = {};
	const obj = {};

	const restart = (key) => {
		intervals[key] && clearTimeout(intervals[key]);
		intervals[key] = setTimeout(() => {
			delete obj[key];
			events.emit('delete', key);
		}, timeout);
	}

	Object.defineProperty(obj, 'listeners', {
		get: () => events
	});

	Object.defineProperty(obj, 'get', {
		value: (key) => {
			restart(key);
			events.emit('get', key);
			return obj[key];
		}
	});

	Object.defineProperty(obj, 'set', {
		value: (key, value) => {
			restart(key);
			obj[key] = value;
			events.emit('set', key);
		}
	});

	return obj;

};
