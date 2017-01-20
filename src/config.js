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
 * Configuration options
 * dataFormat:          Default value is JSON-LD.
 * dataVersion:                 Caliper version for Envelope data.
 * remoteCaliperJsonldContext:  Versioned Caliper remote context IRI.
 * sensorId:                    REPLACE default with a unique IRI/URI identifier for this sensor.
 * testFixturesBaseDirectory:         Base directory for test fixtures.
 * uuidVersion:                 UUID versions 1 and 4 supported.
 */
var Config = {
  dataFormat: "JSON-LD",
  dataVersion: "http://purl.imsglobal.org/ctx/caliper/v1p1",
  sensorId: "https://example.org/caliper/sensor/1",
  remoteCaliperJsonldContext: "http://purl.imsglobal.org/ctx/caliper/v1p1",
  testFixturesBaseDirectory: "../caliper-common-fixtures/src/test/resources/fixtures/",
  uuidVersion: 4
};

module.exports = Config;