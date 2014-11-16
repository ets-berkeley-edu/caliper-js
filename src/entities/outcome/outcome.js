/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */


function Outcome() {
  // Constructor
}

// Setters for base properties of all Caliper Entities
Outcome.prototype.setAttempt = function (attempt) {
  this.attempt = attempt;
};

Outcome.prototype.setResult = function (result) {
  this.result = result;
};

module.exports = Outcome;
