module.exports = {
    entry: [
        "./src/entry.js"
    ],
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js"
    },
    // 解析
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/, 
                use: ["babel-loader"], 
                exclude: /node_modules/ 
            },
            { 
                test: /\.css$/, 
                use: ["style-loader","css-loader"], 
                exclude: /node_modules/ 
            },
            { 
                test: /\.less$/, 
                use: ["style-loader","css-loader","less-loader"], 
                exclude: /node_modules/ 
            },
            {
                test: /\.(jpg|png|gif|jpeg)/,
                
                use:[
                    {
                        loader:'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]',
                            outputPath: '/images/',
                            publicPath: './dist'
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    }
};