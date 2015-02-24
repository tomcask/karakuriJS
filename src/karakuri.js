var karakuri = {} || karakuri;

(function() {
	var arraySlice = Array.prototype.slice;
	
	karakuri = function(options) {
		var state,
			api = {
				transitionTo: function (newState) {
					state = newState;					
					return runHandler('_onEnter', arraySlice.call(arguments, 1));
				}
			};
		
		function runHandler(eventName, argumentsArray) {
			var handler = options.states[state][eventName];
			
			if(handler) {
				return handler.apply(api, argumentsArray);
			}
		}		
		
		api.transitionTo(options.initial);
		
		return {
			handle: function(eventName) {
				return runHandler(eventName, arraySlice.call(arguments, 1));
			}
		};
	};
})();