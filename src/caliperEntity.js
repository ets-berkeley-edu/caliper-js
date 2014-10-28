/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

 function Entity(type) {
  this.type = type;
}

Entity.prototype.test = function() {
  return this.type;
};

module.exports = Entity;