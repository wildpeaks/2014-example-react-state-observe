function getter(){
	'use strict';
	return true;
}

function create_setter(event_id){
	'use strict';
	return function(data){
		Object.getNotifier(this).notify({
			name: event_id,
			type: 'update',
			data: data
		});
	};
}


function State(json_data){
	'use strict';
	var events = json_data.events || {};
	for (var event_id in events){
		Object.defineProperty(
			events[event_id],
			'event',
			{
				get: getter,
				set: create_setter(event_id)
			}
		);
	}
	this.events = events;
	this.data = json_data.data || {};
}


module.exports = State;