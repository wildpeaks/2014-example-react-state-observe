function getter(){
	'use strict';
	return true;
}


function State(json_data){
	'use strict';
	var events = json_data.events || {};
	for (var event_id in events){
		// jshint loopfunc:true
		Object.defineProperty(
			events[event_id],
			'event',
			{
				get: getter,
				set: function(data){
					Object.getNotifier(this).notify({
						name: event_id,
						type: 'update',
						data: data
					});
				}
			}
		);
	}
	this.events = events;
	this.data = json_data.data || {};
}


module.exports = State;