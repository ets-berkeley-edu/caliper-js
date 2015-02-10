/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./caliperEvent');

function OutcomeEvent() {

  Event.call(this);

  this.setContext(this.Contexts.OUTCOME);
  this.setType(this.Types.OUTCOME);

  this.setGenerated(null);
  this.setStartedAtTime(null);
  this.setEndedAtTime(null);
  this.setDuration(null);
}

OutcomeEvent.prototype = _.create(Event.prototype);

module.exports = OutcomeEvent;
