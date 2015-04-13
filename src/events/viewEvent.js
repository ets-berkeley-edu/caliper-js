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
 * Represents View Event.  
 * ViewEvent's prototype set to Event
 * @constructor
 * @extends Event
 */
function ViewEvent() {

    Event.call(this);

    this.setContext(EventContext.VIEWED);
    this.setType(EventType.VIEWED);

    this.setTarget(null);
    this.setGenerated(null);
    this.setStartedAtTime(null);
    this.setEndedAtTime(null);
    this.setDuration(null);
}

ViewEvent.prototype = _.create(Event.prototype);

module.exports = ViewEvent;
