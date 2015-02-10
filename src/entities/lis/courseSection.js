/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Organization = require('./organization');

function CourseSection(id) {

  Organization.call(this);

  this.setId(id);
  this.setType("http://purl.imsglobal.org/caliper/v1/lis/CourseSection");

  this.setParentOrg(null);

}

CourseSection.prototype = _.create(Organization.prototype);

CourseSection.prototype.setSemester = function(semester) {
  this.semester = semester;
};

CourseSection.prototype.setCourseNumber = function(courseNumber) {
  this.courseNumber = courseNumber;
};

CourseSection.prototype.setLabel = function(label) {
  this.label = label;
};

module.exports = CourseSection;
