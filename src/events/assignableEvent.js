/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./event');
var EventContext = require('./eventContext');
var EventType = require('./eventType');

/**
 * Represents Assignable Event.  
 * AssignableEvent's prototype set to Event
 * @constructor
 * @extends Event
 */
function AssignableEvent() {

  Event.call(this);

  this.setContext(EventContext.ASSIGNABLE);
  this.setType(EventType.ASSIGNABLE);

  this.setTarget(null);
  this.setGenerated(null);
  this.setStartedAtTime(null);
  this.setEndedAtTime(null);
  this.setDuration(null);
}

AssignableEvent.prototype = _.create(Event.prototype);

module.exports = AssignableEvent;
