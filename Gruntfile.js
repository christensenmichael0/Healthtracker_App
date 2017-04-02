module.exports = function(grunt) {
    grunt.initConfig({

        // clean folders and files
        clean: [
            'dist/',
            'src/img/initial_staging/',
        ],

        // copy some files
        copy: {
            main: {
                files: [

                    // makes all src relative to cwd
                    {
                        expand: true,
                        cwd: 'src/font-awesome-4.7.0',
                        src: ['**'],
                        dest: 'dist/font-awesome-4.7.0'
                    },
                ]
            }
        },

        // Minify html files
        htmlmin: {
            options: { // Target options
                removeComments: true,
                collapseWhitespace: true
            },
            dist: {
                files: { // Dictionary of files
                    'index.html': 'index_pretty.html' // 'destination': 'source'
                }
            }
        },
        // Uglify JS
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**/*.js',
                    dest: 'dist/'
                }]
            }
        },
        // Minify CSS
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.css'],
                    dest: 'dist/'
                }]
            }
        },

        // responsive-images
        responsive_images: {
            homePageImages: {
                options: {
                    sizes: [{
                        width: 800,
                        suffix: 'medium'
                    }, {
                        width: 1600,
                        suffix: 'large'
                    }]
                },
                files: [{
                    expand: true,
                    src: ['**.{png,PNG,jpg,jpeg,JPG,gif,GIF}'],
                    cwd: 'src/img',
                    dest: 'src/img/initial_staging'
                }]
            },

        },
        // Minify images
        tinyimg: {
            dynamicHome: {
                files: [{
                    expand: true,
                    src: ['**.{png,PNG,jpg,jpeg,JPG,gif,GIF}'],
                    cwd: 'src/img/initial_staging',
                    dest: 'dist/img'
                }]
            },
        }
    });
    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-tinyimg');

    // Default tasks.
    grunt.registerTask('default', ["clean", "copy", "htmlmin", "cssmin", "uglify", "responsive_images", "tinyimg"]);
}