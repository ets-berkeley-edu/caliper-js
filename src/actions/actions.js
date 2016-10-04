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
 * Enum representing all event actions.
 * @enum
 */
var actions = {
  "ABANDONED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Abandoned",
  "ACTIVATED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Activated",
  "ADDED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Added",
  "ATTACHED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Attached",
  "BOOKMARKED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Bookmarked",
  "CHANGED_RESOLUTION": "http://purl.imsglobal.org/vocab/caliper/v1/action#ChangedResolution",
  "CHANGED_SIZE": "http://purl.imsglobal.org/vocab/caliper/v1/action#ChangedSize",
  "CHANGED_SPEED": "http://purl.imsglobal.org/vocab/caliper/v1/action#ChangedSpeed",
  "CHANGED_VOLUME": "http://purl.imsglobal.org/vocab/caliper/v1/action#ChangedVolume",
  "CLASSIFIED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Classified",
  "CLOSED_POPOUT": "http://purl.imsglobal.org/vocab/caliper/v1/action#ClosedPopout",
  "COMMENTED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Commented",
  "COMPLETED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Completed",
  "CREATED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Created",
  "DEACTIVATED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Deactivated",
  "DELETED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Deleted",
  "DESCRIBED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Described",
  "DISABLED_CLOSED_CAPTIONING": "http://purl.imsglobal.org/vocab/caliper/v1/action#DisabledCloseCaptioning",
  "DISLIKED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Disliked",
  "ENABLED_CLOSE_CAPTIONING": "http://purl.imsglobal.org/vocab/caliper/v1/action#EnabledCloseCaptioning",
  "ENDED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Ended",
  "ENTERED_FULLSCREEN": "http://purl.imsglobal.org/vocab/caliper/v1/action#EnteredFullScreen",
  "EXITED_FULLSCREEN": "http://purl.imsglobal.org/vocab/caliper/v1/action#ExitedFullScreen",
  "FORWARDED_TO": "http://purl.imsglobal.org/vocab/caliper/v1/action#ForwardedTo",
  "GRADED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Graded",
  "HID": "http://purl.imsglobal.org/vocab/caliper/v1/action#Hid",
  "HIGHLIGHTED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Highlighted",
  "IDENTIFIED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Identified",
  "JUMPED_TO": "http://purl.imsglobal.org/vocab/caliper/v1/action#JumpedTo",
  "LIKED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Liked",
  "LINKED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Linked",
  "LOGGED_IN": "http://purl.imsglobal.org/vocab/caliper/v1/action#LoggedIn",
  "LOGGED_OUT": "http://purl.imsglobal.org/vocab/caliper/v1/action#LoggedOut",
  "MARKED_AS_READ": "http://purl.imsglobal.org/vocab/caliper/v1/action#MarkedAsRead",
  "MARKED_AS_UNREAD": "http://purl.imsglobal.org/vocab/caliper/v1/action#MarkedAsUnread",
  "MODIFIED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Modified",
  "MUTED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Muted",
  "NAVIGATED_TO": "http://purl.imsglobal.org/vocab/caliper/v1/action#NavigatedTo",
  "OPENED_POPOUT": "http://purl.imsglobal.org/vocab/caliper/v1/action#OpenedPopout",
  "PAUSED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Paused",
  "POSTED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Posted",
  "QUESTIONED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Questioned",
  "RANKED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Ranked",
  "RECOMMENDED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Recommended",
  "REMOVED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Removed",
  "RESET": "http://purl.imsglobal.org/vocab/caliper/v1/action#Reset",
  "RESTARTED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Restarted",
  "RESUMED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Resumed",
  "RETRIEVED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Retrieved",
  "REVIEWED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Reviewed",
  "REWOUND": "http://purl.imsglobal.org/vocab/caliper/v1/action#Rewound",
  "SEARCHED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Searched",
  "SHARED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Shared",
  "SHOWED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Showed",
  "SKIPPED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Skipped",
  "STARTED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Started",
  "SUBMITTED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Submitted",
  "SUBSCRIBED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Subscribed",
  "TAGGED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Tagged",
  "TIMED_OUT": "http://purl.imsglobal.org/vocab/caliper/v1/action#TimedOut",
  "UNMUTED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Unmuted",
  "UNSUBSCRIBED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Unsubscribed",
  "VIEWED": "http://purl.imsglobal.org/vocab/caliper/v1/action#Viewed"
};

module.exports = actions;