/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var CourseOffering = require('./courseOffering');
var EntityType = require('../entityType');

/**
 * Represents Course.  
 * CourseSection's prototype set to CourseOffering
 * @constructor
 * @param {string} id URI
 * @property {string} category String representing a Category (lecture, lab, etc.)
 * @extends Course
 */
function CourseSection(id) {

  CourseOffering.call(this);

  this.setId(id);
  this.setType(EntityType.COURSE_SECTION);

}

CourseSection.prototype = _.create(CourseOffering.prototype);

CourseSection.prototype.setCategory = function(category) {
  this.category = category;
};

module.exports = CourseSection;