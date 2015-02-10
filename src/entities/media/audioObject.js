/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var MediaObject = require('./mediaObject');

function AudioObject(id) {

  MediaObject.call(this);

  this.setId(id);
  this.setType(this.Types.AUDIO_OBJECT);
}

AudioObject.prototype = _.create(MediaObject.prototype);

module.exports = AudioObject;
