/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

var _ = require('lodash');
var Organization = require('../agent/organization');
var EntityType = require('../entityType');

/**
 * Represents Organization.
 * CourseOffering's prototype set to Organization
 * @constructor
 * @param {string} id URI
 * @param {Object} props Optional property settings
 * @property {string} courseNumber String representing the Course Number
 * @property {string} academicSession String representing the academic session
 * @extends Organization
 */
function CourseOffering(id, props) {
  props = props || {};

  Organization.call(this, id, props);
  this.setType(EntityType.COURSE_OFFERING);
  if (props.hasOwnProperty("courseNumber")) {
    this.setCourseNumber(props.courseNumber);
  }
  if (props.hasOwnProperty("academicSession")) {
    this.setAcademicSession(props.academicSession);
  }
}

// Inherit from the prototype and assign additional properties to the object per the model as required.
CourseOffering.prototype = _.create(Organization.prototype, {
  setCourseNumber: function(courseNumber) {
    this.courseNumber = courseNumber;
  },
  setAcademicSession: function(academicSession) {
    this.academicSession = academicSession;
  }
});

module.exports = CourseOffering;