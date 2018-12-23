//  TODO - add typescript compile to build steps
module.exports = function(grunt) {
    grunt.initConfig({
        clean : {
            release : ['release'],
            'vendors-debug': ['src/app/vendors']
        },
        ts: {
            default : {
                tsconfig: './tsconfig.json'
            }
        },
        uglify : {
            options: {
                mangle: false
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'src/app/',
                    src: ['*.js', '**/*.js','!**/*.min.js', '!*.min.js','!vendors/**'],
                    dest: 'release/app/',
                    rename: function (destBase, destPath) {
                        return destBase + destPath.replace('.js', '.min.js');
                    }
                }]
            }
        },
        cssmin : {
            'debug-assets': {
                expand: true,
                cwd: 'src/app/assets/',
                src: ['*.css', '**/*.css','!**/*.min.css', '!*.min.css'],
                dest: 'src/app/assets/',
                rename: function (destBase, destPath) {
                    return destBase + destPath.replace('.css', '.min.css');
                }
            }
        },
        copy : {
            'vendor-js-debug': {
                expand: true,
                flatten: true,
                cwd: 'node_modules/',
                src: [
                    'angular/angular.min.js',
                    'core-js/client/shim.min.js',
                    'systemjs/dist/system.src.js',
                    'angular-ui-router/release/angular-ui-router.min.js',
                    'angular-sanitize/angular-sanitize.min.js',
                    'angular-filter/dist/angular-filter.min.js',
                    'angular-utf8-base64/angular-utf8-base64.js',
                    'angular-translate/dist/angular-translate.min.js',
                    'angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
                    'ui-select/dist/select.min.js',
                    'angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                    'ladda/dist/spin.min.js',
                    'ladda/dist/ladda.min.js',
                    'angular-ladda/dist/angular-ladda.min.js',
                    'angular-toastr/dist/angular-toastr.tpls.min.js',
                    'ng-lodash/build/ng-lodash.min.js',
                    'chart.js/dist/Chart.min.js',
                    'angular-chart.js/dist/angular-chart.min.js',
                    'angular-busy/dist/angular-busy.min.js',
                    'angular-bootstrap-toggle/dist/angular-bootstrap-toggle.min.js'
                ],
                dest: 'src/app/vendors/js/'
            },
            'vendor-css-debug': {
                expand: true,
                flatten: true,
                cwd: 'node_modules/',
                src: [
                    'ui-select/dist/select.min.css',
                    'bootstrap/dist/css/bootstrap.min.css',
                    'ladda/dist/ladda-themeless.min.css',
                    'angular-toastr/dist/angular-toastr.min.css',
                    'angular-busy/dist/angular-busy.min.css',
                    'angular-bootstrap-toggle/dist/angular-bootstrap-toggle.min.css'
                ],
                dest: 'src/app/vendors/css/'
            },
            'vendor-fonts-debug': {
                expand: true,
                flatten: true,
                cwd: 'node_modules/',
                src: ['bootstrap/fonts/*'],
                dest: 'src/app/vendors/fonts/'
            },
            imgs: {
                expand: true,
                cwd: 'src/',
                src: ['app/assets/img/**'],
                dest: 'release/'
            },
            styles: {
                expand: true,
                cwd: 'src/',
                src: ['app/assets/css/**.min.css'],
                dest: 'release/'
            },
            'html-templates': {
                expand: true,
                cwd: 'src/',
                src: ['app/templates/**'],
                dest: 'release/'
            },
            languages: {
                expand: true,
                cwd: 'src/',
                src: ['app/languages/**'],
                dest: 'release/'
            },
            vendors: {
                expand: true,
                cwd: 'src/',
                src: ['app/vendors/**'],
                dest: 'release/'
            },
            'index-release': {
                src: ['templates/index.release.html'],
                dest: 'release/index.html'
            },
            'systemjs-config-release': {
                src: ['templates/systemjs.config.release.js'],
                dest: 'release/systemjs.config.js'
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    //  DEBUG
    grunt.registerTask('copy-vendor-debug', ['clean:vendors-debug','copy:vendor-js-debug','copy:vendor-css-debug','copy:vendor-fonts-debug']);
    grunt.registerTask('compile-typescript', ['ts']);
    grunt.registerTask('build-debug', ['compile-typescript','copy-vendor-debug','cssmin:debug-assets']);

    //  RELEASE
    grunt.registerTask('copy-templates-release', ['copy:index-release','copy:systemjs-config-release']);
    grunt.registerTask('copy-release', ['copy:imgs','copy:styles','copy:html-templates','copy:languages','copy:vendors','copy-templates-release']);
    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['build-debug','clean:release','uglify:all','copy-release']);
};