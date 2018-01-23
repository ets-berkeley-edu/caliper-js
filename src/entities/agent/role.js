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

const BASE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership";
const ADMIN_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/Administrator";
const CONTENT_DEV_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/ContentDeveloper";
const INSTR_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/Instructor";
const LEARNER_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/Learner";
const MANAGER_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/Manager";
const MEMBER_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/Member";
const MENTOR_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/Mentor";
const TEACH_ASST_SUBROLE_IRI = "http://purl.imsglobal.org/vocab/lis/v2/membership/TeachingAssistant";

var role = {
  learner: {term: "Learner", iri: BASE_IRI + "#Learner"},
  learnerExternalLearner: {term: "Learner#ExternalLearner", iri: LEARNER_SUBROLE_IRI + "#ExternalLearner"},
  learnerGuestLearner: {term: "Learner#GuestLearner", iri: LEARNER_SUBROLE_IRI + "#GuestLearner"},
  learnerInstructor: {term: "Learner#Instructor", iri: LEARNER_SUBROLE_IRI + "#Instructor"},
  learnerLearner: {term: "Learner#Learner", iri: LEARNER_SUBROLE_IRI + "#Learner"},
  learnerNonCreditLearner: {term: "Learner#NonCreditLearner", iri: LEARNER_SUBROLE_IRI + "#NonCreditLearner"},
  instructor: {term: "Instructor", iri: BASE_IRI + "#Instructor"},
  instructorExternalInstructor: {term: "Instructor#ExternalInstructor", iri: INSTR_SUBROLE_IRI + "#ExternalInstructor"},
  instructorGuestInstructor: {term: "Instructor#GuestInstructor", iri: INSTR_SUBROLE_IRI + "#GuestInstructor"},
  instructorLecturer: {term: "Instructor#Lecturer", iri: INSTR_SUBROLE_IRI + "#Lecturer"},
  instructorPrimaryInstructor: {term: "Instructor#PrimaryInstructor", iri: INSTR_SUBROLE_IRI + "#PrimaryInstructor"},
  administrator: {term: "Administrator", iri: BASE_IRI + "#Administrator"},
  administratorAdministrator: {term: "Administrator#Administrator", iri: ADMIN_SUBROLE_IRI + "#Administrator"},
  administratorDeveloper: {term: "Administrator#Developer", iri: ADMIN_SUBROLE_IRI + "#Developer"},
  administratorSupport: {term: "Administrator#Support", iri: ADMIN_SUBROLE_IRI + "#Support"},
  administratorSystemAdministrator: {term: "Administrator#SystemAdministrator", iri: ADMIN_SUBROLE_IRI + "#SystemAdministrator"},
  administratorExternalDeveloper: {term: "Administrator#ExternalDeveloper", iri: ADMIN_SUBROLE_IRI + "#ExternalDeveloper"},
  administratorExternalSupport: {term: "Administrator#ExternalSupport", iri: ADMIN_SUBROLE_IRI + "#ExternalSupport"},
  administratorExternalSystemAdministrator: {term: "Administrator#ExternalSystemAdministrator", iri: ADMIN_SUBROLE_IRI + "#ExternalSystemAdministrator"},
  contentDeveloper: {term: "ContentDeveloper", iri: BASE_IRI + "#ContentDeveloper"},
  contentDeveloperContentDeveloper: {term: "ContentDeveloper#ContentDeveloper", iri: CONTENT_DEV_SUBROLE_IRI + "#ContentDeveloper"},
  contentDeveloperLibrarian: {term: "ContentDeveloper#Librarian", iri: CONTENT_DEV_SUBROLE_IRI + "#Librarian"},
  contentDeveloperContentExpert: {term: "ContentDeveloper#ContentExpert", iri: CONTENT_DEV_SUBROLE_IRI + "#ContentExpert"},
  contentDeveloperExternalContentExpert: {term: "ContentDeveloper#ExternalContentExpert", iri: CONTENT_DEV_SUBROLE_IRI + "#ExternalContentExpert"},
  manager: {term: "Manager", iri: BASE_IRI + "#Manager"},
  managerAreaManager: {term: "Manager#AreaManager", iri: MANAGER_SUBROLE_IRI + "#AreaManager"},
  managerCourseCoordinator: {term: "Manager#CourseCoordinator", iri: MANAGER_SUBROLE_IRI + "#CourseCoordinator"},
  managerObserver: {term: "Manager#Observer", iri: MANAGER_SUBROLE_IRI + "#Observer"},
  managerExternalObserver: {term: "Manager#ExternalObserver", iri: MANAGER_SUBROLE_IRI + "#ExternalObserver"},
  member: {term: "Member", iri: BASE_IRI + "#Member"},
  memberMember: {term: "Member#Member", iri: MEMBER_SUBROLE_IRI + "#Member"},
  mentor: {term: "Mentor", iri: BASE_IRI + "#Mentor"},
  mentorMentor: {term: "Mentor#Mentor", iri: MENTOR_SUBROLE_IRI + "#Mentor"},
  mentorAdvisor: {term: "Mentor#Advisor", iri: MENTOR_SUBROLE_IRI + "#Advisor"},
  mentorAuditor: {term: "Mentor#Auditor", iri: MENTOR_SUBROLE_IRI + "#Auditor"},
  mentorReviewer: {term: "Mentor#Reviewer", iri: MENTOR_SUBROLE_IRI + "#Reviewer"},
  mentorTutor: {term: "Mentor#Tutor", iri: MENTOR_SUBROLE_IRI + "#Tutor"},
  mentorLearningFacilitator: {term: "Mentor#LearningFacilitator", iri: MENTOR_SUBROLE_IRI + "#LearningFacilitator"},
  mentorExternalMentor: {term: "Mentor#ExternalMentor", iri: MENTOR_SUBROLE_IRI + "#ExternalMentor"},
  mentorExternalAdvisor: {term: "Mentor#ExternalAdvisor", iri: MENTOR_SUBROLE_IRI + "#ExternalAdvisor"},
  mentorExternalAuditor: {term: "Mentor#ExternalAuditor", iri: MENTOR_SUBROLE_IRI + "#ExternalAuditor"},
  mentorExternalReviewer: {term: "Mentor#ExternalReviewer", iri: MENTOR_SUBROLE_IRI + "#ExternalReviewer"},
  mentorExternalTutor: {term: "Mentor#ExternalTutor", iri: MENTOR_SUBROLE_IRI + "#ExternalTutor"},
  mentorExternalLearningFacilitator: {term: "Mentor#ExternalLearningFacilitator", iri: MENTOR_SUBROLE_IRI + "#ExternalLearningFacilitator"},
  teachingAssistant: {term: "TeachingAssistant", iri: BASE_IRI + "#TeachingAssistant"},
  teachingAssistantTeachingAssistant: {term: "TeachingAssistant#TeachingAssistant", iri: TEACH_ASST_SUBROLE_IRI + "#TeachingAssistant"},
  teachingAssistantGrader: {term: "TeachingAssistant#Grader", iri: TEACH_ASST_SUBROLE_IRI + "#Grader"},
  teachingAssistantSection: {term: "TeachingAssistantSection", iri: TEACH_ASST_SUBROLE_IRI + "#TeachingAssistantSection"},
  teachingAssistantTeachingAssistantSectionAssociation: {term: "TeachingAssistant#TeachingAssistantSectionAssociation", iri: TEACH_ASST_SUBROLE_IRI + "#TeachingAssistantSectionAssociation"},
  teachingAssistantTeachingAssistantOffering: {term: "TeachingAssistant#TeachingAssistantOffering", iri: TEACH_ASST_SUBROLE_IRI + "#TeachingAssistantOffering"},
  teachingAssistantTeachingAssistantTemplate: {term: "TeachingAssistant#TeachingAssistantTemplate", iri: TEACH_ASST_SUBROLE_IRI + "#TeachingAssistantTemplate"},
  teachingAssistantTeachingAssistantGroup: {term: "TeachingAssistant#TeachingAssistantGroup", iri: TEACH_ASST_SUBROLE_IRI + "#TeachingAssistantGroup"}
};

module.exports = role;