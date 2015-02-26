/*
 * grunt-upyun-push
 * https://github.com/Black-Mirror/grunt-upyun-push
 *
 * Copyright (c) 2015 xiao-jianfeng@qq.com
 * Licensed under the MIT license.
 */


module.exports = function(grunt) {
  'use strict';

  var path = require('path');
  var fs = require('fs');

  // 官方 npm upyun 包不方便使用, 单独使用他们的 nodejs sdk 包
  var upyun = require("./upyun-lib").UPYun;

  grunt.registerMultiTask('upyun', 'Your task description goes here.', function() {

  	var done = this.async();
  	var async = grunt.util.async;
    var options = this.options();

    var path = require('path');
    var all = []

    var auth;
    var config;
    // 密码存到另外的文件中，注意要 ignore 掉
    var authConfig = '.ftppass';
    if (grunt.file.exists('./' + authConfig)) {
      config = grunt.file.read('./' + authConfig);
      if (config.length) {
        auth = JSON.parse(config);
      }
    }

    if(!auth) {
      grunt.log.warn('auth file "' + authConfig + '" not found.');
      return
    }
    var upyClient = new upyun(auth.bucket, auth.username, auth.password);

    // console.log('auth: ', auth.bucket, auth.username, auth.password)
    // return;

    // console.log(this.files)

    // Iterate over all specified file groups.
  	this.files.forEach(function(f) {
      var paths = f.src.filter(function(filepath) {
        console.log('Pushing ', filepath)
  			// Warn on and remove invalid source files (if nonull was set).
  			if (!grunt.file.exists(filepath)) {
  				grunt.log.warn('Source file "' + filepath + '" not found.');
  				return false;
  			} else {
  				return true;
  			}
  		}).map(function(filepath) {
  			all.push([f.orig.expand ? f.dest : path.join(f.dest, filepath), filepath]);
  		})
  	});
    // console.log(all)

    async.forEach(all, function(file, cb) {

      var dest = file[0]
        , filepath = file[1]
        ;

      // console.log(grunt.file.read(filepath))
      // console.log(cb.toString())

      fs.readFile(filepath, function(err, data) {
        upyClient.writeFile(dest, data, true, function(err, data) {
          grunt.log.writeln('Pushed ' + dest, data);
        })
      })

    })

  });

};
