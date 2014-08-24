/** @jsx React.DOM */

var React = require('react');
var ApplicationState = require('../data/ApplicationState');


module.exports = React.createClass({

	_editMyString: function(){
		'use strict';
		ApplicationState.data.myString = 'You clicked the button !';
	},

	_editMyConst: function(){
		'use strict';
		ApplicationState.data.myConst = 'You clicked the button !';
	},


	_editConstrainedGood: function(){
		'use strict';
		ApplicationState.data.myConstrainedNumber = 5;
	},
	_editConstrainedBad: function(){
		'use strict';
		ApplicationState.data.myConstrainedNumber = 15;
	},


	_action1: function(){
		'use strict';
		ApplicationState.action1('Modified by Action #1');
	},
	_action2: function(){
		'use strict';
		ApplicationState.action2();
	},
	_action3: function(){
		'use strict';
		ApplicationState.action3('Added by Action #3');
	},


	render: function(){
		// jshint quotmark:false, newcap:false
		'use strict';
		return (
			<fieldset>
				<legend>EditValues.jsx</legend>
				<dl>
					<dt>myString</dt>
					<dd><button onClick={this._editMyString}>Change value</button></dd>

					<dt>myConst</dt>
					<dd><button onClick={this._editMyConst}>Change value</button> (this will trigger an exception)</dd>

					<dt>myConstrainedNumber</dt>
					<dd><button onClick={this._editConstrainedGood}>Change value to "5" (in range)</button></dd>
					<dd><button onClick={this._editConstrainedBad}>Change value to "15" (out of range)</button> (this will trigger an exception)</dd>

					<dt>Actions</dt>
					<dd><button onClick={this._action1}>#1: modifies "myString"</button></dd>
					<dd><button onClick={this._action2}>#2: sends a "PING" event</button></dd>
					<dd><button onClick={this._action3}>#3: appends to "myArray"</button></dd>
				</dl>
			</fieldset>
		);
	}

});