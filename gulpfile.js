/**
 * gulpfile.js - Gulp task automation for Study Night
 */

import gulp from "gulp";
import shell from "gulp-shell";

/**
 * Default task: Run Parcel dev server on http://localhost:1234
 */
gulp.task(
  "default",
  shell.task("npx parcel src/index.html --port 1234", {
    verbose: true,
  }),
);

/**
 * Build task: Generate optimized dist/ folder with Parcel
 */
gulp.task(
  "build",
  shell.task("npx parcel build src/index.html", {
    verbose: true,
  }),
);

/**
 * Test task: Run Mocha unit tests
 */
gulp.task(
  "test",
  shell.task("npx mocha", {
    verbose: true,
  }),
);

/**
 * Cypress task: Run Cypress E2E tests in headless mode
 */
gulp.task(
  "cypress",
  shell.task("npx cypress run", {
    verbose: true,
  }),
);

/**
 * Lint task: Run ESLint on source files
 */
gulp.task(
  "lint",
  shell.task("npx eslint src/", {
    verbose: true,
  }),
);

/**
 * Format task: Run Prettier on source files
 */
gulp.task(
  "format",
  shell.task('npx prettier --write "src/**/*.{js,css,html}"', {
    verbose: true,
  }),
);

/**
 * Combined test task: Run both Mocha and Cypress tests
 */
gulp.task("test:all", gulp.series("test", "cypress"));

/**
 * CI task: Lint, test, and build
 */
gulp.task("ci", gulp.series("lint", "test", "build"));
