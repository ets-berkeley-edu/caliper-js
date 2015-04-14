/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var MediaObject = require('./mediaObject');
var MediaObjectType = require('./mediaObjectType');

/**
 * Represents Audio Object.  
 * AudioObject's prototype set to MediaObject
 * @constructor
 * @param {string} id URI
 * @extends MediaObject 
 */
function AudioObject(id) {

  MediaObject.call(this);

  this.setId(id);
  this.setType(MediaObjectType.AUDIO_OBJECT);

}

AudioObject.prototype = _.create(MediaObject.prototype);

module.exports = AudioObject;
