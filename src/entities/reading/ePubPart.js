/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('../digitalResource');
var DigitalResourceType = require('../digitalResourceType');

/**
 * Represents ePubPart.
 * ePubPart's prototype set to DigitalResource
 * @constructor
 * @param {string} id URI
 * @extends DigitalResource
 */
function EPubPart(id) {

    DigitalResource.call(this);

    this.setId(id);
    this.setType(DigitalResourceType.EPUB_PART);

}

EPubPart.prototype = _.create(DigitalResource.prototype);

module.exports = ePubPart;