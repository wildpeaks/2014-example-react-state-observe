/** @jsx React.DOM */

var React = require('react');
var ApplicationState = require('../data/ApplicationState');


module.exports = React.createClass({

	_onPosts: function( /*changes*/ ){
		'use strict';
		//console.group('Posts !');
		//console.log(changes);
		//console.groupEnd();
		this.forceUpdate();
	},

	_onState: function( /*changes*/ ){
		'use strict';
		//console.group('Data !');
		//console.log(changes);
		//console.groupEnd();
		this.forceUpdate();
	},

	_onPing: function( /*event*/ ){
		'use strict';
		//console.group('Ping !');
		//console.log(event[0].data);
		//console.groupEnd();
		alert('Ping !');
	},

	componentDidMount: function(){
		'use strict';
		Array.observe(ApplicationState.data.myArray, this._onPosts);
		Object.observe(ApplicationState.data, this._onState);
		Object.observe(ApplicationState.events.PING, this._onPing);
	},
	componentWillUnmount: function(){
		'use strict';
		Array.unobserve(ApplicationState.data.myArray, this._onPosts);
		Object.unobserve(ApplicationState.data, this._onState);
		Object.unobserve(ApplicationState.events.PING, this._onPing);
	},

	render: function(){
		// jshint quotmark:false, newcap:false
		'use strict';
		var children = ApplicationState.data.myArray.map(function(post){
			return (<li key={post.id}>{post.text}</li>);
		});
		return (
			<fieldset>
				<legend>ReadValues.jsx</legend>
				<dl>
					<dt>myString</dt>
					<dd>{ApplicationState.data.myString}</dd>

					<dt>myConst</dt>
					<dd>{ApplicationState.data.myConst}</dd>

					<dt>myConstrainedNumber</dt>
					<dd>{ApplicationState.data.myConstrainedNumber}</dd>

					<dt>myArray</dt>
					<dd><ul>{children}</ul></dd>
				</dl>
			</fieldset>
		);
	}

});