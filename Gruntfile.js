module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/* \n' + 
			' * <%= pkg.title || pkg.name %>, version <%= pkg.version %> [<%= grunt.template.today("yyyy-mm-dd") %>]\n' +
			' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.company %>\n' +
			' * Author: <%= pkg.author.name %> [<%= pkg.author.email %>]\n' + 
			' * Licensed under the <%= _.pluck(pkg.licenses, "type").join(", ") %> License [<%= _.pluck(pkg.licenses, "url").join(", ") %>]\n' + 
			' */\n',
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true,
				separator: ';'
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>',
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		copy: {
			main: {
				expand: true, 
				cwd: 'dist/', 
				src: '<%= pkg.name %>.js', 
				dest: 'example/'
			}
		},
		clean: {
			src: ['dist']
		},
		watch: {
			sass: {
				files: ['src/**/*.scss'],
				tasks: ['sass', 'autoprefixer']
			},
			concat: {
				files: ['src/**/*.js'],
				tasks: ['clean', 'concat', 'copy', 'uglify']
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'src/styles/css/std.css': ['src/styles/styles.scss']
				}
			}
		},
		autoprefixer: {
			dist: {
				src: ['src/styles/css/std.css'],
				dest: 'example/std.css'
			}
		}
	});
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	
	grunt.registerTask('default', ['watch']);
};