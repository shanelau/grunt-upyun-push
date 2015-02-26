# grunt-upyun-push  [![Build Status](https://travis-ci.org/Black-Mirror/grunt-upyun-push.svg?branch=master)](https://travis-ci.org/Black-Mirror/grunt-upyun-push) [![npm version](https://badge.fury.io/js/grunt-upyun-push.svg)](http://badge.fury.io/js/grunt-upyun-push)

> 最简单的 push 文件到又拍云 grunt 插件

## 说明

源自：https://github.com/gockxml/grunt-upyun/ （1 年未更新了）

## 如果没有用过 grunt 请看 [http://gruntjs.com/](http://gruntjs.com/)

## 安装


```shell
npm install grunt-upyun-push --save-dev
```

在 Gruntfile.js 中加上

```js
grunt.loadNpmTasks('grunt-upyun-push');
```

## 配置

### 配置选项

#### options.files

Grunt 经典文件列表配置

Type: `Array`
Default value: `[]`


#### options.files.expand

请参考 [Grunt building-the-files-object](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically)


#### options.files.dest

Push 到 cdn 的目标目录

Type: `Array`
Default value: `[]`


#### options.files.cwd

以哪个目录为要 push 操作的根目录

Type: `Array`
Default value: `[]`

#### options.files.src

请参考 [Grunt configuring-tasks#files](http://gruntjs.com/configuring-tasks#files)


#### options.files.filter

请参考 [Grunt custom-filter-function](http://gruntjs.com/configuring-tasks#custom-filter-function)


### 配置 demo

> 静态资源如下：
    /local/wait-to-push/dist/app.js
    /local/wait-to-push/dist/webapp.css


配置如：

```js
grunt.initConfig({
  upyun: {
    th_static: {
      files: [{
        expand: true,
        dest :'/tests/build/static/dist/',
        cwd: './tests/local/wait-to-push/dist/',
        src: ['**/*.js', '**/*.css'],
        filter: 'isFile'
      }]
    },
    images: {
      files: [{
        expand: true,
        dest :'/tests/cdn/url/images/',
        cwd: './tests/local/wait-to-push/images/',
        src: ['**/*.png', '**/*.jpg', '**/*.gif']
      }]
    }
  }
})
```

> push 结果如下：
    http://your-upyun-domain.com/build/static/dist/app.js
    http://your-upyun-domain.com/build/static/dist/webapp.css
    http://your-upyun-domain.com/cdn/url/images/1.jpg
    http://your-upyun-domain.com/cdn/url/images/2.png



## Release History

* 2015-02-11   v0.1.1   补充 readme
* 2014-10-11   v0.1.0   Initial commit



