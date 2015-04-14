/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('./../digitalResource');
var DigitalResourceType = require('../digitalResourceType');

/**
 * Represents WebPage.  
 * WebPage's prototype set to DigitalResource
 * @constructor
 * @param {string} id URI
 * @param {string} type Type
 * @extends DigitalResource
 */
function WebPage(id) {

  DigitalResource.call(this);

  this.setId(id);
  this.setType(DigitalResourceType.WEB_PAGE);

}

WebPage.prototype = _.create(DigitalResource.prototype);

module.exports = WebPage;