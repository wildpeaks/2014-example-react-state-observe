var State = require('../classes/State');


var ApplicationState = new State({
	events: {
		PING: {}
	},
	data: {
		myString: 'Default value of myString',
		myArray: [
			{
				id: 0,
				text: 'First element of myArray'
			}
		]
	}
});


/**
 * Constrained property: only values between 0 and 10.
 */
var _constrained = 'Default value of myConstrainedNumber';
Object.defineProperty(
	ApplicationState.data,
	'myConstrainedNumber',
	{
		enumerable: true,
		get: function(){
			'use strict';
			return _constrained;
		},
		set: function(newValue){
			'use strict';
			if (newValue !== _constrained){
				var ok = (newValue >= 0) && (newValue <= 10);
				if (ok){
					Object.getNotifier(this).notify({
						type: 'update',
						name: 'myConstrainedNumber',
						oldValue: _constrained
					});
					_constrained = newValue;
				} else {
					throw new Error('Value out of range for property "myConstrainedNumber"');
				}
			}
		}
	}
);


/**
 * Constant property
 */
Object.defineProperty(
	ApplicationState.data,
	'myConst',
	{
		enumerable: false,
		configurable: false,
		writable: false,
		value: 'A static value'
	}
);


/**
 * Action #1
 * Modifies the value of myString.
 */
ApplicationState.action1 = function(value){
	'use strict';
	this.data.myString = value;
};


/**
 * Action #2
 * Emits a `ApplicationState.event.PING` event.
 */
ApplicationState.action2 = function(){
	'use strict';
	this.events.PING.event = {
		hello: 'world'
	};
};


/**
 * Action #3
 * Appends a value to `myArray`.
 */
ApplicationState.action3 = function(text){
	'use strict';
	var id = this.data.myArray.length;
	this.data.myArray.push({
		id: id,
		text: text
	});
};


module.exports = ApplicationState;