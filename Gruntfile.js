module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
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
    }
  });

  grunt.registerTask('default', [
    'concat',
    'ngAnnotate',
    'uglify'
  ]);
};
