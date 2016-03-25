module.exports = function(grunt) {

    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-coffee");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            files: ["src/assets/less/*.less", "src/assets/coffee/**/*.coffee"],
            tasks: ["less", "coffee:compile"],
            options: {
                spawn: false
            }
        },
        coffee: {
            compile: {
                files: [{
                    cwd: "src/assets/coffee",
                    expand: true,
                    flatten: false,
                    src: ["**/*.coffee"],
                    dest: "src/assets/js",
                    ext: ".js",
                    extDot: "last"
                }],
                options: {
                    bare: true
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["src/assets/less"]
                },
                files: {
                    "src/assets/css/application.css": "src/assets/less/application.less"
                }
            }
        }
    });

    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("grunt-contrib-coffee");
    grunt.registerTask("grunt-contrib-less");
    grunt.registerTask("grunt-contrib-watch");
};
