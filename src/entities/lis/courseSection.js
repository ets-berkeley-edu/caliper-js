/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Course = require('./courseOffering');

/**
 * Represents Course.  
 * CourseSection's prototype set to Course
 * @constructor
 * @param {string} id URI
 * @property {string} category String representing a Category (lecture, lab, etc.)
 * @extends Course
 */
function CourseSection(id) {

  Course.call(this);

  this.setId(id);
  this.setType("http://purl.imsglobal.org/caliper/v1/lis/CourseSection");

  this.setCourseNumber(null);
  this.setAcademicSession(null);

  this.setSubOrganizationOf(null);

}

CourseSection.prototype = _.create(Course.prototype);

CourseSection.prototype.setCategory = function(category) {
  this.category = category;
};

// TODO add membership, subOrganizationOf

module.exports = CourseSection;
