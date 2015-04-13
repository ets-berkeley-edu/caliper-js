/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('../entity');
var EntityType = require('../entityType');

/**
 * Represents Result.  
 * Result's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @param {string} type Type
 * @property {string} assignableId URI of Assignable
 * @property {number} normalScore Normal Score
 * @property {number} penaltyScore  Penalty Score
 * @property {number} extraCreditScore Extra Credit Score
 * @property {number} totalScore Total Score
 * @property {number} curvedTotalScore Curved Total Score
 * @property {number}curveFactor Curve Factor
 * @property {string} comment Comment
 * @property {Object} scoredBy Agent Object
 * @extends Entity
 */
function Result(id) {
  // function Result(id, type)

  Entity.call(this);

  this.setId(id);
  this.setType(EntityType.RESULT);

  this.setExtensions({});
}

Result.prototype = _.create(Entity.prototype);

Result.prototype.setActorId = function (actorId) {
  this.actorId = actorId;
};

Result.prototype.setAssignableId = function (assignableId) {
  this.assignableId = assignableId;
};

Result.prototype.setNormalScore = function (normalScore) {
  this.normalScore = normalScore;
};

Result.prototype.setPenaltyScore = function (penaltyScore) {
  this.penaltyScore = penaltyScore;
};

Result.prototype.setExtraCreditScore = function (extraCreditScore) {
  this.extraCreditScore = extraCreditScore;
};

Result.prototype.setTotalScore = function (totalScore) {
  this.totalScore = totalScore;
};

Result.prototype.setCurvedTotalScore = function (curvedTotalScore) {
  this.curvedTotalScore = curvedTotalScore;
};

Result.prototype.setCurveFactor = function (curveFactor) {
  this.curveFactor = curveFactor;
};

Result.prototype.setComment = function (comment) {
  this.comment = comment;
};

Result.prototype.setScoredBy = function (scoredBy) {
  this.scoredBy = scoredBy;
};

module.exports = Result;
