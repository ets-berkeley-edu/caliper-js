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

var test = require('tape');

var config = require('../../src/config');
var eventValidator = require('../../src/events/eventValidator');
var eventUtils = require('../../src/events/eventUtils');

test('Confirm that a UUID is successfully generated and validated.', function (t) {

  const uuid = eventUtils.generateUUID(config.version);
  const actual = eventValidator.isUUID(uuid);

  t.plan(1);
  t.equal(true, actual, "Validate generated UUID.");
  //t.end();
});