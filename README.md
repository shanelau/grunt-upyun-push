# grunt-upyun-upload

> 最简单的 push 文件到又拍云 upyun grunt 插件

## 说明


```shell
npm install grunt-upyun-upload --save-dev
```

在 Gruntfile.js 中加上

```js
grunt.loadNpmTasks('grunt-upyun-upload');
```

## 配置

```
  grunt.initConfig({
      upyun: {
        // 所有任务配置
        options:{
          "bucket": "bucket",
          "username": "username",
          "password": "password",
          "force": true  // 是否覆盖之前的文件
        },
        html: {
            files: [{
            dest :'/build/',
            expand:true,
            cwd:'build/',
            src :['**']
          }]
        },
        otherTask: {

        }
   });
   grunt.loadNpmTasks('grunt-upyun-upload');
```

### 配置选项

`files` 中的配置，参考grunt官方文档





