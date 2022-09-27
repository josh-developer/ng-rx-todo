Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore

@josh-developer
josh-developer
/
CI-CD-practice
Public
Code
Issues
Pull requests
1
Actions
Projects
Wiki
Security
1
Insights
Settings
We found potential security vulnerabilities in your dependencies.
Only the owner of this repository can see this message.

CI-CD-practice/karma.conf.js /

u.sadullaev run prettier
Latest commit 966cd01 20 hours ago
 History
 0 contributors
41 lines (40 sloc)  1.38 KB

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/ng-rx-todo"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome", "ChromeHeadlessNoSandbox"],
    singleRun: false,
    restartOnFileChange: true,
  });
};
