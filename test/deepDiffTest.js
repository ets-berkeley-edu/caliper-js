var test = require('tape');
var _ = require('lodash-node');
var diff = require('deep-diff').diff;

test('Create base Caliper Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  var lhs = {
    name: 'foo',
    description: 'bar'
  };

  var rhs = {
    description: 'bar',
    name: 'foo',
  };

  var differences = diff(lhs, rhs);

  t.equal(true, _.isUndefined(differences), "Validate JSON with different attribute order");
});
