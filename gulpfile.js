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
    return gulp.src('app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Таск для JS
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// Таск для оптимізації зображень
gulp.task('images', function() {
    return gulp.src('app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});

// Налаштування BrowserSync
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('app/*.html', gulp.series('html'));
    gulp.watch('app/scss/*.scss', gulp.series('scss'));
    gulp.watch('app/js/*.js', gulp.series('scripts'));
    gulp.watch('app/images/*', gulp.series('images'));
});

// Таск за замовчуванням
gulp.task('default', gulp.series('html', 'scss', 'scripts', 'images', 'serve'));