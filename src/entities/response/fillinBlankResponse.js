/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Response = require('./response');
var ResponseType = require ('./responseType');

/**
 * Represents FillinBlankResponse.
 * FillinBlankResponse's prototype set to Response
 * @constructor
 * @param {string} id URI
 * @property {Object[]} values Array of response values
 * @extends Response
 */
function FillinBlankResponse(id) {

    Response.call(this);

    this.setId(id);
    this.setType(ResponseType.type.FILLINBLANK);

}

FillinBlankResponse.prototype = _.create(Response.prototype);

FillinBlankResponse.prototype.setValues = function (values) {
    this.values = values;
};

module.exports = FillinBlankResponse;