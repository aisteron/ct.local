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
			      'index.html':['assets/src/index.pug']
			    },
			    
			  }
			},
		less: 
			{

			  production: {
			    options: 
				    {
						//paths: ['../assets/build/css'],
						//paths: ['../'],
						sourceMapURL:'/new/assets/build/css/index.css.map',
						sourceMap:true,
/*				      plugins: // временно отлючаю плагины, т.к. sourcemap не работает с ними.
				      	[
				        new (require('less-plugin-autoprefix'))({browsers: ["last 3 versions"]}),
				        new (require('less-plugin-clean-css'))()
				        ],*/
				    },
			    files: 
				    {
				      'assets/build/css/index.css': 'assets/src/css/index.less'
				     
				    }
			  }
			},	




  	/*	uglify: {
			    options: {
			      mangle: false,
			      sourceMap: true,
        		  sourceMapName: 'js/sourcemap.map'
			    },
			    my_target: {
			      files: {
			        'js/build.min.js': ['js/build.js']
			      }
			    }
			  },*/	

		watch:
			{
				css:
				{
					files:['assets/src/css/*.less'],
					tasks:['less'],
					options: {
				      livereload: true,
				    }
				},/*
				scripts:
				{
					files:['js/custom.js'],
					tasks:['concat:basic'],
					options: {
				      livereload: true,
				    }
					
				},*/
				pug:
				{
					files:['assets/src/*.pug'],
					tasks:['pug'],
					options: {
				      livereload: true,
				    }
				}/*
				admin:
				{
					files:['../../../plugins/ifields/js/fields.js', '../../../plugins/ifields/js/admin.js'],
					tasks:['concat:extras']
				}*/
			},

		browserSync: 
			{
	            dev: {
	                bsFiles: {
	                    src : [
                        'assets/build/css/index.css',
                        'index.html'
                    ]
	                },
	                options: {
	                    watchTask: true,
	                    proxy: 'ct.local/new/'
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
	//grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default',['pug', 'less', 'browserSync','watch']);
	//grunt.registerTask('uglify',['uglify']);




}; //end wrap