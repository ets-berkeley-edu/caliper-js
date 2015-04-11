/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('./entity');
var EntityType = require('./entityType');

/**
 * Represents Learning Objective
 * LearningObjective's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @param {string} type Type
 * @extends Entity
 */
function LearningObjective(id, type) {

  Entity.call(this);

  this.setId(id);
  this.setType(EntityType.type.LEARNING_OBJECTIVE);

  /**
  this.setName(null);
  this.setExtensions({});
   */
}

LearningObjective.prototype = _.create(Entity.prototype);

module.exports = LearningObjective;
