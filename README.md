# IMS Global Learning Consortium, Inc.

# caliper-js

The [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1) provides a structured approach to describing, collecting and exchanging learning activity data at scale.  Establishing a common vocabulary for describing learning interactions is a central objective.  Promoting data interoperability, data sharing and data-informed decision making are also important goals.

Caliper also defines an application programming interface (the Sensor API&trade;) for marshalling and transmitting event data from instrumented applications to target endpoints for storage, analysis and use.  *caliper-js* is a reference implementation of the Sensor API&trade; written in Javascript.

## Branches
* __master__: stable, deployable branch that stores the official release history.  
* __develop__: unstable development branch.  Current work that targets a future release is merged to this branch.

## Tags
*caliper-js* releases are tagged and versioned MAJOR.MINOR.PATCH\[-label\] (e.g., 1.1.0).  Pre-release tags are identified with an extensions label (e.g., "1.2.0-RC01").  The [tags](https://github.com/IMSGlobal/caliper-spec/tags) are stored in this repository.

## Getting Started
Fork the IMS Global *caliper-js* project to your Github account and then clone your copy to your local development machine.  

### Prerequisites
Install [Node.js](https://nodejs.org/) and the Javascript package manager, [npm](https://www.npmjs.com/).  Consider using   [nvm](https://github.com/creationix/nvm), a node version manager, to install Node.js and npm.   

Once npm is installed add the following packages:

```
npm install -g browserify
npm install grunt
npm install -g grunt-cli
``` 

### Building
From your local *caliper-js* directory run:

```
npm install
```

### Testing
Clone the *caliper-common-fixtures* project at the same level as *caliper-js* (note that `test/testUtils.js` references the test fixtures at a path relative to its parent). Then invoke Grunt, the Javascript task runner, to run the unit tests and build a *caliper-js* library file at `dist/caliperSensor-[MAJOR.MINOR.PATCH].js`. 

```
grunt
```

### Running the example
Invoke Grunt, then navigate to http://localhost:8888/index.html.

```
grunt http-server:dev
```

### Installing and using the Library:
Install and build the *caliper-js* library per the steps above.  Then reference the *caliper-js* library inside the \<head\> tag of your HTML file:

```
<head> 
  <script src="[path to]/caliperSensor-1.1.0.js"></script>
</head>
```

## License
This project is licensed under the terms of the GNU Lesser General Public License (LGPL), version 3.
See the [LICENSE](./LICENSE) file for details.

©2018 IMS Global Learning Consortium, Inc. All Rights Reserved.
Trademark Information - http://www.imsglobal.org/copyright.html