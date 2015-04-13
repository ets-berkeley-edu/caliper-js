/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Response = require('./response');
var ResponseType = require('./responseType');

/**
 * Represents MultipleResponseResponse.
 * MultipleResponseResponse's prototype set to Response
 * @constructor
 * @param {string} id URI
 * @property {Object[]} values Array of response values
 * @extends Response
 */
function MultipleResponseResponse(id) {

    Response.call(this);

    this.setId(id);
    this.setType(ResponseType.MULTIPLERESPONSE);

}

MultipleResponseResponse.prototype = _.create(Response.prototype);

MultipleResponseResponse.prototype.setValues = function (values) {
    this.values = values;
};

module.exports = MultipleResponseResponse;