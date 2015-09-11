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
    Entity.call(this);
    this.setId(id);
    this.setType(EntityType.RESULT);
    this.setActor(null);
    this.setAssignable(null);
    this.setNormalScore(null);
    this.setPenaltyScore(null);
    this.setExtraCreditScore(null);
    this.setTotalScore(null);
    this.setCurvedTotalScore(null);
    this.setCurveFactor(null);
    this.setComment(null);
    this.setScoredBy(null);
}

Result.prototype = _.create(Entity.prototype);

Result.prototype.setActor = function(actorId) {
  this.actor = actorId;
};

Result.prototype.setAssignable = function(assignableId) {
  this.assignable = assignableId;
};

Result.prototype.setNormalScore = function(normalScore) {
  this.normalScore = normalScore;
};

Result.prototype.setPenaltyScore = function(penaltyScore) {
  this.penaltyScore = penaltyScore;
};

Result.prototype.setExtraCreditScore = function(extraCreditScore) {
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
