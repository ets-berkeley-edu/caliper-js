/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');
var Event = require('../src/events/caliperEvent');

test('Create base Caliper Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(3);

  // Asser that key attributes are the same
  var caliperEvent = new Event();
  caliperEvent.setContext('http://purl.imsglobal.org/ctx/caliper/v1/NavigationEvent');
  caliperEvent.setType('NavigationEvent');
  console.log("CaliperEvent = " + util.inspect(caliperEvent));

  t.equal("http://purl.imsglobal.org/ctx/caliper/v1/NavigationEvent", caliperEvent['@context']);
  t.equal("NavigationEvent", caliperEvent['@type']);

  // Assert that JSON produced is the same
  jsonCompare('baseCaliperEvent', caliperEvent, t);
})
