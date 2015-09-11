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
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');

var Event = require('../src/events/sessionEvent');

// Actor
var Person = require('../src/entities/agent/person');

// Action
var SessionActions = require('../src/actions/sessionActions');

// Activity Context
var EPubVolume = require('../src/entities/reading/ePubVolume');
var Frame = require('../src/entities/reading/frame');
var Session = require('../src/entities/session/session');

// Learning Context
var CourseOffering = require('../src/entities/lis/courseOffering');
var CourseSection = require('../src/entities/lis/courseSection');
var Group = require('../src/entities/lis/group');
var Membership = require('../src/entities/lis/membership');
var Role = require('../src/entities/lis/role');
var SoftwareApplication = require('../src/entities/agent/softwareApplication');
var Status = require('../src/entities/lis/status');

test('Create Session TIMEOUT Event and validate attributes', function(t) {

    // Plan for N assertions
    t.plan(1);

    // The actor
    var actor = new SoftwareApplication("https://example.com/viewer");
    actor.setName("ePub");
    actor.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    actor.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The Action for the Caliper Event
    var action = SessionActions.TIMED_OUT;

    // The session actor
    var sessionActor = new Person("https://example.edu/user/554433");
    sessionActor.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    sessionActor.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // The target session
    var eventObj = new Session("https://example.com/viewer/session-123456789");
    eventObj.setName("session-123456789");
    eventObj.setDescription(null);
    eventObj.setActor(sessionActor);
    eventObj.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    eventObj.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());
    eventObj.setStartedAtTime((new Date("2015-09-15T10:15:00Z")).toISOString());
    eventObj.setEndedAtTime((new Date("2015-09-15T11:05:00Z")).toISOString());
    eventObj.setDuration("PT3000S");

    var generated = null;

    // The edApp that is part of the Learning Context
    var edApp = actor;

    // LIS Course Offering
    var courseOffering = new CourseOffering("https://example.edu/politicalScience/2015/american-revolution-101");
    courseOffering.setName("Political Science 101: The American Revolution");
    courseOffering.setCourseNumber("POL101");
    courseOffering.setAcademicSession("Fall-2015");
    courseOffering.setSubOrganizationOf(null);
    courseOffering.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseOffering.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Course Section
    var courseSection = new CourseSection(courseOffering['@id'] + "/section/001");
    courseSection.setName("American Revolution 101");
    courseSection.setCourseNumber("POL101");
    courseSection.setAcademicSession("Fall-2015");
    courseSection.setSubOrganizationOf(courseOffering);
    courseSection.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());
    courseSection.setDateModified((new Date("2015-09-02T11:30:00Z")).toISOString());

    // LIS Group
    var group = new Group(courseSection['@id'] + "/group/001");
    group.setName("Discussion Group 001");
    group.setSubOrganizationOf(courseSection);
    group.setDateCreated((new Date("2015-08-01T06:00:00Z")).toISOString());

    // Assert that key attributes are the same
    var event = new Event();
    event.setActor(actor);
    event.setAction(action);
    event.setObject(eventObj);
    event.setGenerated(generated);
    event.setEventTime((new Date("2015-09-15T10:15:00Z")).toISOString());
    event.setEdApp(edApp);
    event.setGroup(group);
    event.setMembership(null);

    console.log("Session Event = " + util.inspect(event));

    // Assert that JSON produced is the same
    jsonCompare('caliperSessionTimeoutEvent', event, t);
});