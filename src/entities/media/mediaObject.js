/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('../digitalResource');

function MediaObject(id, type) {

  DigitalResource.call(this);

  this.setId(id);
  this.setType(this.Types.MEDIA_OBJECT);

  this.setProperties({});
}

MediaObject.prototype = _.create(DigitalResource.prototype);

MediaObject.prototype.Types = {
  "AUDIO_OBJECT": "http://purl.imsglobal.org/caliper/v1/AudioObject",
  "IMAGE_OBJECT": "http://purl.imsglobal.org/caliper/v1/ImageObject",
  "VIDEO_OBJECT": "http://purl.imsglobal.org/caliper/v1/VideoObject",
};

MediaObject.prototype.setDuration = function (duration) {
  this.duration = duration;
};

module.exports = MediaObject;
