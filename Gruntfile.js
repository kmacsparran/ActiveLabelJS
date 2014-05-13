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
        },
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'std.css': 'styles.scss',
				}
			}
		}
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	
	grunt.registerTask('default', ['sass']);
};