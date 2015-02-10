/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./caliperEvent');

function AssignableEvent() {

  Event.call(this);

  this.setContext(this.Contexts.ASSIGNABLE);
  this.setType(this.Types.ASSIGNABLE);

  this.setGenerated(null);
  this.setStartedAtTime(null);
  this.setEndedAtTime(null);
  this.setDuration(null);
}

AssignableEvent.prototype = _.create(Event.prototype);

module.exports = AssignableEvent;
