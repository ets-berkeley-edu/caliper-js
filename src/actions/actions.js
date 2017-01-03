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
 * Actions
 */
var actions = {
  added: {
    term: "Added",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Added",
    events: []},
  abandoned: {
    term: "Abandoned",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Abandoned",
    events: ["assignableEvent"]
  },
  activated: {
    term: "Activated",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Activated",
    events: ["assignableEvent"]
  },
  attached: {
    term: "Attached",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Attached",
    events: []},
  bookmarked: {
    term: "Bookmarked",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Bookmarked",
    events: ["annotationEvent"]
  },
  changedResolution: {
    term: "ChangedResolution",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#ChangedResolution",
    events: ["mediaEvent"]
  },
  changedSize: {
    term: "ChangedSize",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#ChangedSize",
    events: ["mediaEvent"]
  },
  changedSpeed: {
    term: "ChangedSpeed",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#ChangedSpeed",
    events: ["mediaEvent"]
  },
  changedVolume: {
    term: "ChangedVolume",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#ChangedVolume",
    events: ["mediaEvent"]
  },
  classified: {
    term: "Classified",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Classified",
    events: []},
  closedPopout: {
    term: "ClosedPopout",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#ClosedPopout",
    events: ["mediaEvent"]
  },
  commented: {
    term: "Commented",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Commented",
    events: []},
  completed: {
    term: "Completed",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Completed",
    events: ["assessmentItemEvent", "assignableEvent"]
  },
  created: {
    term: "Created",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Created",
    events: []},
  deactivated: {
    term: "Deactivated",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Deactivated",
    events: ["assignableEvent"]
  },
  deleted: {
    term: "Deleted",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Deleted",
    events: []},
  described: {
    term: "Described",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Described",
    events: []},
  disabledCloseCaptioning: {
    term: "DisabledCloseCaptioning",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#DisabledCloseCaptioning",
    events: ["mediaEvent"]
  },
  disliked: {
    term: "Disliked",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Disliked",
    events: []},
  enabledCloseCaptioning: {
    term: "EnabledCloseCaptioning",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#EnabledCloseCaptioning",
    events: ["mediaEvent"]
  },
  ended: {
    term: "Ended",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Ended",
    events: ["mediaEvent"]},
  enteredFullScreen: {
    term: "EnteredFullScreen",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#EnteredFullScreen",
    events: ["mediaEvent"]
  },
  exitedFullScreen: {
    term: "ExitedFullScreen",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#ExitedFullScreen",
    events: ["mediaEvent"]
  },
  forwardedTo: {
    term: "ForwardedTo",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#ForwardedTo",
    events: ["mediaEvent"]
  },
  graded: {
    term: "Graded",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Graded",
    events: ["outcomeEvent"]},
  hid: {
    term: "Hid",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Hid",
    events: ["assignableEvent"]},
  highlighted: {
    term: "Highlighted",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Highlighted",
    events: ["annotationEvent"]
  },
  identified: {
    term: "Identified",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Identified",
    events: []},
  jumpedTo: {
    term: "JumpedTo",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#JumpedTo",
    events: ["mediaEvent"]},
  liked: {
    term: "Liked",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Liked",
    events: []},
  linked: {
    term: "Linked",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Linked",
    events: []},
  loggedIn: {
    term: "LoggedIn",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#LoggedIn",
    events: ["sessionEvent"]
  },
  loggedOut: {
    term: "LoggedOut",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#LoggedOut",
    events: ["sessionEvent"]
  },
  markedAsRead: {
    term: "MarkedAsRead",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#MarkedAsRead",
    events: ["messageEvent", "threadEvent"]
  },
  markedAsUnread: {
    term: "MarkedAsUnread",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#MarkedAsUnread",
    events: ["messageEvent", "threadEvent"]
  },
  modified: {
    term: "Modified",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Modified",
    events: []},
  muted: {
    term: "Muted",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Muted",
    events: ["mediaEvent"]},
  navigatedTo: {
    term: "NavigatedTo",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#NavigatedTo",
    events: ["navigationEvent"]
  },
  openedPopout: {
    term: "OpenedPopout",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#OpenedPopout",
    events: ["mediaEvent"]
  },
  paused: {
    term: "Paused",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Paused",
    events: ["assessmentEvent", "mediaEvent"]
  },
  posted: {
    term: "Posted",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Posted",
    events: ["messageEvent"]},
  questioned: {
    term: "Questioned",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Questioned",
    events: []},
  ranked: {
    term: "Ranked",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Ranked",
    events: []},
  recommended: {
    term: "Recommended",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Recommended",
    events: []},
  removed: {
    term: "Removed",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Removed",
    events: []},
  reset: {
    term: "Reset",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Reset",
    events: []},
  restarted: {
    term: "Restarted",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Restarted",
    events: ["assessmentEvent"]
  },
  resumed: {
    term: "Resumed",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Resumed",
    events: ["mediaEvent"]},
  retrieved: {
    term: "Retrieved",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Retrieved",
    events: []},
  reviewed: {
    term: "Reviewed",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Reviewed",
    events: ["assignableEvent"]
  },
  rewound: {
    term: "Rewound",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Rewound",
    events: ["mediaEvent"]},
  searched: {
    term: "Searched",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Searched",
    events: []},
  shared: {
    term: "Shared",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Shared",
    events: ["annotationEvent"]},
  showed: {
    term: "Showed",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Showed",
    events: ["assignableEvent"]},
  skipped: {
    term: "Skipped",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Skipped",
    events: ["assessmentItemEvent"]
  },
  started: {
    term: "Started",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Started",
    events: ["assessmentEvent", "assessmentItemEvent", "assignableEvent", "mediaEvent"]
  },
  submitted: {
    term: "Submitted",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Submitted",
    events: ["assessmentEvent", "assignableEvent"]
  },
  subscribed: {
    term: "Subscribed",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Subscribed",
    events: ["forumEvent"]
  },
  tagged: {
    term: "Tagged",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Tagged",
    events: ["annotationEvent"]},
  timedOut: {
    term: "TimedOut",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#TimedOut",
    events: ["sessionEvent"]
  },
  unmuted: {
    term: "Unmuted",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Unmuted",
    events: ["mediaEvent"]},
  unsubscribed: {
    term: "Unsubscribed",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Unsubscribed",
    events: ["forumEvent"]
  },
  viewed: {
    term: "Viewed",
    iri: "http://purl.imsglobal.org/vocab/caliper/action#Viewed",
    events: ["viewEvent"]}
};

module.exports = actions;