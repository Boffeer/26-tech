const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const pugLinter = require('gulp-pug-linter');
const htmlValidator = require('gulp-w3c-html-validator');
const sass = require('gulp-sass');
    sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const shorthand = require('gulp-shorthand');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const rename = require('gulp-rename');

const image = require('gulp-image');
const responsive = require('gulp-responsive');

const sync = require('browser-sync');
// const browserSync = require('browser-sync').create();

// const styles = require('./gulp/tasks/styles.js');
// module.exports.styles = gulp.series(styles)

// const pug2html = require('./gulp/tasks/pug2html.js');
// module.exports.pug = gulp.series(pug2html)


// const scripts = require('./gulp/tasks/scripts.js');
// module.exports.scripts = gulp.series(scripts)



// ==== PUG ====
const pug2html = () => {
	return gulp.src('dev/pages/*.pug')
		.pipe(plumber())
		.pipe(pugLinter({ reporter: 'default' }))
		.pipe(pug())
		.pipe(htmlValidator())
		.pipe(gulp.dest('build'))
		.pipe(sync.stream());

}

exports.pug2html = pug2html;
// ---- pug ----



// ==== CSS ====
const styles = () => {
	return gulp.src('./dev/styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		// Сорсмапы добавляли к весу файла довольно много
		// Инит сорсмапов перед взаимодействием с кодом
		// .pipe(sourcemaps.init())
		.pipe(autoprefixer({
		        cascade: false
		    }))
		.pipe(shorthand())
		.pipe(cleanCSS())
		// .pipe(sourcemaps.write())

		.pipe(gulp.dest('./build/css'))
		.pipe(sync.stream());
}

exports.styles = styles;
// ---- css ----



// ==== JS ====
const scripts = () => {
	return gulp.src('dev/js/main.js')
		// .pipe(eslint())
		// .pipe(eslint.format())
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(terser())
		.pipe(sourcemaps.write())
		.pipe(rename({ suffix: '.min'}))
		.pipe(gulp.dest('build/js'))
		.pipe(sync.stream());

}

exports.scripts = scripts;
// ---- js ----

// ==== IMG ====

const imgDev = () => {
	// add webp, copy just as several pics with differernt names
	return gulp.src([
		'dev/img/**/*'
	], {
		base: 'dev'
	})
	.pipe(gulp.dest('build/'))
	// .pipe(syc.stream({
	// 	once: true
	// }));
}

exports.imgDev = imgDev;


const imgMultiply = () => {
	return gulp.src('dev/img/**/*.{png,jpg,jpeg}')
		.pipe(
			responsive({
				'**/*.png':[
					{ progressive: true, },
					{ format: 'webp', },
					{
						withoutEnlargement: false,
						width: '200%',
						rename: { suffix: "@2" },
					},
					{
						withoutEnlargement: false,
						width: '200%',
						format: 'webp',
						rename: { suffix: "@2" },
					},
				],				
				'**/*.jpg':[
					{ progressive: true, },
					{ format: 'webp', },
					{
						withoutEnlargement: false,
						width: '200%',
						rename: { suffix: "@2" },
					},
					{
						withoutEnlargement: false,
						width: '200%',
						format: 'webp',
						rename: { suffix: "@2" },
					},
				],

			})
		)
		.pipe(gulp.dest('temp/img'));
}

exports.imgMultiply = imgMultiply;



const imgBuild = () => {
	return gulp.src('temp/img/**/*')
		.pipe(image({
			pngquant: true,
			optipng: true,
			zopflipng: true,
			jpegRecompress: false,
			mozjpeg: true,
			gifsicle: true,
			svgo: true,
			concurrent: 10,
			quiet: false
		}))
		// .pipe(gulp.dest('build-test/img'))
		.pipe(gulp.dest('build/img'))
	// преобразование в вебп, разные размеры картинок
}

exports.imgBuild = imgBuild;
// ---- img ----




// ==== COPY ====
const copy = () => {
	return gulp.src([
		'dev/img/**/*',
		'dev/fonts/**/*',
	], {
		base: 'dev'
	})
	.pipe(gulp.dest('build'))
	.pipe(sync.stream({
		once: true
	}));
}

exports.copy = copy;
// ---- copy ----



// ==== SERVER ====
const server = () => {
	sync.init({
		ui: false,
		notify: false,
		server: {
			baseDir: 'build'
		}
	});
}

exports.server = server;
// ---- server ----



// ==== WATCH ====
const watch = () => {
	gulp.watch('dev/pages/**/*.pug', gulp.series(pug2html));
	gulp.watch('dev/styles/**/*.scss', gulp.series(styles));
	gulp.watch('dev/js/*.js', gulp.series(scripts));

	gulp.watch('dev/img/**/*', gulp.series(imgDev));


	gulp.watch('dev/fonts/**/*')
}

exports.watch = watch;
// ---- watch ---



// ==== DEAFULT ====
exports.default = gulp.series(
	gulp.parallel(
		pug2html,
		styles,
		scripts,
		copy,
		imgDev
	),
	// 'paths',
	gulp.parallel(
		watch,
		server
	)
);
// ---- default



// ==== BUILD ====
const build= gulp.series(
	gulp.parallel(
		pug2html,
		styles,
		scripts,
		imgMultiply,
		imgBuild
	)
);

exports.build = build;
// ---- build ----


// // HTML
// const html = () => {
// 	return gulp.src('dev/*.html')
// 		.pipe(htmlmin({
// 			removeComments: true,
// 			collapseWhitespaces: true,
// 		}))
// 		.pipe(gulp.dest('build'))
// 		.pipe(sync.stream());
// }

// exports.html = html;



// // Static server
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "build/"
//         }
//     });
// });





// exports.default = sass;
// exports.default = series(sass, browserSync);