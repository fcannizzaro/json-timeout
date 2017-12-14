# json-timeout
Auto destroy unused key (timeout)

[![npm](https://img.shields.io/npm/v/json-timeout.svg)](https://www.npmjs.com/package/json-timeout)
[![npm](https://img.shields.io/npm/dm/json-timeout.svg)](https://www.npmjs.com/package/json-timeout)

# Install

```sh
npm i --save json-timeout
```

# Usage
```javascript

const json = require('json-timeout')();

const obj = json(1000 * 60); // destroy entry every 60s

obj.set('hello', 'world'); 

const hello = obj.get('hello'); // world

```

# Events
```javascript
obj.listeners.on('get', (key) => {})     // key get
obj.listeners.on('set', (key) => {})     // key set
obj.listeners.on('delete', (key) => {})  // key timeout expired 
```

# Author
Francesco Cannizzaro
