const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

let imagemin;
(async () => {
    imagemin = (await import('gulp-imagemin')).default;
})();

gulp.task('images', async function() {
    return gulp.src('app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('scss', function() {
    return gulp.src('app/scss/*.scss') // Source your SCSS files
        .pipe(sass().on('error', sass.logError)) // Compile and minify SCSS
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' })) // Rename the output file with .min suffix
        .pipe(gulp.dest('dist/css')) // Output to dist/css
        .pipe(browserSync.stream()); // Inject changes without reloading the browser
});

gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src('app/images/*', { encoding: false })
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('app/scss/*.scss', gulp.series('scss'));
    gulp.watch('app/*.html', gulp.series('html')).on('change', browserSync.reload);
    gulp.watch('app/js/*.js', gulp.series('scripts')).on('change', browserSync.reload);
    gulp.watch('app/images/*', gulp.series('images')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('html', 'scss', 'scripts', 'images', 'serve'));