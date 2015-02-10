/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('../caliperEntity');

function Result(id, type) {

  Entity.call(this);

  this.setId(id);
  this.setType(this.Types.RESULT);

  this.setProperties({});
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
