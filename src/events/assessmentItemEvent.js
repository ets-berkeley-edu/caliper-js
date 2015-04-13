/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./caliperEvent');

/**
 * Represents AssessmentItem Event.  
 * AssessmentItem's prototype set to Event
 * @constructor
 * @extends Event
 */
function AssessmentItemEvent() {

  Event.call(this);

  this.setContext(this.Contexts.ASSESSMENT_ITEM);
  this.setType(this.Types.ASSESSMENT_ITEM);

  this.setTarget(null);
  this.setGenerated(null);
  this.setStartedAtTime(null);
  this.setEndedAtTime(null);
  this.setDuration(null);
}

AssessmentItemEvent.prototype = _.create(Event.prototype);

module.exports = AssessmentItemEvent;
