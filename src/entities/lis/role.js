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

var role = {
  "LEARNER": "http://purl.imsglobal.org/vocab/lis/v2/membership#Learner",
  "EXTERNAL_LEARNER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#ExternalLearner",
  "GUEST_LEARNER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#GuestLearner",
  "LEARNER_INSTRUCTOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#Instructor",
  "LEARNER_LEARNER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#Learner",
  "NONCREDIT_LEARNER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Learner#NonCreditLearner",

  "INSTRUCTOR": "http://purl.imsglobal.org/vocab/lis/v2/membership#Instructor",
  "EXTERNAL_INSTRUCTOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#ExternalInstructor",
  "GUEST_INSTRUCTOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#GuestInstructor",
  "LECTURER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#Lecturer",
  "PRIMARY_INSTRUCTOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor#PrimaryInstructor",

  "ADMINISTRATOR": "http://purl.imsglobal.org/vocab/lis/v2/membership#Administrator",
  "ADMINISTRATOR_ADMINISTRATOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#Administrator",
  "ADMINISTRATOR_DEVELOPER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#Developer",
  "ADMINISTRATOR_SUPPORT": "http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#Support",
  "ADMINISTRATOR_SYSTEM_ADMINISTRATOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#SystemAdministrator",

  "ADMINISTRATOR_EXTERNAL_DEVELOPER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#ExternalSupport",
  "ADMINISTRATOR_EXTERNAL_SUPPORT": "http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#ExternalDeveloper",
  "ADMINISTRATOR_EXTERNAL_SYSTEM_ADMINISTRATOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator#ExternalSystemAdministrator",

  "CONTENT_DEVELOPER": "http://purl.imsglobal.org/vocab/lis/v2/membership#ContentDeveloper",
  "CONTENT_DEVELOPER_CONTENT_DEVELOPER": "http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#ContentDeveloper",
  "CONTENT_DEVELOPER_LIBRARIAN": "http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#Librarian",
  "CONTENT_DEVELOPER_CONTENT_EXPERT": "http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#ContentExpert",
  "CONTENT_DEVELOPER_EXTERNAL_CONTENT_EXPERT": "http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper#ExternalContentExpert",

  "MANAGER": "http://purl.imsglobal.org/vocab/lis/v2/membership#Manager",
  "MANAGER_AREA_MANAGER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#AreaManager",
  "MANAGER_COURSE_COORDINATOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#CourseCoordinator",
  "MANAGER_OBSERVER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#Observer",
  "MANAGER_EXTERNAL_OBSERVER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Manager#ExternalObserver",

  "MEMBER": "http://purl.imsglobal.org/vocab/lis/v2/membership#Member",
  "MEMBER_MEMBER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Member#Member",

  "MENTOR": "http://purl.imsglobal.org/vocab/lis/v2/membership#Mentor",
  "MENTOR_MENTOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Mentor",
  "MENTOR_ADVISOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Advisor",
  "MENTOR_AUDITOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Auditor",
  "MENTOR_REVIEWER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Reviewer",
  "MENTOR_TUTOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#Tutor",
  "MENTOR_LEARNING_FACILITATOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#LearningFacilitator",

  "MENTOR_EXTERNAL_MENTOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalMentor",
  "MENTOR_EXTERNAL_ADVISOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalAdvisor",
  "MENTOR_EXTERNAL_AUDITOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalAuditor",
  "MENTOR_EXTERNAL_REVIEWER": "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalReviewer",
  "MENTOR_EXTERNAL_TUTOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor#ExternalTutor",
  "MENTOR_EXTERNAL_LEARNING_FACILITATOR": "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor/ExternalLearningFacilitator",

  "TEACHING_ASSISTANT": "http://purl.imsglobal.org/vocab/lis/v2/membership#TeachingAssistant",
  "TEACHING_ASSISTANT_TEACHING_ASSISTANT": "http://purl.imsglobal.org/vocab/lis/v2/membership/TeachingAssistant#TeachingAssistant",
  "TEACHING_ASSISTANT_GRADER": "http://purl.imsglobal.org/vocab/lis/v2/membership/TeachingAssistant#Grader",
  "TEACHING_ASSISTANT_TEACHING_ASSISTANT_SECTION": "http://purl.imsglobal.org/vocab/lis/v2/membership/TeachingAssistant#TeachingAssistantSection",
  "TEACHING_ASSISTANT_TEACHING_ASSISTANT_SECTION_ASSOCIATION": "http://purl.imsglobal.org/vocab/lis/v2/membership/TeachingAssistant#TeachingAssistantSectionAssociation",
  "TEACHING_ASSISTANT_TEACHING_ASSISTANT_OFFERING": "http://purl.imsglobal.org/vocab/lis/v2/membership/TeachingAssistant#TeachingAssistantOffering",
  "TEACHING_ASSISTANT_TEACHING_ASSISTANT_TEMPLATE": "http://purl.imsglobal.org/vocab/lis/v2/membership/TeachingAssistant#TeachingAssistantTemplate",
  "TEACHING_ASSISTANT_TEACHING_ASSISTANT_GROUP": "http://purl.imsglobal.org/vocab/lis/v2/membership/TeachingAssistant#TeachingAssistantGroup"
};

module.exports = role;