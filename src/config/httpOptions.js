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
 * Default HTTP options
 * agent                      <http.Agent> | <boolean> Controls Agent behavior. Possible values:
 *                              undefined (default): use http.globalAgent for this host and port.
 *                              Agent object: explicitly use the passed in Agent.
 *                              false: causes a new Agent with default values to be used.
 * auth                       <string> Basic authentication i.e. 'user:password' to compute an Authorization header.
 * createConnection           <Function> A function that produces a socket/stream to use for the request when the
 *                              agent option is not used. This can be used to avoid creating a custom Agent class
 *                              just to override the default createConnection function. See Node HTTP
 *                              agent.createConnection() for more details.
 * family                     <number> IP address family to use when resolving host and hostname. Valid values are
 *                              4 or 6.  When unspecified, both IP v4 and v6 will be used.
 * headers                    <Object> Request headers
 * headers.Authorization:     <string> Endpoint authorization key value.
 * headers["Content-Type"]:   <string> Message content type.
 * headers["Content-Length"]: <number> Message length in decimal number of OCTETs per RFC 2616
 * hostname:                  <string> Alias for host. To support Node HTTP module url.parse(), hostname is preferred
 *                              over host.
 * localAddress:              <string> Local interface to bind for network connections.
 * method:                    <string> Specifies the HTTP Request method.
 * path:                      <string> Request Path.
 * port:                      <number> Port of remote server.
 * protocol:                  <string> Protocol to use.
 * socketPath:                <string> Unix Domain Socket (use one of host:port or socketPath).
 * timeOut:                   <number> A number specifying the socket timeout in milliseconds. This will set the
 *                              timeout before the socket is connected.
 */
var httpOptions = {
  agent: null,
  auth: null,
  createConnection: null,
  family: null,
  headers: {
    "Authorization": null,
    "Content-Length": null,
    "Content-Type": "application/json"
  },
  hostname: null,
  localAddress: null,
  method: "POST",
  path: "/",
  port: 80,
  protocol: "http:",
  socketPath: null,
  timeOut: 10000
};

module.exports = httpOptions;