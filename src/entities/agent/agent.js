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

var _ = require('lodash-node');
var Entity = require('./../entity');
var EntityType = require('./../entityType');

/**
 * Represents Agent.  Analogous to a FOAF Agent
 * Agent's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @param {string} type type
 * @param {Object[]} hasMemberships array
 * @extends Entity
 */
function Agent(id) {

    Entity.call(this);

    this.setId(id);
    this.setType(EntityType.AGENT);
    this.setName(null);
    this.setDescription(null);
    //this.setHasMembership([]);
    this.setExtensions({});
    this.setDateCreated(null);
    this.setDateModified(null);

}

Agent.prototype = _.create(Entity.prototype);

Agent.prototype.setHasMembership = function (hasMembership) {
  this.hasMembership = hasMembership;
}

module.exports = Agent;