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
 * Configuration values employed as default options.
 * dataFormat:                    Default value is JSON-LD.
 * dataVersion:                   Caliper version for Envelope data.
 * jsonldContext:                 Versioned Caliper remote context IRI.
 * testFixturesBaseDir:           Base directory for test fixtures.
 * uuidVersion:                   UUID versions 1 and 4 supported.
 */
var Config = {
  dataFormat: "JSON-LD",
  dataVersion: "http://purl.imsglobal.org/ctx/caliper/v1p1",
  dateTimeFormat: "YYYY-MM-DDTHH:mm:ss.SSSZ",
  jsonldContext: {
    v1p0: "http://purl.imsglobal.org/ctx/caliper/v1/Context",
    v1p1: "http://purl.imsglobal.org/ctx/caliper/v1p1",
    v1p1_toollaunch: "http://purl.imsglobal.org/ctx/caliper/v1p1/ToolLaunchProfile-extension",
    v1p2: "https://purl.imsglobal.org/caliper/v1p2/context/Core"
  },
  testFixturesBaseDir: {
    v1p0: "../caliper-common-fixtures/v1p0/",
    v1p1: "../caliper-common-fixtures/v1p1/",
    v1p2: "../caliper-common-fixtures/v1p2/"
  },
  uuidVersion: 4
};

module.exports = Config;