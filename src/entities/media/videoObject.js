/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var MediaObject = require('./mediaObject');

function VideoObject(id) {

  MediaObject.call(this);

  this.setId(id);
  this.setType(this.Types.VIDEO_OBJECT);
}

VideoObject.prototype = _.create(MediaObject.prototype);

module.exports = VideoObject;
