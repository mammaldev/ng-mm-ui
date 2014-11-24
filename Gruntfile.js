module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-istanbul-coverage');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },
      all: [
        'Gruntfile.js',
        'src/**/*.js',
        'test/**/*.js'
      ]
    },
    karma: {
      unit: {
        options: {
          preprocessors: {
            'src/**/*.js': 'coverage'
          },
          frameworks: [
            'mocha',
            'sinon',
            'chai',
            'chai-as-promised'
          ],
          reporters: [
            'coverage',
            'progress'
          ],
          browsers: [
            'PhantomJS'
          ],
          files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/init.js',
            'src/**/*.js',
            'test/**/*.js'
          ],
          coverageReporter: {
            type: 'json',
            dir: 'coverage',
            subdir: '.'
          },
          singleRun: true
        }
      }
    },
    coverage: {
      options: {
        thresholds: {
          statements: 100,
          functions: 100,
          branches: 100,
          lines: 100
        },
        dir: 'coverage'
      }
    },
    concat: {
      all: {
        files: {
          'dist/mm-ui.js': [
            'src/init.js',
            'src/**/*.js'
          ]
        }
      }
    },
    uglify: {
      all: {
        options: {
          sourceMap: true
        },
        files: {
          'dist/mm-ui.min.js': [
            'dist/mm-ui.min.js'
          ]
        }
      }
    },
    ngAnnotate: {
      main: {
        files: {
          'dist/mm-ui.min.js': [
            'src/init.js',
            'src/**/*.js'
          ],
          'dist/mm-ui.js': [
            'dist/mm-ui.js'
          ]
        },
      },
    },
  });

  grunt.registerTask('default', [
    'jshint',
    'karma',
    'coverage',
    'concat',
    'ngAnnotate',
    'uglify'
  ]);
};
