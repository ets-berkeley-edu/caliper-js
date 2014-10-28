/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

function Event(type) {
  this.type = type;
}

Event.prototype.test = function() {
  return this.type;
};

module.exports = Event;
