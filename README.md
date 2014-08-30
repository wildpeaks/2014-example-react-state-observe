# react-state-observe

Application state for [React](http://facebook.github.io/react) using `Object.observe`, `Array.observe` and `Object.defineProperty`.

Main files:

 - [/src/js/data/ApplicationState.js](https://github.com/wildpeaks/react-state-observe/blob/master/src/js/data/ApplicationState.js)
 - [/src/js/components/ReadState.jsx](https://github.com/wildpeaks/react-state-observe/blob/master/src/js/components/ReadState.jsx)
 - [/src/js/components/EditState.jsx](https://github.com/wildpeaks/react-state-observe/blob/master/src/js/components/EditState.jsx)


## State definition (ApplicationState.js)

Defines a state with two properties and one event:

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

Adds a constrained property that only accepts values between 0 an 10:

	var _constrained = 'Default value of myConstrainedNumber';
	Object.defineProperty(
		ApplicationState.data,
		'myConstrainedNumber',
		{
			enumerable: true,
			get: function(){
				return _constrained;
			},
			set: function(newValue){
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

Adds a constant property:

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

An action that changes a simple property:

	ApplicationState.action1 = function(value){
		this.data.myString = value;
	};

An action that emits an event:

	ApplicationState.action2 = function(){
		this.events.PING.event = {
			hello: 'world'
		};
	};

An action that modifies an Array property:

	ApplicationState.action3 = function(text){
		var id = this.data.myArray.length;
		this.data.myArray.push({
			id: id,
			text: text
		});
	};


## Listen to state changes (ReadState.jsx)

Use component mount events to listen:

	componentDidMount: function(){
		Array.observe(ApplicationState.data.myArray, this._onPosts);
		Object.observe(ApplicationState.data, this._onState);
		Object.observe(ApplicationState.events.PING, this._onPing);
	},
	componentWillUnmount: function(){
		Array.unobserve(ApplicationState.data.myArray, this._onPosts);
		Object.unobserve(ApplicationState.data, this._onState);
		Object.unobserve(ApplicationState.events.PING, this._onPing);
	},


## Edit state with actions (EditState.jsx)

Edit directly:

	_editMyString: function(){
		ApplicationState.data.myString = 'You clicked the button !';
	},
	_editConstrainedGood: function(){
		ApplicationState.data.myConstrainedNumber = 5;
	},

Or use an action:

	_action1: function(){
		ApplicationState.action1('Modified by Action #1');
	},
