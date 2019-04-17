module.exports = (env, argv) => {
    const path                    = require("path");
    const webpack                 = require("webpack");
    const IconfontWebpackPlugin   = require("iconfont-webpack-plugin");
    const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
    const UglifyJsPlugin          = require("uglifyjs-webpack-plugin");
    const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
    const development             = argv.mode;
    const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

    // IN and OUT
    const config = {
        entry: {
            custom: './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, './opencode/js'),
            filename: '[name].js'
        }
    };

    // Resolve
    config.resolve = {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            Config: path.resolve(__dirname, './src/core/config'),
            Core: path.resolve(__dirname, './src/core'),
            Assets: path.resolve(__dirname, './src/assets'),
            Snippets: path.resolve(__dirname, './src/assets/snippets'),
            Modules: path.resolve(__dirname, './src/assets/modules'),
            Pages: path.resolve(__dirname, './src/assets/pages')
        }
    };

    //  Plugins
    config.plugins = [
        new SpriteLoaderPlugin({
            plainSprite: true,
            spriteAttrs: {
                id: 'sprite-svg'
            }
        }),
        new MiniCssExtractPlugin({
            filename: "./../css/[name].css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Zepto: "jquery"
        })
    ];

    // Modules
    config.module = {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    plugins: ["transform-runtime", "transform-object-rest-spread"],
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            publicPath: '../elements/',
                            spriteFilename: 'sprite.html'
                        }
                    },
                    'svgo-loader'
                ]
            },
            {
                test: /\.(styl|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {  
                            plugins: (loader) => [
                                new IconfontWebpackPlugin(loader),
                                require('autoprefixer')({
                                    browsers: ['last 2 versions'],
                                    grid: true
                                }),
                                require('postcss-object-fit-images')
                            ]
                        }
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            import: path.resolve(__dirname, './src/assets/settings.styl')
                        }
                    },
                ]
            }
        ]
    };

    // Production 
    if(development == 'production') {
        config.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: false,
                    uglifyOptions: {
                        compress: {
                            drop_console: true,
                        }
                    }
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        }
    }
    
    return config;
}