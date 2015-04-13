/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./event');
var EventContext = require('./eventContext');
var EventType = require('./eventType');

/**
 * Represents Annotation Event.  
 * AnnotationEvent's prototype set to Event
 * @constructor
 * @extends Event
 */
function AnnotationEvent() {

    Event.call(this);

    this.setContext(EventContext.ANNOTATION);
    this.setType(EventType.ANNOTATION);

    this.setTarget(null);
    this.setGenerated(null);
    this.setStartedAtTime(null);
    this.setEndedAtTime(null);
    this.setDuration(null);

}

AnnotationEvent.prototype = _.create(Event.prototype);

module.exports = AnnotationEvent;
