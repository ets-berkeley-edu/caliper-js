/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Agent = require('./agent');
var EntityType = require('../entityType');

/**
 * Represents Person.  
 * Person's prototype set to Agent
 * @constructor
 * @param {string} id URI
 * @extends Agent
 */
function Person(id) {

  Agent.call(this);

  this.setId(id);
  this.setType(EntityType.PERSON);

}

Person.prototype = _.create(Agent.prototype);

module.exports = Person;
