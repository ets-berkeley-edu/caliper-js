/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Organization = require('../agent/organization');
var EntityType = require('../entityType');

/**
 * Represents Organization.
 * CourseOffering's prototype set to Organization
 * @constructor
 * @param {string} id URI
 * @property {string} courseNumber String representing the Course Number
 * @property {string} academicSession String representing the academic session
 * @extends Organization
 */
function CourseOffering(id) {

    Organization.call(this);

    this.setId(id);
    this.setType(EntityType.COURSE_OFFERING);

}

CourseOffering.prototype = _.create(Organization.prototype);

CourseOffering.prototype.setCourseNumber = function(courseNumber) {
    this.courseNumber = courseNumber;
};

CourseOffering.prototype.setAcademicSession = function(academicSession) {
    this.academicSession = academicSession;
};

// TODO add membership, subOrganizationOf

module.exports = CourseOffering;