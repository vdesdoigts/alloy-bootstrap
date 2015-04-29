module.exports = function(grunt) {
    var targetPlatform = grunt.option("p") || 'ios';

    grunt.initConfig({
        babel : {
            options: {
                sourceMap: false
            },
            dist: {
                files: [{
                    expand: true,
                    src: ['**/*.es6'],
                    dest: 'app',
                    cwd: 'src',
                    ext: ['.js']
                }]
            }
        },
        clean: {
            project: {
                src: [
                    'app/', 'Resources/', 'build/',
                    'platform/*', '!platform/android', 'platform/android/*', '!platform/android/res', 'platform/android/res/*', '!platform/android/res/values',
                    'iTunesConnect.png', 'GooglePlay.png', 'GooglePlayFeature.png', 'MarketplaceArtwork.png'
                ]
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true,
            },
            run: {
                tasks: ['tishadow:run', 'watch:styles', 'watch:javascripts', 'watch:assets']
            },
            spec: {
                tasks: ['tishadow:spec', 'watch:views','watch:styles', 'watch:javascripts', 'watch:assets']
            }
        },
        copy: {
            alloy: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/',
                    dest: 'app/',
                    src: [
                        '**',
                        'widgets/**',
                        '!config.json.dist',
                        '!assets/images/**',
                        '!**/*.es6',
                        '!**/*.stss'
                    ]
                }]
            },
            assets: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/assets/images/xxxhdpi/',
                    dest: 'app/assets/android/images/res-xxxhdpi/',
                    src: [ '**' ]
                }]
            }
        },
        // titanium-cli commands in absence of a plugin
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            iphone6: {
                command: "titanium build -p ios -S 6.1 -Y iphone"
            },
            iphone7: {
                command: "titanium build -p ios -S 7.1 -Y iphone"
            },
            ipad6: {
                command: "titanium build -p ios -S 6.1 -Y ipad"
            },
            ipad7: {
                command: "titanium build -p ios -S 7.1 -Y ipad"
            },
            icons: {
                command: "`pwd`/node_modules/ticons/cli.js -a icons `pwd`/src/assets/images/iTunesArtwork@2x.png"
            },
            splashes: {
                command: "`pwd`/node_modules/ticons/cli.js -a splashes `pwd`/src/assets/images/splash2208x2208.jpg --no-nine"
            },
            assets: {
                command: "`pwd`/node_modules/ticons/cli.js -a assets --max-dpi xxxhdpi `pwd`/app/assets/android/images/res-xxxhdpi"
            }
        },
        stss: {
            compile: {
                files: [{
                    expand: true,
                    src: ['**/*.stss','!**/_*.stss'],
                    dest: 'app',
                    cwd: 'src',
                    ext: '.tss'
                }],
            }
        },
        tishadow: {
            options: {
                update: true,
                watch: true
            },
            run: {
                command: 'run',
                options: {
                    platform: targetPlatform
                }
            },
            spec: {
                command: 'spec',
                options: {
                    platform: targetPlatform,
                    update: false
                }
            },
            server: {
                command: 'server'
            },
            clear: {
                command: 'clear',
                options: {}
            }
        },
        watch: {
            options: {
                nospawn: true
            },
            styles: {
                files: ['src/**/*.stss'],
                tasks: ['stss']
            },
            javascripts: {
                files: ['src/**/*.es6'],
                tasks: ['babel']
            },
            assets: {
                files: ['src/**', '!src/assets/images/**', '!src/**/*.es6', '!src/**/*.stss'],
                tasks: ['copy:alloy']
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default', ['build', 'ticons']);
    grunt.registerTask('ticons', ['copy:assets', 'shell:icons', 'shell:splashes', 'shell:assets']);
    grunt.registerTask('assets', ['copy:assets', 'shell:assets']);
    grunt.registerTask('build', ['copy:alloy','stss', 'babel']);
    grunt.registerTask('dev', ['build','concurrent:run']);
    grunt.registerTask('test', ['tishadow:clear','build','concurrent:spec']);

    // only modify changed file
    grunt.event.on('watch', function(action, filepath) {
        var o = {};
        if (filepath.match(/.es6/)) {
            var target = filepath.replace(".es6",".js").replace("src/", "app/");
            o[target] = [filepath];
            grunt.config.set(['babel', 'dist', 'files'],o);
        } else if (filepath.match(/.stss$/) && filepath.indexOf("includes") === -1) {
            if (filepath.match(/\/_.*?\.stss/)) {
                grunt.log.write("Partial modified, rewriting all styles");
                grunt.task.run('stss');
            } else {
                var target = filepath.replace(".stss",".tss").replace("src/", "app/");
                o[target] = [filepath];
                grunt.config.set(['stss', 'compile', 'files'],o);
            }
        } else if (filepath.match(/^src/)) {
            var target = filepath.replace("src/", "app/");
            o[target] = [filepath];
            grunt.config.set(['copy','alloy','files'],o);
        }
    });
};
