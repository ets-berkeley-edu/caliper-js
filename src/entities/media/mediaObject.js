/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('../digitalResource');
var DigitalResourceType = require('../digitalResourceType');

/**
 * Represents Media Object.  
 * MediaObject's prototype set to DigitalResource
 * @constructor
 * @param {string} id URI
 * @param {string} type Type
 * @property {string} duration The format is expected to be PnYnMnDTnHnMnS
 * @extends DigitalResource
 */
function MediaObject(id) {

    DigitalResource.call(this);

    this.setId(id);
    this.setType(DigitalResourceType.MEDIA_OBJECT);

    this.setName(null);
    this.setDescription(null);
    this.setExtensions({});
    this.setObjectType([]);
    this.setAlignedLearningObjective([]);
    this.setKeywords([]);
    this.setIsPartOf(null);
    this.setDatePublished(null);
    this.setVersion(null);

}

MediaObject.prototype = _.create(DigitalResource.prototype);

MediaObject.prototype.setDuration = function (duration) {
  this.duration = duration;
};

module.exports = MediaObject;