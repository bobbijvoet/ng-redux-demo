module.exports = {
    sources: {
        scripts: [
            '!./app/**/*.spec.js',
            'node_modules/redux/dist/redux.js',
            './app/*.module.js',
            './app/**/*.module.js',
            './app/**/*.js'
        ],
        styles: ['./styles/**/*.scss'],
        templates: ['!./app/*.html', './app/**/*.html']
    },
    paths: {
        app: './app',
        output: './build',
        temp: './tmp',
        styles: './styles',
        dist: './dist',
        config: './config'
    }
};

