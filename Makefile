
# Generates the deployable JS
build:
	browserify caliperSensor.js -o dist/caliperSensor-0.1.0.js

.PHONY: caliperSensor.js
