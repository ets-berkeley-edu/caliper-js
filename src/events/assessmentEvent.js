/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./event');
var EventContext = require('./eventContext');
var EventType = require('./eventType');

/**
 * Represents Assessment Event.  
 * Assessment's prototype set to Event
 * @constructor
 * @extends Event
 */
function AssessmentEvent() {

    Event.call(this);

    this.setContext(EventContext.ASSESSMENT);
    this.setType(EventType.ASSESSMENT);
    this.setTarget(null);
    this.setGenerated(null);
    this.setEdApp(null);
    this.setGroup(null);
    this.setStartedAtTime(null);
    this.setEndedAtTime(null);
    this.setDuration(null);
}

AssessmentEvent.prototype = _.create(Event.prototype);

module.exports = AssessmentEvent;