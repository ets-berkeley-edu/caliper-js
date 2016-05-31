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

var Context = require('../context/context');
var Type = require('./entityType');

/**
 * Represents base Caliper Entity.  Analogous to a schema.org Thing
 * @constructor
 * @param {string} id URI
 * @param {Object} props Optional property settings
 * @property {string} @context URI
 * @property {string} @id URI
 * @property {string} @type URI
 * @property {string} name Name
 * @property {string} description Description
 * @property {string} dateCreated String Representation of Date
 * @property {string} dateModified String Representation of Date
 * @property {Object[]} extensions Array of custom extension properties
 */

function Entity(id, props) {
  props = props || {};

  //this.setContext(Context.CONTEXT);
  this.setId(id);
  this.setType(Type.ENTITY);
  if (props.hasOwnProperty("name")) {
    this.setName(props.name);
  }
  if (props.hasOwnProperty("description")) {
    this.setDescription(props.description);
  }
  if (props.hasOwnProperty("dateCreated")) {
    this.setDateCreated(props.dateCreated);
  }
  if (props.hasOwnProperty("dateModified")) {
    this.setDateModified(props.dateModified);
  }
  if (props.hasOwnProperty("extensions")) {
    this.setExtensions(props.extensions);
  }
}

// Setters for base properties of all Caliper Entities
Entity.prototype = {
  setContext: function(context) {
    this['@context'] = context;
  },
  setId: function(id) {
    this['@id'] = id;
  },
  setType: function(type) {
    this['@type'] = type;
  },
  setName: function(name) {
    this.name = name;
  },
  setDescription: function(description) {
    this.description = description;
  },
  setDateCreated: function(dateCreated) {
    this.dateCreated = dateCreated;
  },
  setDateModified: function(dateModified) {
    this.dateModified = dateModified;
  },
  setExtensions: function(extensions) {
    this.extensions = extensions;
  }
};

module.exports = Entity;