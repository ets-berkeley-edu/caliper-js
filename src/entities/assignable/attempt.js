/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('../caliperEntity');

function Attempt(id, type) {

  Entity.call(this);

  this.setId(id);
  this.setType(this.Types.ATTEMPT);

  this.setProperties({});
}

Attempt.prototype = _.create(Entity.prototype);

Attempt.prototype.setAssignable = function (assignable) {
  this.assignable = assignable;
};

Attempt.prototype.setCount = function (count) {
  this.count = count;
}

module.exports = Attempt;
