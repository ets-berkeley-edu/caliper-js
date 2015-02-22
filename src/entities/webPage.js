/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('./digitalResource');

/**
 * Represents WebPage.  
 * WebPage's prototype set to DigitalResource
 * @constructor
 * @param {string} id URI
 * @param {string} type Type
 * @extends DigitalResource
 */
function WebPage(id, type) {

  DigitalResource.call(this);

  this.setId(id);
  this.setType("http://purl.imsglobal.org/caliper/v1/WebPage");

  this.setName(null);
  this.setObjectType([]);
  this.setAlignedLearningObjective([]);
  this.setKeywords([]);
  this.setIsPartOf(null);
}

WebPage.prototype = _.create(DigitalResource.prototype);

module.exports = WebPage;
