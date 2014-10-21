
# Generates the deployable JS
build:
	browserify caliperSensor.js -o dist/caliperSensor.js

.PHONY: caliperSensor.js
