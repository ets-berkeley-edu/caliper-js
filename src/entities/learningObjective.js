/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('./caliperEntity');

function LearningObjective(id, type) {

  Entity.call(this);

  this.setId(id);
  this.setType(this.Types.LEARNING_OBJECTIVE);

  this.setName(null);
  this.setProperties({});
}

LearningObjective.prototype = _.create(Entity.prototype);

module.exports = LearningObjective;
