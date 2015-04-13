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
 * Represents Navigation Event.  
 * NavigationEvent's prototype set to Event
 * @constructor
 * @property {Object} navigatedFrom Object they navigated from
 * @extends Event
 */
function NavigationEvent() {

    Event.call(this);

    this.setContext(EventContext.NAVIGATION);
    this.setType(EventType.NAVIGATION);

    this.setTarget(null);
    this.setGenerated(null);
    this.setStartedAtTime(null);
    this.setEndedAtTime(null);
    this.setDuration(null);
}

NavigationEvent.prototype = _.create(Event.prototype);

NavigationEvent.prototype.setNavigatedFrom = function (navigatedFrom) {
  this.navigatedFrom = navigatedFrom;
};

module.exports = NavigationEvent;
