IMS Global caliper-js
================

caliper-js is a Javascript client for [Caliper](http://www.imsglobal.org/caliper) that provides an implementation of the Caliper SensorAPI™.

## Getting Started

### Pre-requisites for development:  

* Install npm for your platform
* npm install -g browserify
* npm install grunt
* npm install -g grunt-cli

### Issue with grunt-jsdocs 
Since Node 8.5.0 `fs.copyFile` and `fs.copyFileSync` require the full path of the destination file, breaking the 
grunt-jsdocs 2.1.1 build process since `lib/jsdoc/fs.js` prefers native methods over its overrides.  The jsdocs team has
resolved this issue and released jsdoc 3.5.5 but grunt-jsdocs has yet to be updated.  Until the grunt-jsdocs issue has
been resolved please use Node 8.4.0.   

For more details see: https://github.com/krampstudio/grunt-jsdoc/issues/179

### Testing and Building

* npm install
* Clone caliper-common-fixtures at the same level as caliper-js (note that test/testUtils.js references fixtures at a relative path to its parent)
* grunt (this will run unit tests and build dist/caliperSensor-x.x.x.js)

### Running the example

* grunt http-server:dev
* In a browser, navigate to http://localhost:8888/index.html

### Installing and using the Library:

Install and build the library using the steps above.

Then, add the following to your Javascript script:

```
<script src="dist/caliperSensor-1.1.0.js"></script>
```

## Documentation
Documentation is available at [http://www.imsglobal.org/caliper](https://www.imsglobal.org/caliper).

©2016 IMS Global Learning Consortium, Inc. All Rights Reserved.
Trademark Information- http://www.imsglobal.org/copyright.html

For license information contact, info@imsglobal.org and read the license file contained in the repository.