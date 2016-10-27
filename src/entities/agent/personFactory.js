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
// var agent = require('./agent');
var entity = require('../entity');
var agent = require('./agentFactory');
var constants = require('../../constants');
var entityType = require('../entityType');

/**
 * Factory Function
 * @param id
 * @param opts
 */
 var Person = function person() {
   var type = { "@type": entityType.PERSON };

   return {
     create: function create(id, opts) {
       var id = { "@id": id || "_" };
       var options = _.assign(opts, id, type) || _.assign({}, id, type);

       return _.assign(_.create(agent().create(id)), options);
     }
   };
 };

module.exports = Person;