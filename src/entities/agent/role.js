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

var config = require('../../config/config');

var BASE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership";
var ADMIN_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator";
var CONTENT_DEV_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper";
var INSTR_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor";
var LEARNER_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/Learner";
var MANAGER_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/Manager";
var MEMBER_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/Member";
var MENTOR_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor";
var TEACH_ASST_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/TeachingAssistant";

var role = {
  learner: {
    context: config.jsonldContext.v1p1,
    term: "Learner",
    iri: BASE_IRI + "#Learner"
  },
  learnerExternalLearner: {
    context: config.jsonldContext.v1p1,
    term: "Learner#ExternalLearner",
    iri: LEARNER_SUBROLE_IRI + "#ExternalLearner"
  },
  learnerGuestLearner: {
    context: config.jsonldContext.v1p1,
    term: "Learner#GuestLearner",
    iri: LEARNER_SUBROLE_IRI + "#GuestLearner"
  },
  learnerInstructor: {
    context: config.jsonldContext.v1p1,
    term: "Learner#Instructor",
    iri: LEARNER_SUBROLE_IRI + "#Instructor"
  },
  learnerLearner: {
    context: config.jsonldContext.v1p1,
    term: "Learner#Learner",
    iri: LEARNER_SUBROLE_IRI + "#Learner"
  },
  learnerNonCreditLearner: {
    context: config.jsonldContext.v1p1,
    term: "Learner#NonCreditLearner",
    iri: LEARNER_SUBROLE_IRI + "#NonCreditLearner"
  },
  instructor: {
    context: config.jsonldContext.v1p1,
    term: "Instructor",
    iri: BASE_IRI + "#Instructor"
  },
  instructorExternalInstructor: {
    context: config.jsonldContext.v1p1,
    term: "Instructor#ExternalInstructor",
    iri: INSTR_SUBROLE_IRI + "#ExternalInstructor"
  },
  instructorGuestInstructor: {
    context: config.jsonldContext.v1p1,
    term: "Instructor#GuestInstructor",
    iri: INSTR_SUBROLE_IRI + "#GuestInstructor"
  },
  instructorLecturer: {
    context: config.jsonldContext.v1p1,
    term: "Instructor#Lecturer",
    iri: INSTR_SUBROLE_IRI + "#Lecturer"
  },
  instructorPrimaryInstructor: {
    context: config.jsonldContext.v1p1,
    term: "Instructor#PrimaryInstructor",
    iri: INSTR_SUBROLE_IRI + "#PrimaryInstructor"
  },
  administrator: {
    context: config.jsonldContext.v1p1,
    term: "Administrator",
    iri: BASE_IRI + "#Administrator"
  },
  administratorAdministrator: {
    context: config.jsonldContext.v1p1,
    term: "Administrator#Administrator",
    iri: ADMIN_SUBROLE_IRI + "#Administrator"
  },
  administratorDeveloper: {
    context: config.jsonldContext.v1p1,
    term: "Administrator#Developer",
    iri: ADMIN_SUBROLE_IRI + "#Developer"
  },
  administratorSupport: {
    context: config.jsonldContext.v1p1,
    term: "Administrator#Support",
    iri: ADMIN_SUBROLE_IRI + "#Support"
  },
  administratorSystemAdministrator: {
    context: config.jsonldContext.v1p1,
    term: "Administrator#SystemAdministrator",
    iri: ADMIN_SUBROLE_IRI + "#SystemAdministrator"
  },
  administratorExternalDeveloper: {
    context: config.jsonldContext.v1p1,
    term: "Administrator#ExternalDeveloper",
    iri: ADMIN_SUBROLE_IRI + "#ExternalDeveloper"
  },
  administratorExternalSupport: {
    context: config.jsonldContext.v1p1,
    term: "Administrator#ExternalSupport",
    iri: ADMIN_SUBROLE_IRI + "#ExternalSupport"
  },
  administratorExternalSystemAdministrator: {
    context: config.jsonldContext.v1p1,
    term: "Administrator#ExternalSystemAdministrator",
    iri: ADMIN_SUBROLE_IRI + "#ExternalSystemAdministrator"
  },
  contentDeveloper: {
    context: config.jsonldContext.v1p1,
    term: "ContentDeveloper",
    iri: BASE_IRI + "#ContentDeveloper"
  },
  contentDeveloperContentDeveloper: {
    context: config.jsonldContext.v1p1,
    term: "ContentDeveloper#ContentDeveloper",
    iri: CONTENT_DEV_SUBROLE_IRI + "#ContentDeveloper"
  },
  contentDeveloperLibrarian: {
    context: config.jsonldContext.v1p1,
    term: "ContentDeveloper#Librarian",
    iri: CONTENT_DEV_SUBROLE_IRI + "#Librarian"
  },
  contentDeveloperContentExpert: {
    context: config.jsonldContext.v1p1,
    term: "ContentDeveloper#ContentExpert",
    iri: CONTENT_DEV_SUBROLE_IRI + "#ContentExpert"
  },
  contentDeveloperExternalContentExpert: {
    context: config.jsonldContext.v1p1,
    term: "ContentDeveloper#ExternalContentExpert",
    iri: CONTENT_DEV_SUBROLE_IRI + "#ExternalContentExpert"
  },
  manager: {
    context: config.jsonldContext.v1p1,
    term: "Manager",
    iri: BASE_IRI + "#Manager"
  },
  managerAreaManager: {
    context: config.jsonldContext.v1p1,
    term: "Manager#AreaManager",
    iri: MANAGER_SUBROLE_IRI + "#AreaManager"
  },
  managerCourseCoordinator: {
    context: config.jsonldContext.v1p1,
    term: "Manager#CourseCoordinator",
    iri: MANAGER_SUBROLE_IRI + "#CourseCoordinator"
  },
  managerObserver: {
    context: config.jsonldContext.v1p1,
    term: "Manager#Observer",
    iri: MANAGER_SUBROLE_IRI + "#Observer"
  },
  managerExternalObserver: {
    context: config.jsonldContext.v1p1,
    term: "Manager#ExternalObserver",
    iri: MANAGER_SUBROLE_IRI + "#ExternalObserver"
  },
  member: {
    context: config.jsonldContext.v1p1,
    term: "Member",
    iri: BASE_IRI + "#Member"
  },
  memberMember: {
    context: config.jsonldContext.v1p1,
    term: "Member#Member",
    iri: MEMBER_SUBROLE_IRI + "#Member"
  },
  mentor: {
    context: config.jsonldContext.v1p1,
    term: "Mentor",
    iri: BASE_IRI + "#Mentor"
  },
  mentorMentor: {
    context: config.jsonldContext.v1p1,
    term: "Mentor#Mentor",
    iri: MENTOR_SUBROLE_IRI + "#Mentor"
  },
  mentorAdvisor: {
    context: config.jsonldContext.v1p1,
    term: "Mentor#Advisor",
    iri: MENTOR_SUBROLE_IRI + "#Advisor"
  },
  mentorAuditor: {
    context: config.jsonldContext.v1p1,
    term: "Mentor#Auditor",
    iri: MENTOR_SUBROLE_IRI + "#Auditor"
  },
  mentorReviewer: {
    context: config.jsonldContext.v1p1,
    term: "Mentor#Reviewer",
    iri: MENTOR_SUBROLE_IRI + "#Reviewer"
  },
  mentorTutor: {
    context: config.jsonldContext.v1p1,
    term: "Mentor#Tutor",
    iri: MENTOR_SUBROLE_IRI + "#Tutor"
  },
  mentorLearningFacilitator: {
    context: config.jsonldContext.v1p1,
    term: "Mentor#LearningFacilitator",
    iri: MENTOR_SUBROLE_IRI + "#LearningFacilitator"
  },
  mentorExternalMentor: {
    context: config.jsonldContext.v1p1,
    term: "Mentor#ExternalMentor",
    iri: MENTOR_SUBROLE_IRI + "#ExternalMentor"
  },
  mentorExternalAdvisor: {
    context: config.jsonldContext.v1p1,
    term: "Mentor#ExternalAdvisor",
    iri: MENTOR_SUBROLE_IRI + "#ExternalAdvisor"
  },
  mentorExternalAuditor: {
    context: config.jsonldContext.v1p1,
    term: "Mentor#ExternalAuditor",
    iri: MENTOR_SUBROLE_IRI + "#ExternalAuditor"
  },
  mentorExternalReviewer: {
    context: config.jsonldContext.v1p1,
    term: "Mentor#ExternalReviewer",
    iri: MENTOR_SUBROLE_IRI + "#ExternalReviewer"
  },
  mentorExternalTutor: {
    context: config.jsonldContext.v1p1,
    term: "Mentor#ExternalTutor",
    iri: MENTOR_SUBROLE_IRI + "#ExternalTutor"
  },
  mentorExternalLearningFacilitator: {
    context: config.jsonldContext.v1p1,
    term: "Mentor#ExternalLearningFacilitator",
    iri: MENTOR_SUBROLE_IRI + "#ExternalLearningFacilitator"
  },
  teachingAssistant: {
    context: config.jsonldContext.v1p1,
    term: "TeachingAssistant",
    iri: BASE_IRI + "#TeachingAssistant"
  },
  teachingAssistantTeachingAssistant: {
    context: config.jsonldContext.v1p1,
    term: "TeachingAssistant#TeachingAssistant",
    iri: TEACH_ASST_SUBROLE_IRI + "#TeachingAssistant"
  },
  teachingAssistantGrader: {
    context: config.jsonldContext.v1p1,
    term: "TeachingAssistant#Grader",
    iri: TEACH_ASST_SUBROLE_IRI + "#Grader"
  },
  teachingAssistantSection: {
    context: config.jsonldContext.v1p1,
    term: "TeachingAssistantSection",
    iri: TEACH_ASST_SUBROLE_IRI + "#TeachingAssistantSection"
  },
  teachingAssistantTeachingAssistantSectionAssociation: {
    context: config.jsonldContext.v1p1,
    term: "TeachingAssistant#TeachingAssistantSectionAssociation",
    iri: TEACH_ASST_SUBROLE_IRI + "#TeachingAssistantSectionAssociation"
  },
  teachingAssistantTeachingAssistantOffering: {
    context: config.jsonldContext.v1p1,
    term: "TeachingAssistant#TeachingAssistantOffering",
    iri: TEACH_ASST_SUBROLE_IRI + "#TeachingAssistantOffering"
  },
  teachingAssistantTeachingAssistantTemplate: {
    context: config.jsonldContext.v1p1,
    term: "TeachingAssistant#TeachingAssistantTemplate",
    iri: TEACH_ASST_SUBROLE_IRI + "#TeachingAssistantTemplate"
  },
  teachingAssistantTeachingAssistantGroup: {
    context: config.jsonldContext.v1p1,
    term: "TeachingAssistant#TeachingAssistantGroup",
    iri: TEACH_ASST_SUBROLE_IRI + "#TeachingAssistantGroup"
  }
};

module.exports = role;