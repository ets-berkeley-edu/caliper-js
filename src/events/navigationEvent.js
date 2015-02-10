/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./caliperEvent');

function NavigationEvent() {

  Event.call(this);

  this.setContext(this.Contexts.NAVIGATION);
  this.setType(this.Types.NAVIGATION);

  this.setGenerated(null);
  this.setStartedAtTime(null);
  this.setEndedAtTime(null);
  this.setDuration(null);
}

NavigationEvent.prototype = _.create(Event.prototype);

NavigationEvent.prototype.setNavigatedFrom = function (navigatedFrom) {
  this.navigatedFrom = navigatedFrom;
}

module.exports = NavigationEvent;
