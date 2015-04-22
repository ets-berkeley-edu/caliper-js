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

/**
 * Represents base Caliper Entity.  Analogous to a schema.org Thing
 * @constructor
 * @property {string} @id URI
 * @property {string} @type Type
 * @property {string} name Name
 * @property {string} description Description
 * @property {Object[]} properties Array of Extensions
 * @property {string} dateCreated String Representation of Date
 * @property {string} dateModified String Representation of Date
 */
function Entity() {
  // Constructor
}

// Setters for base properties of all Caliper Entities
Entity.prototype.setId = function (id) {
    this['@id'] = id;
};

Entity.prototype.setType = function (type) {
    this['@type'] = type;
};

Entity.prototype.setName = function (name) {
    this.name = name;
};

Entity.prototype.setDescription = function (description) {
    this.description = description;
};

Entity.prototype.setExtensions = function (extensions) {
    this.extensions = extensions;
};

Entity.prototype.setDateCreated = function (dateCreated) {
    this.dateCreated = dateCreated;
};

Entity.prototype.setDateModified = function (dateModified) {
    this.dateModified = dateModified;
};

module.exports = Entity;