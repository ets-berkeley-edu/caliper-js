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
 * Represents Attempt.  
 * Attempt's prototype set to Entity
 * @constructor
 * @param {string} id URI
 * @param {Object} props Optional property settings
 * @property {string} assignable URI representing Assignment being attempted
 * @property {string} actor URI representing Actor attempted
 * @property {number} count Counter representing attempt
 * @property {string} startedAtTime String Representation of Date
 * @property {string} endedAtTime String Representation of Date
 * @property {string} duration The format is expected to be PnYnMnDTnHnMnS
 * @extends Entity
 */
function Attempt(id, props) {
  props = props || {};

  Entity.call(this, id, props);
  this.setType(EntityType.ATTEMPT);
  if (props.hasOwnProperty("actor")) {
    this.setActor(props.actor);
  }
  if (props.hasOwnProperty("assignable")) {
    this.setAssignable(props.assignable);
  }
  if (props.hasOwnProperty("count")) {
    this.setCount(props.count);
  }
  if (props.hasOwnProperty("startedAtTime")) {
    this.setStartedAtTime(props.startedAtTime);
  }
  if (props.hasOwnProperty("endedAtTime")) {
    this.setEndedAtTime(props.endedAtTime);
  }
  if (props.hasOwnProperty("duration")) {
    this.setDuration(duration);
  }
}

// Inherit from the prototype and assign additional properties to the object per the model as required.
Attempt.prototype = _.create(Entity.prototype, {
  setAssignable: function(assignableId) {
    this.assignable = assignableId;
  },
  setActor: function(actorId) {
    this.actor = actorId;
  },
  setCount: function(count) {
    this.count = count;
  },
  setStartedAtTime: function(startedAt) {
    this.startedAtTime = startedAt;
  },
  setEndedAtTime: function(endedAt) {
    this.endedAtTime = endedAt;
  },
  setDuration: function(duration) {
    this.duration = duration;
  }
});

module.exports = Attempt;