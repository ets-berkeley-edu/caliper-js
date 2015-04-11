/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('./mediaObject');
var MediaObjectType = require('./mediaObjectType');

/**
 * Represents Media Location.  
 * MediaLocation's prototype set to MediaObject
 * @constructor
 * @param {string} id URI
 * @param {string} type Type
 * @property {string} currentTime String representing current time
 * @extends MediaObject
 */
function MediaLocation(id, type) {

  Entity.call(this);

  this.setId(id);
  this.setType(MediaObjectType.type.MEDIA_LOCATION);

  /**
  this.setName(null);
  this.setDescription(null);
  this.setExtensions({});
   */

}

MediaLocation.prototype = _.create(Entity.prototype);

MediaLocation.prototype.setCurrentTime = function (currentTime) {
  this.currentTime = currentTime;
};

module.exports = MediaLocation;
