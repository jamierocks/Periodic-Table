const config = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            },
            {
                test: /\.png$/,
                use: [ {
                    loader: 'file-loader'
                }],
            }
        ]
    },
    entry: {
        index: './src/js/index.js',
        dropdown: './src/js/dropdown.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'js/[name].js'
    }
};

module.exports = config;
