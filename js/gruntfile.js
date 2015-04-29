module.exports = function(grunt){
  grunt.initConfig({
    jshint: {
      src: ['test/*.js','gruntfile.js','main.js'],
      options: {
        globals: {
          describe:true,
          it:true
        },
        node:true,
        mocha:true
      }
    },
    simplemocha:{
      src: ['test/*.js']
    },
    watch:{
      scripts: {
        files: ['test/*.js','gruntfile.js','main.js'],
        tasks: ['jshint','simplemocha']
      }
    }
  });

  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'test']);

  grunt.registerTask('test', 'simplemocha');

};
