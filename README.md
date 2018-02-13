# IMS Global Learning Consortium, Inc.

# caliper-js

The [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1) provides a structured approach to describing, collecting and exchanging learning activity data at scale.  Caliper also defines an application programming interface (the Sensor API&trade;) for marshalling and transmitting event data from instrumented applications to target endpoints for storage, analysis and use.  

*caliper-js* is a reference implementation of the Sensor API&trade; written in Javascript.

## Branches
* __master__: stable, deployable branch that stores the official release history.  
* __develop__: unstable development branch.  Current work that targets a future release is merged to this branch.

## Tags
*caliper-js* releases are tagged and versioned MAJOR.MINOR.PATCH\[-label\] (e.g., 1.2.0).  Pre-release tags are identified with an extensions label (e.g., "1.2.0-RC01").  The tags are stored in this repository.

## Getting started
1. *Read* the [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1).  
2. Fork the IMS Global *caliper-js* project to your Github account and clone your copy to a local development machine.  
3. Install [Node.js](https://nodejs.org/) and the Javascript package manager, [npm](https://www.npmjs.com/).  Consider using [nvm](https://github.com/creationix/nvm), a node version manager, to install Node.js and npm.   
4. Once npm is installed, change directories to where you cloned *caliper-js* and install the [browserify](http://browserify.org/) and [grunt-cli](https://gruntjs.com) packages globally before installing the *caliper-js* dependencies:

```
npm install -g browserify
npm install -g grunt-cli
npm install
``` 

## Performing a Build
Clone the IMS Global [caliper-common-fixtures](https://github.com/IMSGlobal/caliper-common-fixtures) repo at the same level as *caliper-js*. Then invoke [Grunt](https://gruntjs.com) to execute the unit tests, generate [JSDocs](http://usejsdoc.org/), and build the *caliper-js* library. 

```
grunt
```

The distribution file will be copied to `dist/caliperSensor-[MAJOR.MINOR.PATCH].js`.

## Caliper vocabulary
The [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1) defines a set of concepts, relationships and rules for describing learning activities. Each activity domain modeled is described in a profile. Each profile is composed of one or more `Event` types (e.g., `AssessmentEvent`, `NavigationEvent`). Each `Event` type is associated with a set of actions undertaken by learners, instructors, and others. Various `Entity` types representing people, groups, and resources are provided in order to better describe both the relationships established between participating entities and the contextual elements relevant to the interaction (e.g., `Assessment`, `Attempt`, `CourseSection`, `Person`).

*caliper-js* implements all profiles described in [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1). 

## Creating events and entities
A Caliper `Event` describes the relationship between two entities, one an `actor` and the other an `object`, formed as a result of a purposeful `action` undertaken by the actor at a particular moment in time and, optionally, situated within a given learning context.  Below is an example of an `AssessmentEvent` expressed as JSON-LD:

#### Example: AssessmentEvent
```json
{
  "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
  "id": "urn:uuid:27734504-068d-4596-861c-2315be33a2a2",
  "type": "AssessmentEvent",
  "actor": {
    "id": "https://example.edu/users/554433",
    "type": "Person"
  },
  "action": "Started",
  "object": {
    "id": "https://example.edu/terms/201801/courses/7/sections/1/assess/1",
    "type": "Assessment",
    "dateToStartOn": "2018-11-14T05:00:00.000Z",
    "dateToSubmit": "2018-11-18T11:59:59.000Z",
    "maxAttempts": 1,
    "maxScore": 25.0
  },
  "generated": {
    "id": "https://example.edu/terms/201801/courses/7/sections/1/assess/1/users/554433/attempts/1",
    "type": "Attempt",
    "assignee": "https://example.edu/users/554433",
    "assignable": "https://example.edu/terms/201801/courses/7/sections/1/assess/1",
    "count": 1,
    "dateCreated": "2018-11-15T10:15:00.000Z",
    "startedAtTime": "2018-11-15T10:15:00.000Z"
  },
  "eventTime": "2018-11-15T10:15:00.000Z",
  "edApp": "https://example.edu",
  "group": {
    "id": "https://example.edu/terms/201801/courses/7/sections/1",
    "type": "CourseSection",
    "courseNumber": "CPS 435-01",
    "academicSession": "Fall 2018"
  },
  "membership": {
    "id": "https://example.edu/terms/201801/courses/7/sections/1/rosters/1",
    "type": "Membership",
    "member": "https://example.edu/users/554433",
    "organization": "https://example.edu/terms/201801/courses/7/sections/1",
    "roles": ["Learner"],
    "status": "Active",
    "dateCreated": "2018-08-01T06:00:00.000Z"
  },
  "session": {
    "id": "https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259",
    "type": "Session",
    "user": "https://example.edu/users/554433",
    "startedAtTime": "2018-11-15T10:00:00.000Z",
    "extensions": {
      "request":  {
        "id": "d71016dc-ed2f-46f9-ac2c-b93f15f38fdc",
        "hostname": "example.edu",
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36"
      }
    }
  }
}
```

Note the following requirements illustrated by the above example:

* Caliper events and entity *describes* are serialized as JSON-LD documents.  Each document must be provisioned with a JSON-LD `@context` that references, at a minimum, the remote IMS Caliper context document.  If you are unfamiliar with JSON-LD, consider pausing here and augmenting your Caliper knowledge by reading the [JSON-LD specification](http://json-ld.org/spec/latest/json-ld/).
* The `Event` properties `id`, `type`, `actor`, `action`, `object` and `eventTime`are required; all other properties are considered optional.  The `id` value must be expressed as a UUID using the form `urn:uuid:<UUID>` per RFC 4122.  A version 4 UUID should be generated.  The `type` value must match the term specified by Caliper (e.g., "AssessmentEvent", "MessageEvent", "NavigationEvent").
* Caliper permits `Entity` values to be expressed either as a JSON object or as a string corresponding to the resource's IRI.  If the `Entity` is expressed as an object, both the `id` and `type` properties must be specified; all other properties are considered optional.  The `id` value must be expressed as an IRI. A URI using the URN scheme may be provided although care should be taken when employing a location-independent identifier since it precludes the possibility of utilizing it to retrieve machine-readable data over HTTP.  The `type` value must match the term specified by Caliper (e.g., "Person", "Assessment", "Attempt", "CourseSection").
* Date/Time properties (e.g., `eventTime`, `dateCreated`, `startedAtTime`) must be expressed as date and time values expressed with millisecond precision using the ISO 8601 format YYYY-MM-DDTHH:mm:ss.SSSZ set to UTC with no offset specified.
* Custom attributes not described by Caliper may be included but must be added to the `extensions` property as a map of key:value pairs. 
* Properties with a value of null or empty are excluded by *caliper-js* during serialization.

See the The [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1) for a complete description of requirements.

## Factory methods
*caliper-js* provides two factory functions to simplify creating events and entities:

* *eventFactory()* returns a mutated `Event` object based on a *caliper-js* delegate to which is assigned an options object of user-provided key:value pairs. The function exposes a single method signature: *.create(delegate, opts)*.   
* *entityFactory()* returns a mutated `Entity` object based on a *caliper-js* delegate to which is assigned an options object of user-provided key:value pairs. The function exposes two method signatures: *.create(delegate, opts)* and *.coerce(delegate, opts)*.  Use the *.create(delegate, opts)* method to express a Caliper `Entity` as an object; use the *.coerce(delegate, opt)* method to express an `Entity` as a string that corresponds to its IRI.

#### Example: Creating an Assessment Expressed as an Object
```javascript
var obj = entityFactory().create(Assessment, {
  id: "https://example.edu/terms/201801/courses/7/sections/1/assess/1",
  dateToStartOn: moment.utc("2018-08-16T05:00:00.000Z"),
  dateToSubmit: moment.utc("2018-09-28T11:59:59.000Z"),
  maxAttempts: 1,
  maxScore: 25.0
});
```

#### Example: Creating a SoftwareApplication Expressed as a String 
```javascript
var edApp = entityFactory().coerce(SoftwareApplication, {id: "http://example.edu"});

```

## Envelopes
Caliper `Event` and `Entity` data must be transmitted inside a Caliper `Envelope`, a JSON data structure that includes metadata about the emitting application sensor and the data payload.  The `sensor`, `sendTime`, `dataVersion` and `data` properties are required.  The `data` array comprises an ordered collection of one or more Caliper `Event` and/or `Entity` *describe* documents.  Each `Event` and `Entity` describe transmitted inside an `Envelope` must be serialized as a JSON-LD document.

#### Example: Caliper Envelope (single ToolUseEvent data payload)
```json
{
  "sensor": "https://example.edu/sensors/1",
  "sendTime": "2018-11-15T11:05:01.000Z",
  "dataVersion": "http://purl.imsglobal.org/ctx/caliper/v1p1",
  "data": [{
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
    "id": "urn:uuid:7e10e4f3-a0d8-4430-95bd-783ffae4d916",
    "type": "ToolUseEvent",
    "actor": {
      "id": "https://example.edu/users/554433",
      "type": "Person"
    },
    "action": "Used",
    "object": {
      "id": "https://example.edu",
      "type": "SoftwareApplication"
    },
    "eventTime": "2018-11-15T10:15:00.000Z",
    "edApp": "https://example.edu",
    "group": {
      "id": "https://example.edu/terms/201801/courses/7/sections/1",
      "type": "CourseSection",
      "courseNumber": "CPS 435-01",
      "academicSession": "Fall 2018"
    },
    "membership": {
      "id": "https://example.edu/terms/201801/courses/7/sections/1/rosters/1",
      "type": "Membership",
      "member": "https://example.edu/users/554433",
      "organization": "https://example.edu/terms/201801/courses/7/sections/1",
      "roles": ["Learner"],
      "status": "Active",
      "dateCreated": "2018-08-01T06:00:00.000Z"
    },
    "session": {
      "id": "https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259",
      "type": "Session",
      "startedAtTime": "2018-11-15T10:00:00.000Z"
    }
  }]
}
```

## Installing and using the library:
Install and build the *caliper-js* library per the steps above.  Then reference the *caliper-js* library inside the \<head\> tag of your HTML file:

```html
<head> 
  <script src="[path to]/caliperSensor-1.2.0.js"></script>
</head>
```

## Creating and sending Caliper messages
You can use *caliper-js* to create, serialize and transmit Caliper messages to a target endpoint over HTTP.  The HTTP connection must be secured and encrypted using Transport Layer Security (TLS).  Below is a snippet of code illustrating the steps required to create an `AssessmentEvent` and transmit it to a target endpoint: 

```javascript
// Initialize Caliper sensor
var sensor = Caliper.Sensor;
sensor.initialize("http://example.org/sensors/1");

// Override default HTTP options
var options = Caliper.Clients.HttpOptions;
options.uri = "https://example.edu/caliper/target/endpoint";
options.headers["Authorization"] = "40dI6P62Q_qrWxpTk95z8w";

// Initialize and register client
var client = Caliper.Clients.HttpClient;
client.initialize("http://example.org/sensors/1/clients/2", options);
sensor.registerClient(client);

// Set Event property values
// Note: only actor, action, and object property assignments shown
var actor = entityFactory().create(Person, {id: "https://example.edu/users/554433"});
var action = actions.started.term;
var obj = entityFactory().create(Assessment, {
  id: "https://example.edu/terms/201801/courses/7/sections/1/assess/1",
  dateToStartOn: moment.utc("2018-08-16T05:00:00.000Z"),
  dateToSubmit: moment.utc("2018-09-28T11:59:59.000Z"),
  maxAttempts: 1,
  maxScore: 25.0
  // ... add additional optional property assignments
});

// ... Use the entityFactory() to mint additional entity values.

// Create Event
var event = EventFactory().create(AssessmentEvent, {
  id: id,
  actor: actor,
  action: action,
  object: obj,
  eventTime: new Date().toISOString(),
  edApp: edApp,
  group: group,
  membership: membership,
  session: session
});

// ... Create additional events and/or entity describes.

// Create data payload
var payload = [];
payload.push(event);

// Envelope options
var opts = {
  sensor: sensor.id,
  sendTime: new Date().toISOString(),
  dataVersion: "http://purl.imsglobal.org/ctx/caliper/v1p2",
  data: payload
};

// Create envelope with data payload
var envelope = sensor.createEnvelope(opts);

// Delegate transmission responsibilities to client
sensor.sendToClient(client, envelope);
```

## License
This project is licensed under the terms of the GNU Lesser General Public License (LGPL), version 3.  See the [LICENSE](./LICENSE) file for details.

©2018 IMS Global Learning Consortium, Inc. All Rights Reserved.
Trademark Information - http://www.imsglobal.org/copyright.html