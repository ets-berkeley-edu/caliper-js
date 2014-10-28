var _ = require('lodash-node');

// Grab an existing namespace object
// or create a blank object if it doesn't exist
var CaliperSensor = {};

var sensorOptions = {};

CaliperSensor.initialize = function(options) {
	sensorOptions = options;
	console.log("Initializing sensor with options " + JSON.stringify(options));
};

CaliperSensor.send = function(caliperEvent) {
	//
};

CaliperSensor.describe = function(caliperEntity) {
	//
};


// Stick on the modules that need to be exported.
// You only need to require the top-level modules, browserify
// will walk the dependency graph and load everything correctly
CaliperSensor.RoadRunner = require('./actions');
CaliperSensor.RoadRunner = require('./caliperEntity');
CaliperSensor.RoadRunner = require('./caliperEvent');

// Replace/Create the global namespace and objects (the sensor) we want there
window.Sensor = CaliperSensor;

console.log("Added sensor to window global %o", window.Sensor);