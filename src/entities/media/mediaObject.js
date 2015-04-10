/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('../digitalResource');

/**
 * Represents Media Object.  
 * MediaObject's prototype set to DigitalResource
 * @constructor
 * @param {string} id URI
 * @param {string} type Type
 * @property {string} duration The format is expected to be PnYnMnDTnHnMnS
 * @extends DigitalResource
 */
function MediaObject(id, type) {

  DigitalResource.call(this);

  this.setId(id);
  this.setType(this.Types.MEDIA_OBJECT);

  this.setExtensions({});
}

MediaObject.prototype = _.create(DigitalResource.prototype);

MediaObject.prototype.Types = {
  "AUDIO_OBJECT": "http://purl.imsglobal.org/caliper/v1/AudioObject",
  "IMAGE_OBJECT": "http://purl.imsglobal.org/caliper/v1/ImageObject",
  "VIDEO_OBJECT": "http://purl.imsglobal.org/caliper/v1/VideoObject",
  "MEDIA_LOCATION": "http://purl.imsglobal.org/caliper/v1/MediaLocation",
};

MediaObject.prototype.setDuration = function (duration) {
  this.duration = duration;
};

module.exports = MediaObject;
