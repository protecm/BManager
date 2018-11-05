System.config({
    map:{
        app: 'app',
        angular: 'vendors/angular.min.js'
    },
    packages:{
        app: {
            main: './app.main.min.js',
            defaultExtension: 'min.js'
        }
    }
});