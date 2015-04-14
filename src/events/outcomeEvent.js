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
 * Represents Outcome Event.  
 * OutcomeEvent's prototype set to Event
 * @constructor
 * @extends Event
 */
function OutcomeEvent() {

    Event.call(this);

    this.setContext(EventContext.OUTCOME);
    this.setType(EventType.OUTCOME);
    this.setTarget(null);
    this.setGenerated(null);
    this.setEdApp(null);
    this.setGroup(null);
    this.setStartedAtTime(null);
    this.setEndedAtTime(null);
    this.setDuration(null);

}

OutcomeEvent.prototype = _.create(Event.prototype);

module.exports = OutcomeEvent;