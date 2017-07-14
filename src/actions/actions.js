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
    iri: "http://purl.imsglobal.org/caliper/actions/Added",
    events: ["event"]},
  abandoned: {
    term: "Abandoned",
    iri: "http://purl.imsglobal.org/caliper/actions/Abandoned",
    events: ["event", "assignableEvent"]
  },
  activated: {
    term: "Activated",
    iri: "http://purl.imsglobal.org/caliper/actions/Activated",
    events: ["event", "assignableEvent"]
  },
  attached: {
    term: "Attached",
    iri: "http://purl.imsglobal.org/caliper/actions/Attached",
    events: ["event"]},
  bookmarked: {
    term: "Bookmarked",
    iri: "http://purl.imsglobal.org/caliper/actions/Bookmarked",
    events: ["event", "annotationEvent"]
  },
  changedResolution: {
    term: "ChangedResolution",
    iri: "http://purl.imsglobal.org/caliper/actions/ChangedResolution",
    events: ["event", "mediaEvent"]
  },
  changedSize: {
    term: "ChangedSize",
    iri: "http://purl.imsglobal.org/caliper/actions/ChangedSize",
    events: ["event", "mediaEvent"]
  },
  changedSpeed: {
    term: "ChangedSpeed",
    iri: "http://purl.imsglobal.org/caliper/actions/ChangedSpeed",
    events: ["event", "mediaEvent"]
  },
  changedVolume: {
    term: "ChangedVolume",
    iri: "http://purl.imsglobal.org/caliper/actions/ChangedVolume",
    events: ["event", "mediaEvent"]
  },
  classified: {
    term: "Classified",
    iri: "http://purl.imsglobal.org/caliper/actions/Classified",
    events: ["event"]},
  closedPopout: {
    term: "ClosedPopout",
    iri: "http://purl.imsglobal.org/caliper/actions/ClosedPopout",
    events: ["event", "mediaEvent"]
  },
  commented: {
    term: "Commented",
    iri: "http://purl.imsglobal.org/caliper/actions/Commented",
    events: ["event"]},
  completed: {
    term: "Completed",
    iri: "http://purl.imsglobal.org/caliper/actions/Completed",
    events: ["event", "assessmentItemEvent", "assignableEvent"]
  },
  created: {
    term: "Created",
    iri: "http://purl.imsglobal.org/caliper/actions/Created",
    events: ["event"]},
  deactivated: {
    term: "Deactivated",
    iri: "http://purl.imsglobal.org/caliper/actions/Deactivated",
    events: ["event", "assignableEvent"]
  },
  deleted: {
    term: "Deleted",
    iri: "http://purl.imsglobal.org/caliper/actions/Deleted",
    events: ["event"]},
  described: {
    term: "Described",
    iri: "http://purl.imsglobal.org/caliper/actions/Described",
    events: ["event"]},
  disabledCloseCaptioning: {
    term: "DisabledCloseCaptioning",
    iri: "http://purl.imsglobal.org/caliper/actions/DisabledCloseCaptioning",
    events: ["event", "mediaEvent"]
  },
  disliked: {
    term: "Disliked",
    iri: "http://purl.imsglobal.org/caliper/actions/Disliked",
    events: ["event"]
  },
  enabledCloseCaptioning: {
    term: "EnabledCloseCaptioning",
    iri: "http://purl.imsglobal.org/caliper/actions/EnabledCloseCaptioning",
    events: ["event", "mediaEvent"]
  },
  ended: {
    term: "Ended",
    iri: "http://purl.imsglobal.org/caliper/actions/Ended",
    events: ["event", "mediaEvent"]},
  enteredFullScreen: {
    term: "EnteredFullScreen",
    iri: "http://purl.imsglobal.org/caliper/actions/EnteredFullScreen",
    events: ["event", "mediaEvent"]
  },
  exitedFullScreen: {
    term: "ExitedFullScreen",
    iri: "http://purl.imsglobal.org/caliper/actions/ExitedFullScreen",
    events: ["event", "mediaEvent"]
  },
  forwardedTo: {
    term: "ForwardedTo",
    iri: "http://purl.imsglobal.org/caliper/actions/ForwardedTo",
    events: ["event", "mediaEvent"]
  },
  graded: {
    term: "Graded",
    iri: "http://purl.imsglobal.org/caliper/actions/Graded",
    events: ["event", "outcomeEvent"]},
  hid: {
    term: "Hid",
    iri: "http://purl.imsglobal.org/caliper/actions/Hid",
    events: ["event", "assignableEvent"]},
  highlighted: {
    term: "Highlighted",
    iri: "http://purl.imsglobal.org/caliper/actions/Highlighted",
    events: ["event", "annotationEvent"]
  },
  identified: {
    term: "Identified",
    iri: "http://purl.imsglobal.org/caliper/actions/Identified",
    events: ["event"]},
  jumpedTo: {
    term: "JumpedTo",
    iri: "http://purl.imsglobal.org/caliper/actions/JumpedTo",
    events: ["event", "mediaEvent"]},
  liked: {
    term: "Liked",
    iri: "http://purl.imsglobal.org/caliper/actions/Liked",
    events: ["event"]},
  linked: {
    term: "Linked",
    iri: "http://purl.imsglobal.org/caliper/actions/Linked",
    events: ["event"]},
  loggedIn: {
    term: "LoggedIn",
    iri: "http://purl.imsglobal.org/caliper/actions/LoggedIn",
    events: ["event", "sessionEvent"]
  },
  loggedOut: {
    term: "LoggedOut",
    iri: "http://purl.imsglobal.org/caliper/actions/LoggedOut",
    events: ["event", "sessionEvent"]
  },
  markedAsRead: {
    term: "MarkedAsRead",
    iri: "http://purl.imsglobal.org/caliper/actions/MarkedAsRead",
    events: ["event", "messageEvent", "threadEvent"]
  },
  markedAsUnread: {
    term: "MarkedAsUnread",
    iri: "http://purl.imsglobal.org/caliper/actions/MarkedAsUnread",
    events: ["event", "messageEvent", "threadEvent"]
  },
  modified: {
    term: "Modified",
    iri: "http://purl.imsglobal.org/caliper/actions/Modified",
    events: ["event"]},
  muted: {
    term: "Muted",
    iri: "http://purl.imsglobal.org/caliper/actions/Muted",
    events: ["event", "mediaEvent"]},
  navigatedTo: {
    term: "NavigatedTo",
    iri: "http://purl.imsglobal.org/caliper/actions/NavigatedTo",
    events: ["event", "navigationEvent"]
  },
  openedPopout: {
    term: "OpenedPopout",
    iri: "http://purl.imsglobal.org/caliper/actions/OpenedPopout",
    events: ["event", "mediaEvent"]
  },
  paused: {
    term: "Paused",
    iri: "http://purl.imsglobal.org/caliper/actions/Paused",
    events: ["event", "assessmentEvent", "mediaEvent"]
  },
  posted: {
    term: "Posted",
    iri: "http://purl.imsglobal.org/caliper/actions/Posted",
    events: ["event", "messageEvent"]},
  questioned: {
    term: "Questioned",
    iri: "http://purl.imsglobal.org/caliper/actions/Questioned",
    events: ["event"]},
  ranked: {
    term: "Ranked",
    iri: "http://purl.imsglobal.org/caliper/actions/Ranked",
    events: ["event"]},
  recommended: {
    term: "Recommended",
    iri: "http://purl.imsglobal.org/caliper/actions/Recommended",
    events: ["event"]},
  removed: {
    term: "Removed",
    iri: "http://purl.imsglobal.org/caliper/actions/Removed",
    events: ["event"]},
  reset: {
    term: "Reset",
    iri: "http://purl.imsglobal.org/caliper/actions/Reset",
    events: ["event", "assessmentEvent"]},
  restarted: {
    term: "Restarted",
    iri: "http://purl.imsglobal.org/caliper/actions/Restarted",
    events: ["event", "assessmentEvent", "mediaEvent"]
  },
  resumed: {
    term: "Resumed",
    iri: "http://purl.imsglobal.org/caliper/actions/Resumed",
    events: ["event", "assessmentEvent", "mediaEvent"]},
  retrieved: {
    term: "Retrieved",
    iri: "http://purl.imsglobal.org/caliper/actions/Retrieved",
    events: ["event"]},
  reviewed: {
    term: "Reviewed",
    iri: "http://purl.imsglobal.org/caliper/actions/Reviewed",
    events: ["event", "assignableEvent"]
  },
  rewound: {
    term: "Rewound",
    iri: "http://purl.imsglobal.org/caliper/actions/Rewound",
    events: ["event", "mediaEvent"]},
  searched: {
    term: "Searched",
    iri: "http://purl.imsglobal.org/caliper/actions/Searched",
    events: ["event"]},
  shared: {
    term: "Shared",
    iri: "http://purl.imsglobal.org/caliper/actions/Shared",
    events: ["event", "annotationEvent"]},
  showed: {
    term: "Showed",
    iri: "http://purl.imsglobal.org/caliper/actions/Showed",
    events: ["event", "assignableEvent"]},
  skipped: {
    term: "Skipped",
    iri: "http://purl.imsglobal.org/caliper/actions/Skipped",
    events: ["event", "assessmentItemEvent"]
  },
  started: {
    term: "Started",
    iri: "http://purl.imsglobal.org/caliper/actions/Started",
    events: ["event", "assessmentEvent", "assessmentItemEvent", "assignableEvent", "mediaEvent"]
  },
  submitted: {
    term: "Submitted",
    iri: "http://purl.imsglobal.org/caliper/actions/Submitted",
    events: ["event", "assessmentEvent", "assignableEvent"]
  },
  subscribed: {
    term: "Subscribed",
    iri: "http://purl.imsglobal.org/caliper/actions/Subscribed",
    events: ["event", "forumEvent"]
  },
  tagged: {
    term: "Tagged",
    iri: "http://purl.imsglobal.org/caliper/actions/Tagged",
    events: ["event", "annotationEvent"]},
  timedOut: {
    term: "TimedOut",
    iri: "http://purl.imsglobal.org/caliper/actions/TimedOut",
    events: ["event", "sessionEvent"]
  },
  unmuted: {
    term: "Unmuted",
    iri: "http://purl.imsglobal.org/caliper/actions/Unmuted",
    events: ["event", "mediaEvent"]},
  unsubscribed: {
    term: "Unsubscribed",
    iri: "http://purl.imsglobal.org/caliper/actions/Unsubscribed",
    events: ["event", "forumEvent"]
  },
  used: {
    term: "Used",
    iri: "http://purl.imsglobal.org/caliper/actions/Used",
    events: ["event", "toolUseEvent"]
  },
  viewed: {
    term: "Viewed",
    iri: "http://purl.imsglobal.org/caliper/actions/Viewed",
    events: ["event", "viewEvent"]}
};

module.exports = actions;