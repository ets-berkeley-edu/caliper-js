module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'dist/caliperSensor-0.9.2.js': ['src/**/*.js']
        },
        options: {

        }
      }
    },
    'http-server': {
      'dev': {
        // the server root directory
        root: '.',
        port: 8888,
        host: "127.0.0.1",
        cache: 0,
        showDir: true,
        autoIndex: true,
        // server default file extension
        ext: "html",
        // run in parallel with other tasks
        runInBackground: false
      }
    },
    tape: {
      options: {
        pretty: true,
        output: 'console'
      },
      files: ['test/*.js']
    },
    jsdoc: {
      dist: {
        src: ['src/**/*.js', 'README-external.md'],
        options: {
          destination: 'doc'
        }
      }
    }
  });

  // Load the plugin and tasks that provides unit testing via tap/tape
  grunt.loadNpmTasks('grunt-tape');
  grunt.registerTask('test', ['tape']);
  grunt.registerTask('ci', ['tape:ci']);

  // Load the plugin that provides the "browserify" task.
  grunt.loadNpmTasks('grunt-browserify');

  // Load plugin that provides http-server task
  grunt.loadNpmTasks('grunt-http-server');

  // Load jsDoc3 plugin
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task(s).
  grunt.registerTask('default', ['test', 'browserify', 'jsdoc']);
  grunt.registerTask('server', ['http-server']);
};
