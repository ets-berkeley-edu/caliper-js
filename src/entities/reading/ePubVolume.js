/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('../digitalResource');

function EPubVolume(id) {

  DigitalResource.call(this);

  this.setId(id);

  this.setName(null);
  this.setObjectType([]);
  this.setAlignedLearningObjective([]);
  this.setKeywords([]);
  this.setIsPartOf(null);
}

EPubVolume.prototype = _.create(DigitalResource.prototype);

module.exports = EPubVolume;