/** @jsx React.DOM */

var React = require('react');
var ReadState = require('./ReadState.jsx');
var EditState = require('./EditState.jsx');


module.exports = React.createClass({

	render: function(){
		// jshint quotmark:false, newcap:false
		'use strict';
		return (
			<div>
				<ReadState />
				<EditState />
			</div>
		);
	}

});