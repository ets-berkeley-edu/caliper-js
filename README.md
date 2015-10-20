IMS Global caliper-js
================

caliper-js is a Javascript client for [Caliper](http://www.imsglobal.org/caliper) that provides an implementation of the Caliper SensorAPI™.

## Getting Started

### Pre-requisites for development:  

* Install npm for your platform
* npm install -g browserify
* npm install grunt
* npm install -g grunt-cli

### Testing and Building

* npm install
* Clone caliper-common-fixtures at the same level as caliper-js (note that test/testUtils.js references fixtures at a relative path to its parent)
* grunt (this will run unit tests and build dist/caliperSensor-x.x.x.js)

### Running the example

* grunt http-server:dev
* In a browser, navigate to http://localhost:9999/index.html

### Installing and using the Library:

Install and build the library using the steps above.

Then, add the following to your Javascript script:

```
<script src="dist/caliperSensor-1.0.0.js"></script>
```

## Documentation
Documentation is available at [http://www.imsglobal.org/caliper](https://www.imsglobal.org/caliper).

©2015 IMS Global Learning Consortium, Inc. All Rights Reserved.
Trademark Information- http://www.imsglobal.org/copyright.html

For license information contact, info@imsglobal.org and read the license file contained in the repository.