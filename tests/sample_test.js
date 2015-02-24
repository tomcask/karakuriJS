(function() {
	test('transitions to initial state', function() {
		var enteredStateA;
		
		new karakuri({
			states: {
				a: {
					_onEnter: function() {
						enteredStateA = true;
					}
				}
			},
			initial: 'a'
		});
		
		ok(enteredStateA, 'did not enter initial state');
	});

	test('initial state with no _onEnter handler does not throw an exception', function() {
		var exceptionThrown;
		
		try
		{
			new karakuri({
				states: {
					a: { }
				},
				initial: 'a'
			});
		}
		catch (e) {
			exceptionThrown = true;
		}
		
		ok(!exceptionThrown, 'exception thrown');
	});

	test('handle calls the event name on the current state', function() {
		var eventHandlerCalled,
			machine;
		
		machine = new karakuri({
			states: {
				a: {
					anEvent: function() {
						eventHandlerCalled = true;
					}
				}
			},
			initial: 'a'
		});
		
		machine.handle('anEvent');
		
		ok(eventHandlerCalled, 'did not enter initial state');
	});

	test('handle returns the return object of the function', function() {
		var returnedValue,
			machine;
		
		machine = new karakuri({
			states: {
				a: {
					anEvent: function() {
						return 12345;
					}
				}
			},
			initial: 'a'
		});
		
		returnedValue = machine.handle('anEvent');
		
		equal(returnedValue, 12345, 'did not return expected value');
	});

	test('events are passed object with transitionTo method in "this" context', function() {
		var transitionToMethod,
			machine;
		
		machine = new karakuri({
			states: {
				a: {
					anEvent: function() {
						transitionToMethod = this.transitionTo;
					}
				}
			},
			initial: 'a'
		});
		
		machine.handle('anEvent');
		
		equal(typeof transitionToMethod, 'function', 'no transitionTo method');
	});

	test('events are passed object with transitionTo method in "this" context', function() {
		var transitionToMethod,
			machine;
		
		machine = new karakuri({
			states: {
				a: {
					anEvent: function() {
						transitionToMethod = this.transitionTo;
					}
				}
			},
			initial: 'a'
		});
		
		machine.handle('anEvent');
		
		equal(typeof transitionToMethod, 'function', 'no transitionTo method');
	});

	test('transitionTo method moves the machine into the specified state', function() {
		var enteredStateB,
			machine;
		
		machine = new karakuri({
			states: {
				a: {
					anEvent: function() {
						this.transitionTo('b');
					}
				},
				b: {
					_onEnter: function() {
						enteredStateB = true;
					}
				}
			},
			initial: 'a'
		});
		
		machine.handle('anEvent');
		
		ok(enteredStateB, 'did not transition to state B');
	});

	test('can transition between states from _onEnter', function() {
		var enteredStateB,
			machine;
		
		machine = new karakuri({
			states: {
				a: {
					_onEnter: function() {
						this.transitionTo('b');
					}
				},
				b: {
					_onEnter: function() {
						enteredStateB = true;
					}
				}
			},
			initial: 'a'
		});
		
		ok(enteredStateB, 'did not transition to state B');
	});

	test('handle calls event handler on new state after transition', function() {
		var	anEventOnStateBCalled,
			machine;
		
		machine = new karakuri({
			states: {
				a: {
					_onEnter: function() {
						this.transitionTo('b');
					},
					anEvent: function() {
					}
				},
				b: {
					anEvent: function() {
						anEventOnStateBCalled = true;
					}
				}
			},
			initial: 'a'
		});
		
		machine.handle('anEvent');
		
		ok(anEventOnStateBCalled, 'did not call anEvent on state B');
	});

	test('calling handle with an event that does not exist on the current state does not cause an exception', function() {
		var exceptionThrown,
			machine = new karakuri({
				states: {
					a: { }
				},
				initial: 'a'
			});
		
		try
		{
			machine.handle('doesNotExist');
		}
		catch (e) {
			exceptionThrown = true;
		}
		
		ok(!exceptionThrown, 'exception thrown');
	});

	test('handle passes arguments after eventName to event handler', function() {
		var expectedArguments = [12345, 678910],
			actualArguments,
			machine = new karakuri({
				states: {
					a: {
						anEvent: function() {
							actualArguments = Array.prototype.slice.call(arguments);
						}
					}
				},
				initial: 'a'
			});
		
		machine.handle('anEvent', 12345, 678910);
		
		deepEqual(actualArguments, expectedArguments, 'arguments passed to event handler are not correct');
	});

	test('transitionTo passes arguments after new state name to _onEnter event', function() {
		var expectedArguments = [12345, 678910],
			actualArguments,
			machine = new karakuri({
				states: {
					a: {
						_onEnter: function() {
							this.transitionTo('b', 12345, 678910);
						}
					},
					b: {
						_onEnter: function() {
							actualArguments = Array.prototype.slice.call(arguments);
						}
					}
				},
				initial: 'a'
			});
		
		deepEqual(actualArguments, expectedArguments, 'arguments passed to _onEnter are not correct');
	});

	test('transitionTo _onEnter passes return value to event handler', function() {
		var returnedValue,
			machine = new karakuri({
				states: {
					a: { 
						doSomething: function() {
							return this.transitionTo('b');
						}
					},
					b: {
						_onEnter: function() {
							return 12345;
						}
					}
				},
				initial: 'a'
			});
		
		returnedValue = machine.handle('doSomething');

		deepEqual(returnedValue, 12345, '_onEnter return argument not returned');
	});
})();