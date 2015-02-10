/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Agent = require('../agent');

function Person(id) {

  Agent.call(this);

  this.setId(id);
  this.setType("http://purl.imsglobal.org/caliper/v1/lis/Person");

}

Person.prototype = _.create(Agent.prototype);

module.exports = Person;
