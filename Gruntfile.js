/*
 * grunt-upyun-push
 * https://github.com/Black-Mirror/grunt-upyun-push
 *
 * Copyright (c) 2015 xiao-jianfeng@qq.com
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    upyun: {
      options: {
        username: 'username',
        password: 'password',
        bucket  : 'bucket',
        force   : true // 是否强制覆盖
      },
      th_static: {
        files  : [{
          expand: true,
          dest  : '/tests/build/static/dist/',
          cwd   : './tests/local/wait-to-push/dist/',
          src   : ['**/*.js', '**/*.css'],
          filter: 'isFile'
        }]
      },
      images   : {
        options: {
          username: 'username',
          password: 'password',
          bucket  : 'bucket',
          force   : true // 是否强制覆盖
        },
        files  : [{
          expand: true,
          dest  : '/tests/cdn/url/images/',
          cwd   : './tests/local/wait-to-push/images/',
          src   : ['**/*.png', '**/*.jpg', '**/*.gif']
        }]
      }
    }
  })

  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['upyun']);

};
