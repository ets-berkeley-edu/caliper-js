/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('../digitalResource');

function EPubVolume(id) {

  DigitalResource.call(this);

  this.setId(id);

  this.setName(null);
  this.setObjectType([]);
  this.setAlignedLearningObjective([]);
  this.setKeyword([]);
  this.setPartOf(null);
}

EPubVolume.prototype = _.create(DigitalResource.prototype);

module.exports = EPubVolume;