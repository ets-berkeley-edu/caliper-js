(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var unique = require('uniq');

var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

console.log(unique(data));
},{"uniq":5}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
module.exports=require(2)
},{"/Users/pnayak/Documents/workspace-ims/caliper-js/caliperEntity.js":2}],4:[function(require,module,exports){
// Grab an existing namespace object, or create a blank object
// if it doesn't exist
var CaliperSensor = window.CaliperSensor || {};

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

// Replace/Create the global namespace
window.CaliperSensor = CaliperSensor;
},{"./actions":1,"./caliperEntity":2,"./caliperEvent":3}],5:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}]},{},[4]);
