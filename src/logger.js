/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */
 
var logger = require('caterpillar').createLogger({
  level: 7
});

var output = logger
  .pipe(
    require('caterpillar-filter').createFilter()
  )
  .pipe(
    require('caterpillar-human').createHuman()
  )
  .pipe(
    require('caterpillar-browser').createBrowser()
  );

// Export
module.exports = {
  logger: logger,
  log: logger.log.bind(logger)
};
