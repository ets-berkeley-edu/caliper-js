/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Response = require('./response');
var ResponseType = require('./responseType');

/**
 * Represents SelectTextResponse.
 * SelectTextResponse's prototype set to Response
 * @constructor
 * @param {string} id URI
 * @property {Object[]} values Array of response values
 * @extends Response
 */
function SelectTextResponse(id) {

    Response.call(this);

    this.setId(id);
    this.setType(ResponseType.SELECTTEXT);

}

SelectTextResponse.prototype = _.create(Response.prototype);

SelectTextResponse.prototype.setValues = function (values) {
    this.values = values;
};

module.exports = SelectTextResponse;