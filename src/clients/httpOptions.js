/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

/**
 * Partial set of HTTP options available for use with the request module (https://www.npmjs.com/package/request)
 * uri                        <string> | <Object> fully qualified uri or a parsed url object from url.parse()
 * method                     <string> HTTP method
 * headers                    <Object> HTTP Request headers
 * headers["Authorization"]   <string> Endpoint authorization key value.
 * headers["Content-Type"]    <string> Message content type.
 * headers["Content-Length"]  <number> Message length in decimal number of OCTETs per RFC 2616
 * body                       <string> | <Buffer> | <ReadStream> Entity body of POST request. Must be a Buffer. If json
 *                            is true, then body must be a JSON-serializable object.
 * json                       <boolean> sets body to JSON representation of value and adds
 *                            Content-type: application/json header. Additionally, parses the response body as JSON.
 * jsonReplacer               <Function> a replacer function that will be passed to JSON.stringify() when
 *                            stringifying a JSON request body.
 * timeout                    <integer> the number of milliseconds to wait for a server to send response headers
 *                           (and start the response body) before aborting the request.
 */
var options = {
  uri: null,
  method: "POST",
  headers: {
    "Authorization": null,
    "Content-Length": null,
    "Content-Type": "application/json"
  },
  body: null,
  timeout: 10000
};

module.exports = options;