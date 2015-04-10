/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Response = require('./response');
var ResponseType = require('./responseType');

/**
 * Represents MultipleChoiceResponse.
 * MultipleChoiceResponse's prototype set to Response
 * @constructor
 * @param {string} id URI
 * @property {string} response value
 * @extends Response
 */
function MultipleChoiceResponse(id) {

    Response.call(this);

    this.setId(id);
    this.setType(ResponseType.type.MULTIPLECHOICE);

}

MultipleChoiceResponse.prototype = _.create(Response.prototype);

MultipleChoiceResponse.prototype.setValue = function (value) {
    this.value = value;
};

module.exports = MultipleChoiceResponse;