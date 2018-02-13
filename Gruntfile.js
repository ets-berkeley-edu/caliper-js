module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'dist/caliperSensor-1.2.0.js': ['src/**/*.js']
        },
        options: {

        }
      }
    },
    tape: {
      options: {
        pretty: true,
        output: 'console'
      },
      files: ['test/**/*.js']
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

  // Load jsDoc3 plugin
  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task(s).
  grunt.registerTask('default', ['test', 'browserify', 'jsdoc']);
  grunt.registerTask('server', ['http-server']);
};
