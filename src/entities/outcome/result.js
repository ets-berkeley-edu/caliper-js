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

var _ = require('lodash');
var Entity = require('../entity');
var EntityType = require('../entityType');

/**
 * Represents Result.  
 * Result's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @param {Object} props Optional property settings
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
function Result(id, props) {
  props = props || {};

  Entity.call(this,id, props);
  this.setType(EntityType.RESULT);
  if (props.hasOwnProperty("actor")) {
    this.setActor(props.actor);
  }
  if (props.hasOwnProperty("assignable")) {
    this.setAssignable(props.assignable);
  }
  if (props.hasOwnProperty("normalScore")) {
    this.setNormalScore(props.normalScore);
  }
  if (props.hasOwnProperty("penaltyScore")) {
    this.setPenaltyScore(props.penaltyScore);
  }
  if (props.hasOwnProperty("extraCreditScore")) {
    this.setExtraCreditScore(props.extraCreditScore);
  }
  if (props.hasOwnProperty("totalScore")) {
    this.setTotalScore(props.totalScore);
  }
  if (props.hasOwnProperty("curvedTotalScore")) {
    this.setCurvedTotalScore(props.curvedTotalScore);
  }
  if (props.hasOwnProperty("curveFactor")) {
    this.setCurveFactor(props.curveFactor);
  }
  if (props.hasOwnProperty("comment")) {
    this.setComment(props.comment);
  }
  if (props.hasOwnProperty("scoredBy")) {
    this.setScoredBy(props.scoredBy);
  }
}

// Inherit from the prototype and assign additional properties to the object per the model as required.
Result.prototype = _.create(Entity.prototype, {
  setActor: function(actorId) {
    this.actor = actorId;
  },
  setAssignable: function(assignableId) {
    this.assignable = assignableId;
  },
  setNormalScore: function(normalScore) {
    this.normalScore = normalScore;
  },
  setPenaltyScore: function(penaltyScore) {
    this.penaltyScore = penaltyScore;
  },
  setExtraCreditScore: function(extraCreditScore) {
    this.extraCreditScore = extraCreditScore;
  },
  setTotalScore: function (totalScore) {
    this.totalScore = totalScore;
  },
  setCurvedTotalScore: function (curvedTotalScore) {
  this.curvedTotalScore = curvedTotalScore;
  },
  setCurveFactor: function (curveFactor) {
    this.curveFactor = curveFactor;
  },
  setComment: function (comment) {
    this.comment = comment;
  },
  setScoredBy: function (scoredBy) {
    this.scoredBy = scoredBy;
  }
});

module.exports = Result;
