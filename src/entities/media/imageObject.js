/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var MediaObject = require('./mediaObject');

function ImageObject(id) {

  MediaObject.call(this);

  this.setId(id);
  this.setType(this.Types.IMAGE_OBJECT);
}

ImageObject.prototype = _.create(MediaObject.prototype);

module.exports = ImageObject;
