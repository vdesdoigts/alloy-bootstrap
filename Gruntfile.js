module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            project: {
                src: [
                    "app/alloy.js",
                    "app/alloy.js.map",
                    "app/coffee/**/*.js",
                    "app/coffee/**/*.js.map",
                    "app/controllers/**",
                    "app/controllers/**",
                    "app/lib/**",
                    "app/styles/**",
                    "build/",
                    "Resources/"
                ]
            },
            assets: {
                src: [
                    "iTunesConnect.png",
                    "GooglePlay.png",
                    "platform/**",
                    "app/assets/images",
                    "app/assets/iphone/**/*.png", "app/assets/iphone/**/*.jpg",
                    "!app/assets/iphone/images/*@3x.png", "!app/assets/iphone/images/*@3x.jpg",
                    "app/assets/android/images", "app/assets/android/**/*.png", "app/assets/android/**/*.jpg",
                    "!app/assets/android", "!app/assets/android/appicon.png",
                    "app/assets/iphone/iTunesArtwork",
                    "!app/assets/iphone/iTunesArtwork@2x",
                    "!app/assets/android/fonts/*",
                    "!app/assets/iphone/fonts/*"
                ]
            }
        },
        coffee: {
            options: {
                bare: true,
                sourceMap: false
            },
            compile: {
                files: [{
                    expand: true,
                    src: ["**/*.coffee"],
                    dest: "app/",
                    cwd: "app/coffee",
                    ext: ".js"
                }]
            }
        },
        ltss: {
            compile: {
                files: [{
                    expand: true,
                    cwd: 'app/ltss',
                    src: ['**/*.ltss','!**/includes/**'],
                    dest: 'app/styles',
                    ext: '.tss'
                }]
            }
        },
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
                command: "ticons icons"
            },
            splashes: {
                command: "ticons -a splashes `pwd`/app/assets/splash-2024x2024.jpg --no-nine"
            },
            assets: {
                command: "ticons -a assets"
            }
        },
        tishadow: {
            options: {
                update: true,
            },
            run_android: {
                command: 'run',
                options: {
                    locale: 'en',
                    platform: 'android'
                }
            },
            run_ios:{
                command: 'run',
                options: {
                    locale: 'en',
                    platform: 'ios'
                }
            },
            run: {
                command: 'run',
                options: {
                    locale: 'en',
                }
            },
            spec_android: {
                command: 'spec',
                options: {
                    update: false,
                    platform: ['android'],
                }
            },
            spec_ios:{
                command: 'spec',
                options: {
                    update: false,
                    platform: ['ios'],
                }
            },
            clear: {
                command: 'clear',
                options: {}
            }
        },
        watch: {
            options: {
                nospawn: false
            },
            ios: {
                files: ["tiapp.xml", "i18n/**", "app/config.json", "app/**/*.xml", "app/**/*.ltss", "app/coffee/**/*.coffee", "app/widgets/**/*.js", "app/widgets/**/*.tss", "app/widgets/**/*.xml"],
                tasks: ['build','tishadow:run_ios']
            },
            android: {
                files: ["tiapp.xml", "i18n/**", "app/config.json", "app/**/*.xml", "app/**/*.ltss", "app/coffee/**/*.coffee", "app/widgets/**/*.js", "app/widgets/**/*.tss", "app/widgets/**/*.xml"],
                tasks: ['build','tishadow:run_android']
            },
            all: {
                files: ["tiapp.xml", "i18n/**", "app/config.json", "app/**/*.xml", "app/**/*.ltss", "app/coffee/**/*.coffee", "app/widgets/**/*.js", "app/widgets/**/*.tss", "app/widgets/**/*.xml"],
                tasks: ['build','tishadow:run']
            }
        },
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', 'build');
    grunt.registerTask('build', ['coffee', 'ltss']);
    grunt.registerTask('ticons', ['shell:icons', 'shell:splashes', 'shell:assets']);

    grunt.registerTask('dev_ios', ['build','tishadow:run_ios','watch:ios']);
    grunt.registerTask('dev_android', ['build','tishadow:run_android','watch:android']);
    grunt.registerTask('dev_all', ['build','tishadow:run','watch:all']);

    // titanium cli tasks
    ['iphone6','iphone7','ipad6','ipad7','appstore','adhoc','playstore'].forEach(function(target) {
        grunt.registerTask(target, ['build','shell:'+target]);
    });

    // only modify changed file
    grunt.event.on('watch', function(action, filepath) {
        var o = {};
        if (filepath.match(/.ltss$/) && filepath.indexOf("includes") === -1){
            o[filepath.replace(".ltss",".tss")] = [filepath];
            grunt.config.set(['ltss', 'compile', 'files'],o);
        }
    });
};
