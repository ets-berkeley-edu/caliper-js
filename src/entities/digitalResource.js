/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('./entity');
var EntityType = require('./entityType');

/**
 * Represents Digital Resource.  Analogous to a schema.org CreativeWork
 * DigitalResource's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @property {string} name Name
 * @property {string} description Description
 * @property {Object[]} properties Array of Extensions
 * @property {string[]}  objectType Array of Object Type Strings
 * @property {{string[]} } alignedLearningObjective Array of Learning Objectives
 * @property {{string[]} } keywords Array of KeyWord Strings
 * @property {Object} isPartOf Parent Object
 * @property {string} datePublished String representing a date
 * @property {string} Version String representing the version of the DigitalResource
 * @extends Entity
 */
function DigitalResource(id) {

    Entity.call(this);

    this.setId(id);
    this.setType(EntityType.DIGITAL_RESOURCE);

    this.setName(null);
    this.setDescription(null);
    this.setExtensions({});
    this.setObjectType([]);
    this.setAlignedLearningObjective([]);
    this.setKeywords([]);
    this.setIsPartOf(null);
    this.setDatePublished(null);
    this.setVersion(null);
}

DigitalResource.prototype = _.create(Entity.prototype);

DigitalResource.prototype.setObjectType = function (objectType) {
  this.objectType = objectType;
};

DigitalResource.prototype.setAlignedLearningObjective = function (alignedLearningObjective) {
  this.alignedLearningObjective = alignedLearningObjective;
};

DigitalResource.prototype.setKeywords = function (keywords) {
  this.keywords = keywords;
};

DigitalResource.prototype.setIsPartOf = function (isPartOf) {
  this.isPartOf = isPartOf;
};

DigitalResource.prototype.setDatePublished = function (datePublished) {
  this.datePublished = datePublished;
};

DigitalResource.prototype.setVersion = function (version) {
    this.version = version;
};

module.exports = DigitalResource;