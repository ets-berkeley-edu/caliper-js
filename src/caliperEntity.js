/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */


function Entity() {
  // Constructor
}

// Setters for base properties of all Caliper Entities
Entity.prototype.setId = function(id) {
  this.id = id;
};

Entity.prototype.setType = function(type) {
  this.type = type;
};

Entity.prototype.setName = function(name) {
  this.name = name;
};

Entity.prototype.setLastModifiedAt = function(lastModifiedAt) {
  this.lastModifiedAt = lastModifiedAt;
};

Entity.prototype.setProperties = function(properties) {
  this.properties = properties;
};

module.exports = Entity;