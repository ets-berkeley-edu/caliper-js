/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./caliperEvent');

function NavigationEvent() {

  Event.call(this);

  this.setContext(this.Contexts.NAVIGATION);
  this.setType(this.Types.NAVIGATION);

  this.setGenerated(null);
  this.setStartedAtTime(0);
  this.setEndedAtTime(0);
  this.setDuration(null);
}

NavigationEvent.prototype = _.create(Event.prototype);

NavigationEvent.prototype.setNavigatedFrom = function (navigatedFrom) {
  this.navigatedFrom = navigatedFrom;
}

module.exports = NavigationEvent;
