/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Entity = require('./caliperEntity');

function DigitalResource(id) {

  Entity.call(this);

  this.setId(id);

  this.setProperties({});
  this.setObjectType([]);
  this.setAlignedLearningObjective([]);
  this.setKeyword([]);
}

DigitalResource.prototype = _.create(Entity.prototype);

DigitalResource.prototype.setResourceType = function (type) {
  switch (type) {
  case "ASSIGNABLE_DIGITAL_RESOURCE":
    this.setType("http://purl.imsglobal.org/caliper/v1/AssignableDigitalResource");
    break;
  case "EPUB_CHAPTER":
    this.setType("http://www.idpf.org/epub/vocab/structure/#chapter");
    break;
  case "EPUB_PART":
    this.setType("http://www.idpf.org/epub/vocab/structure/#part");
    break;
  case "EPUB_SUB_CHAPTER":
    this.setType("http://www.idpf.org/epub/vocab/structure/#subchapter");
    break;
  case "EPUB_VOLUME":
    this.setType("http://www.idpf.org/epub/vocab/structure/#volume");
    break;
  case "FRAME":
    this.setType("http://purl.imsglobal.org/caliper/v1/Frame");
    break;
  case "MEDIA_OBJECT":
    this.setType("http://purl.imsglobal.org/caliper/v1/MediaObject");
    break;
  case "READING":
    this.setType("http://www.idpf.org/epub/vocab/structure");
    break;
  case "WEB_PAGE":
    this.setType("http://purl.imsglobal.org/caliper/v1/WebPage");
    break;
  }
};

DigitalResource.prototype.setObjectType = function (objectType) {
  this.objectType = objectType;
};

DigitalResource.prototype.setAlignedLearningObjective = function (alignedLearningObjective) {
  this.alignedLearningObjective = alignedLearningObjective;
};

DigitalResource.prototype.setKeyword = function (keyword) {
  this.keyword = keyword;
};

DigitalResource.prototype.setPartOf = function (partOf) {
  this.partOf = partOf;
};

DigitalResource.prototype.Types = {
  "ASSIGNABLE_DIGITAL_RESOURCE": "http://purl.imsglobal.org/caliper/v1/AssignableDigitalResource",
  "EPUB_CHAPTER": "http://www.idpf.org/epub/vocab/structure/#chapter",
  "EPUB_PART": "http://www.idpf.org/epub/vocab/structure/#part",
  "EPUB_SUB_CHAPTER": "http://www.idpf.org/epub/vocab/structure/#subchapter",
  "EPUB_VOLUME": "http://www.idpf.org/epub/vocab/structure/#volume",
  "FRAME": "http://purl.imsglobal.org/caliper/v1/Frame",
  "MEDIA_OBJECT": "http://purl.imsglobal.org/caliper/v1/MediaObject",
  "READING": "http://www.idpf.org/epub/vocab/structure",
  "WEB_PAGE": "http://purl.imsglobal.org/caliper/v1/WebPage"
};

module.exports = DigitalResource;
