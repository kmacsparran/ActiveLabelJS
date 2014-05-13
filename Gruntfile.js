module.exports = function (grunt) {
    grunt.initConfig({
        autoprefixer: {
            dist: {
                files: {
                    'demo/std.css': 'std.css'
                }
            }
        },
        watch: {
            styles: {
                files: ['std.css'],
                tasks: ['autoprefixer']
            }
        }
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
};