/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./caliperEvent');

/**
 * Represents Assessment Event.  
 * Assessment's prototype set to Event
 * @constructor
 * @extends Event
 */
function AssessmentEvent() {

  Event.call(this);

  this.setContext(this.Contexts.ASSESSMENT);
  this.setType(this.Types.ASSESSMENT);

  this.setGenerated(null);
  this.setStartedAtTime(null);
  this.setEndedAtTime(null);
  this.setDuration(null);
}

AssessmentEvent.prototype = _.create(Event.prototype);

module.exports = AssessmentEvent;
