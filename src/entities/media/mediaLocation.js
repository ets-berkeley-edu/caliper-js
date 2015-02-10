/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('./mediaObject');

function MediaLocation(id, type) {

  Entity.call(this);

  this.setId(id);
  this.setType(this.Types.MEDIA_LOCATION);

  this.setName(null);
  this.setProperties({});
}

MediaLocation.prototype = _.create(Entity.prototype);

MediaLocation.prototype.setCurrentTime = function (currentTime) {
  this.currentTime = currentTime;
};

module.exports = MediaLocation;
