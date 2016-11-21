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

var _ = require('lodash');
var constants = require('../constants');
var validator = require('../validator');

/**
 * Check @context value.
 * @param entity
 * @param opts
 * @returns {*}
 */
module.exports.checkContext = function checkContext(entity, opts) {
  return validator.checkContext(entity, opts);
};

/**
 * TODO STUB - WEAK; CHECK FOR IRI
 * @param id
 * @returns {*}
 */
module.exports.checkId = function checkId(opts) {
  return validator.checkId(opts, constants.ENTITY);
};

/**
 * Check type value.
 * @param entity
 * @param opts
 * @returns {*}
 */
module.exports.checkType = function checkType(entity, opts) {
  return validator.checkType(entity, opts, constants.ENTITY);
};

/**
 * Check for top-level user-defined custom Entity properties against linked entity own and inherited
 * enumerable property keys (using _.keysIn()) and move custom properties to Entity.extensions. Use the
 * good 'ole for loop in preference to the for..in loop in order to avoid iterating over both enumerable
 * and inherited properties of the opts object.
 * @param entity
 * @param opts
 * @returns {*}
 */
module.exports.moveToExtensions = function moveToExtensions(entity, opts) {
  return validator.moveToExtensions(entity, opts);
};