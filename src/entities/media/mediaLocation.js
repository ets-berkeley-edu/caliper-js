/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('../caliperEntity');

function MediaLocation(id, type) {

  Entity.call(this);

  this.setId(id);
  this.setType(this.Types.MEDIA_LOCATION);

  this.setProperties({});
}

MediaLocation.prototype = _.create(Entity.prototype);

MediaLocation.prototype.setCurrentTime = function (currentTime) {
  this.currentTime = currentTime;
};

module.exports = MediaLocation;
