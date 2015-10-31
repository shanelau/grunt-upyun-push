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

    var path = require('path');
    var all = [];

    var config = this.options();
    var upyClient = new upyun(config.bucket, config.username, config.password);


    // Iterate over all specified file groups.
  	this.files.forEach(function(f) {
      var paths = f.src.filter(function(filepath) {
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

    async.forEach(all, function(file, cb) {

      var dest = file[0]
        , filepath = file[1];


      upyClient.getFileInfo(dest, function(err, data) {
        // Check if file exists
        if(config.force || (err !== null && err.statusCode === 404)) {
          fs.readFile(filepath, function(err, data) {
            upyClient.writeFile(dest, data, true, function(err, data) {
              grunt.log.writeln('Pushed ' + dest, data);
            })
          })
        }
      })

    })

  });

};
