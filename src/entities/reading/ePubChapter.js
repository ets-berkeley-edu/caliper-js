/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('../digitalResource');
var DigitalResourceType = require('../digitalResourceType');

/**
 * Represents ePubChapter.
 * ePubChapter's prototype set to DigitalResource
 * @constructor
 * @param {string} id URI
 * @extends DigitalResource
 */
function EPubChapter(id) {

    DigitalResource.call(this);

    this.setId(id);
    this.setType(DigitalResourceType.EPUB_CHAPTER);

}

EPubChapter.prototype = _.create(DigitalResource.prototype);

module.exports = ePubChapter;