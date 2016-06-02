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
var Entity = require('../entity');
var entityType = require('../entityType');

/**
 * Represents a W3C Membership.
 * Membership's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @param {Object} props Optional property settings
 * @property {string} memberId member Identifier
 * @property {string} organizationId organization Identifier
 * @property {Object[]} roles Array of roles
 * @property {string} status Membership status of actor (e.g., active, inactive, deleted)
 * @extends Entity
 */
function Membership(id, props) {
  props = props || {};

  Entity.call(this, id, props);
  this.setType(entityType.MEMBERSHIP);
  if (props.hasOwnProperty("member")) {
    this.setMember(props.member);
  }
  if (props.hasOwnProperty("organization")) {
    this.setOrganization(props.organization);
  }
  if (props.hasOwnProperty("roles")) {
    this.setRoles(props.roles);
  }
  if (props.hasOwnProperty("status")) {
    this.setStatus(props.status);
  }
}

// Inherit from the prototype and assign additional properties to the object per the model as required.
Membership.prototype = _.create(Entity.prototype, {
  setMember: function(member) {
    this.member = member;
  },
  setOrganization: function(organization) {
    this.organization = organization;
  },
  setRoles: function(roles) {
    this.roles = roles;
  },
  setStatus: function(status) {
    this.status = status;
  }
});

module.exports = Membership;