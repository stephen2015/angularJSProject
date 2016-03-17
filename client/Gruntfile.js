/**
 * Created by Stephen on 2016-02-27/0027.
 */
module.exports = function (grunt) {
    //livereload的默认端口号
    var LIVERELOAD_PORT = 35729;
    //使用connect-livereload模块，生成一个liverelaod脚本
    var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
    //使用middleware（中间件），就必须关闭livereload的浏览器插件
    var serveStatic = require("serve-static");
    var serveIndex = require("serve-index");
    var lrMiddleware = function (connect, options, middlewares) {
        return [
            lrSnippet, //把脚本注入到静态文件中
            serveStatic(options.base[0]), //静态文件服务其的路径
            serveIndex(options.base[0])//启用目录浏览
        ];
    };
    var cfg = {
        // Change 'localhost' to '0.0.0.0' to access the server from outside.
        serverHost: 'localhost',
        serverPort: 8100,
        livereload: LIVERELOAD_PORT
    };
    //配置Grunt各种模块的参数
    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),
        cfg: cfg,
        //compass编译
        compass: {
            development: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css'
                }
            }
        },
        //css压缩代码
        cssmin: {
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: 'css/',
                ext: '.min.css'
            }
        },
        //js代码调试
        jshint: {
            options: {
                eqeqeq: true,
                trailing: true
            },
            file: ['js/custom.js']
        },
        //js代码压缩
        uglify: {
            options: {
                mangle: false
            },
            build: {
                files: {
                    'js/custom.min.js': ['js/custom.js']
                }
            }
        },
        //js文件合并
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['js/jquery.min.js', 'js/custom.min.js'],
                dest: 'js/script.min.js'
            }
        },
        connect: {
            options: {
                port: cfg.serverPort,
                hostname: cfg.serverHost,
                base : '.'
            },
            livereload: {
                options: {
                    //通过livereload脚本，让页面重新加载
                    middleware: lrMiddleware
                }
            }
        },
        open: {
            server: {
                url: "http://localhost:"+ cfg.serverPort
            }
        },
        //grunt watch
        watch: {
            compass: {
                files: 'sass/*',
                tasks: ['compass']
            },
            cssmin: {
                files: 'css/*',
                tasks: ['cssmin']
            },
            jshint: {
                files: 'js/*',
                tasks: ['jshint']
            },
            uglify: {
                files: 'js/*',
                tasks: ['uglify']
            },
            concat: {
                files: 'js/*',
                tasks: ['concat']
            },
            client:{
                options:{
                    livereload: true
                },
                files: [
                    "index.html",
                    "html/**/*.html",
                    "js/**/*.js",
                    "style/**/*.css",
                    "images/*.{png,jpg,jpeg,gif,svg}"
                ]
            }
            //使用下面这个的话将会遍历每个人事件，即使没有改动，所以建议把事件分开来，有改动时才执行
            /*,files:['sass/!*','css/!*','js/!*'],
             tasks:['compass','cssmin','jshint','uglify','concat']*/
        }
    });
    //从node_modules目录加载模块文件
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //每行registerTask定义一个任务
    grunt.registerTask('default', ['compass', 'cssmin:minify', 'jshint', 'uglify', 'concat', 'live']);
    //grunt.registerTask('default',['jshint','uglify','concat']);
    grunt.registerTask('live', ['connect', 'open', 'watch']);
};
