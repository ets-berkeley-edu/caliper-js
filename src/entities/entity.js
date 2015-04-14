/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
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