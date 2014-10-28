/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var self = this;

self.event = {'@context' : ''};

self.setContext = function(context) {
	self.event['@context'] = context;
}
var type;
var actor;
var action;
var object;
var target;
var startedAt;
var endedAt = 0;
var edApp;
var lisOrganization;
var generated;
var duration;

module.exports = {
  event: self.event,
  setContext: self.setContext
};
