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


var level = process.argv.indexOf('--log') === -1 ? 6 : 7;
var logger = require('caterpillar').create({ level: level });
var filter = require('caterpillar-filter').create();
var human = require('caterpillar-human').create();

// Pipe to filter to human to stdout
// logger.pipe(filter).pipe(human).pipe(process.stdout);

// If debugging write logger data to debug.log
if (level === 7) {
  logger.pipe(require('fs').createWriteStream('caliper_js-debug.log'));
}

// Export
module.exports = {
  logger: logger,
  log: logger.log.bind(logger)
};
