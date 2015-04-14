/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('../entity');
var EntityType = require('../entityType');

/**
 * Represents Annotation.  
 * Annotation's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @property {string} annotationId URI
 * @extends Entity
 */
function Annotation(id) {

    Entity.call(this);

    this.setId(id);
    this.setType(EntityType.ANNOTATION)

    this.setName(null);
    this.setDescription(null);
    this.setExtensions({});
    this.setDateCreated(null);
    this.setDateModified(null);

}

Annotation.prototype = _.create(Entity.prototype);

Annotation.prototype.setAnnotatedId = function (annotatedId) {
  this.annotatedId = annotatedId;
};

module.exports = Annotation;