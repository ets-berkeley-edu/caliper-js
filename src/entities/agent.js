/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('./caliperEntity');

function Agent(id, type) {

  Entity.call(this);

  this.setId(id);

  switch (type) {
  case "LIS_PERSON":
    this.setType("http://purl.imsglobal.org/caliper/v1/lis/Person");
    break;
  case "LIS_COURSE_SECTION":
    this.setType("http://purl.imsglobal.org/caliper/v1/lis/CourseSection");
    break;
  case "LIS_ORGANIZATION":
    this.setType("http://purl.imsglobal.org/caliper/v1/lis/Organization");
    break;
  case "SOFTWARE_APPLICATION":
    this.setType("http://purl.imsglobal.org/caliper/v1/SoftwareApplication");
    break;
  }

  this.setProperties({});
}

Agent.prototype = _.create(Entity.prototype);

module.exports = Agent;
