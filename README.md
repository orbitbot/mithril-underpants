# mithril-underpants
> Quick &amp; dirty setup for your adventures with Mithril

http://lhorie.github.io/mithril/

- intended folder structure & functionality

- how to checkout

<br>
### Features

- Gulp build system
- 




### How to use


<br>
### Intended project structure

    ../
      build  /              <-- transformed static assets generated from src folder
          css/                  with gulp tasks, served by development server.
          js/
          index.html            files are excluded from version control, as they
                                should be re-generated consistently from the src
                                folder content, and change frequently

      config/               <-- configuration for tests and linting, etc.

      dist/                 <-- same as develop folder, but optimized for production
          ../                   (minification etc.). files are included in version
                                control and should only be updated when releases are
                                made
      src/
          app/              <-- angular.js code & unit tests
              components/     <-- individual UI components and their html, css and
                                  controller code, as well as unit tests. If it has
                                  a controller, it belongs here.
              model/          <-- data and state modeling
              services/       <-- sock drawer
              templates/      <-- template files that do not belong under components
              utils/          <-- directives, trivial services, reusable code
              webrtc/         <-- interaction with browser WebRTC functionality

              app.js          <-- base application module (config, routes etc.)

          assets/           <-- static assets
              css/            <-- base structural (non-library) css files
              less/
              ../

          index.html        <-- Compilation template file, which defines the top-level
                                output index.html structure

      test/                 <-- integration & scenario tests, test reports
          integration/        <-- E2E test specifications
          results/            <-- test reports for CI, git exclude when set up

      bower.json              <-- bower package management
      gulpfile.js             <-- task runner configuration
      package.json            <-- NPM package management

<br>
### Workflow commands

Workflow commands are available using Gulp, you can list the high level selection with

    $ gulp   # (or gulp help)
    # ...

    build        Compile the current sources into the build/ folder
    develop      Build and serve build/ folder, running tests and updating whenever a file is changed
    eslint       Run eslint on javascript files
    help         Display this help text.
    integration  Run integration tests
    karma        Run unit tests
    less-lint    Run lint checks on LESS files
    release      Compile a new release from current sources
    serve        Serve build/ folder with Browser-sync
    serveDist    Serve dist/ folder with Browser-sync
    testRelease  Run integration tests on release folder

Additional sub-tasks exist, see `gulpfile.js` for full functionality.

<br>
### Running tests

After installation (*NB.* examples depend on `gulp` being available as a global package, also for CI machine), the following commands can be used:

- unit tests: `gulp karma`
- integration tests: `gulp integration`

Test setup configuration can be found in `config/karma.conf`, and `config/protractor.conf` in combination with `gulpfile.js`.

<br>
### Colophon

- the example source code was mostly adapted from [mithril-query](https://github.com/StephanHoyer/mithril-query)

<br>
### Notes

- ```mithril-underpants``` uses a Browserify-build of [mithril-query](https://github.com/StephanHoyer/mithril-query) 
  to be able to write expressive tests. Ideally this would not be required, since this requires a manual step to 
  update if the source package gets upgraded.
