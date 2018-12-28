module.exports = function(grunt){

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		pug: 
		{
			compile: {
				options: {
					data: {
						debug: false
					}
				},

				files: {
					
					'index.html':['assets/src/index.pug'],

					'assets/src/pages/subj-html/bio.html':['assets/src/pages/subj-pug/bio.pug'],
					'assets/src/pages/subj-html/rus.html':['assets/src/pages/subj-pug/rus.pug'],
					'assets/src/pages/subj-html/history.html':['assets/src/pages/subj-pug/history.pug'],

					'assets/src/pages/prep-html/lutj.html':['assets/src/pages/prep-pug/lutj.pug'],
					'assets/src/pages/prep-html/lutj2.html':['assets/src/pages/prep-pug/lutj2.pug'],
					'assets/src/pages/prep-html/hodac.html':['assets/src/pages/prep-pug/hodac.pug'],					
					'assets/src/pages/prep-html/lob.html':['assets/src/pages/prep-pug/lob.pug'],
					'assets/src/pages/prep-html/lap.html':['assets/src/pages/prep-pug/lap.pug'],
					'assets/src/pages/prep-html/shab.html':['assets/src/pages/prep-pug/shab.pug'],
					'assets/src/pages/prep-html/luc.html':['assets/src/pages/prep-pug/luc.pug'],
					'assets/src/pages/prep-html/sin.html':['assets/src/pages/prep-pug/sin.pug'],
					'assets/src/pages/prep-html/olymp.html':['assets/src/pages/prep-pug/olymp.pug'],
					'assets/src/pages/prep-html/sel.html':['assets/src/pages/prep-pug/sel.pug'],
					'assets/src/pages/prep-html/iv.html':['assets/src/pages/prep-pug/iv.pug'],
					'assets/src/pages/prep-html/zhy.html':['assets/src/pages/prep-pug/zhy.pug'],
					'assets/src/pages/prep-html/ig.html':['assets/src/pages/prep-pug/ig.pug'],
				},

			}
		},
		less: 
		{

			production: {
				options: 
				{
					sourceMapURL:'/jqm/assets/build/css/index.css.map',
					sourceMap:true,

						// временно отлючаю плагины, т.к. sourcemap не работает с ними.
						/*
						plugins: 
				      	[
				        new (require('less-plugin-autoprefix'))({browsers: ["last 3 versions"]}),
				        new (require('less-plugin-clean-css'))()
				        ],
				        */
				    },
				    files: 
				    {
				    	'assets/build/css/index.css': 'assets/src/less/index.less'

				    }
				}
			},	


			watch:
			{
				css:
				{
					files:['assets/src/less/*.less'],
					tasks:['less'],
					options: {
						livereload: true,
					}
				},
				/*
				scripts:
				{
					files:['js/custom.js'],
					tasks:['concat:basic'],
					options: {
				      livereload: true,
				    }
					
				},
				*/
				pug:
				{
					files:['assets/src/*.pug', 
					'assets/src/inc/*.pug', 
					'assets/src/pages/subj-pug/*.pug',
					'assets/src/pages/prep-pug/*.pug'],
					tasks:['pug'],
					options: {
						livereload: true,
					}
				}
			},

			browserSync: 
			{
				dev: {
					bsFiles: {
						src : [
						'assets/build/css/*.css',
						'index.html'
						]
					},
					options: {
						watchTask: true,
						proxy: 'ct.local/jqm/'
					}
				}
			},

	    /*concat: 
	    	{
			    options: {
			      separator: ';',
			    },
			    basic: {
			      src: ['js/jquery-3.2.1.min.js', 'js/custom.js', 'js/lazysizes.min.js', 'js/ls.unveilhooks.js', 'js/notify.js'],
			      dest: 'js/build.js',
			    },
			    extras: {
			      src: ['../../../plugins/ifields/js/fields.js', '../../../plugins/ifields/js/admin.js'],
			      dest: '../../../plugins/ifields/js/build.js',
			    },
			}*/    	

	}); //end .initConfig

	grunt.loadNpmTasks('grunt-contrib-pug');
	
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-browser-sync');
	//grunt.loadNpmTasks('grunt-contrib-concat');


	grunt.registerTask('default',['pug', 'less', 'browserSync','watch']);





}; //end wrap