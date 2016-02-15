/**
 * Classified model events
 */

'use strict';

import {EventEmitter} from 'events';
var Classified = require('./classified.model');
var ClassifiedEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ClassifiedEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Classified.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ClassifiedEvents.emit(event + ':' + doc._id, doc);
    ClassifiedEvents.emit(event, doc);
  }
}

export default ClassifiedEvents;
