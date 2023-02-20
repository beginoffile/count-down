const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
   
module.exports = (env, argv) =>{
    
    if (argv.mode === "development")
    return {

        experiments: {          
            topLevelAwait: true,
          },


        

        output: {
            clean: true
        },
        // devServer: {
        //     contentBase: "dist",
        //     publicPath: "/",
        //     //open: true,
        //     open: "firefox",
        //     hot: false,
        //     liveReload: true,
        //     historyApiFallback: true,
        // },
        devServer: {            
            static: {
                directory: path.join(__dirname, 'dist'),               
              },
              open: [{
                app: {
                    name: 'firefox',
                    arguments: ['--incognito', '--new-window'],                    
                    
                  },
                  
                 }              
            ],              
                
        
              compress: true,
              port: 9001,
              historyApiFallback: true, // SPA
            //   https: true,
              
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        sources: false
                    }
                },
                /*
                {
                    test: /\.css$/,
                    exclude: /styles.css$/,
                    use: [ 'style-loader', 'css-loader']
                },
                */
                {
                    test: /\.css$/i,
                    exclude: /styles.css$/,
                    use: ["raw-loader"],
                },
                
                {
                    test: /styles.css$/,
                    use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
                }/* ,
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'file-loader'
                }
                */,
                {

                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
            
                    type: 'asset/resource',
            
                },
                {

                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
            
                    type: 'asset/resource',
            
                },
            ]
        },
    
        optimization: {},
    
        plugins: [

            new WebpackPwaManifest({
                name: 'Nombre de la App',
                short_name: 'App',
                description: 'App Template',
                theme_color: '#8C54A4',
                background_color: '#8C54A4',
                display: 'standalone',
                dir:'',
                inject:true,
                start_url: '/',
                publicPath: '/',                
                includeDirectory: false,
                fingerprints: true,
                crossorigin: null,                
                // crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
                icons: [
                  {
                    src: path.resolve('src/assets/iconos/javascript.png'),
                    sizes: [72, 96, 128, 144, 152, 192, 384, 512] // multiple sizes
                  },
                 
                ]
              }),

            new HtmlWebpackPlugin({
                title: 'Mi Webpack App',
                //filename: "index.html", // output file
                template: './src/index.html',
                favicon: './src/assets/iconos/javascript.png'
            }),

            
            
            new MiniCssExtractPlugin({
                filename: '[name].css',
                ignoreOrder: false
            }),            

            new CopyPlugin({
                patterns:[
                    { from: "./src/assets/images", to: "./assets/images" },
                    { from: "./src/assets/iconos", to: "./assets/iconos" },
                    { from: "./src/assets/videos", to: "./assets/videos" },
                    {
                        from: "node_modules/@fortawesome/fontawesome-free/webfonts/*.*",
                        to() {
                            return "fortawesome/fontawesome-free/webfonts/[name][ext]";
                        }

                    },
                    {
                        from: "node_modules/@fortawesome/fontawesome-free/css/all.css",
                        to() {
                            return "fortawesome/fontawesome-free/css/[name][ext]";
                        }

                    },                  
                ]
            }),

           

        ]

    }

    if (argv.mode === "production")
    return {
        output: {
            clean: true,
            filename: 'main.[contenthash].js'
        },
        
    
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                    options: {
                        sources: false
                    }
                },
                /*
                {
                    test: /\.css$/,
                    exclude: /styles.css$/,
                    use: [ 'style-loader', 'css-loader']
                },
                */
                {
                    test: /\.css$/i,
                    exclude: /styles.css$/,
                    use: ["raw-loader"],
                },
               
                {
                    test: /styles.css$/,
                    use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
                }/* ,
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'file-loader'
                } */,
                {

                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
            
                    type: 'asset/resource',
            
                },
                {

                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
            
                    type: 'asset/resource',
            
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: "babel-loader",
                      options: {
                        presets: ['@babel/preset-env']
                      }
                    }
                },
                 // Manifest icons
                {
                    test: /\.png$/,
                    type: 'asset/resource',
                    generator: {
                    filename: 'manifest/[name]-[contenthash:8][ext][query]',
                    },
                },
            ]
        },
    
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin(),
            ]
        },
    
        plugins: [

            new WebpackPwaManifest({
                name: 'Nombre de la App',
                short_name: 'App',
                description: 'App Template',
                theme_color: '#8C54A4',
                background_color: '#8C54A4',
                display: 'standalone',
                dir:'',
                inject:true,
                start_url: '/',
                publicPath: '/',                
                includeDirectory: false,
                fingerprints: true,
                crossorigin: null,                
                // crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
                icons: [
                  {
                    src: path.resolve('src/assets/iconos/javascript.png'),
                    sizes: [72, 96, 128, 144, 152, 192, 384, 512] // multiple sizes
                  },
                 
                ]
            }),

            new HtmlWebpackPlugin({
                title: 'Mi Webpack App',
                // filename: 'index.html',
                template: './src/index.html',
                favicon: './src/assets/iconos/javascript.png'                
            }),            
            
            new MiniCssExtractPlugin({
                filename: '[name].[fullhash].css',
                ignoreOrder: false
            }),

            new CopyPlugin({
                patterns:[
                    { from: "./src/assets/images", to: "./assets/images" },
                    { from: "./src/assets/iconos", to: "./assets/iconos" },
                    { from: "./src/assets/videos", to: "./assets/videos" },
                    {
                        from: "node_modules/@fortawesome/fontawesome-free/webfonts/*.*",
                        to() {
                            return "fortawesome/fontawesome-free/webfonts/[name][ext]";
                        }

                    },
                    {
                        from: "node_modules/@fortawesome/fontawesome-free/css/all.css",
                        to() {
                            return "fortawesome/fontawesome-free/css/[name][ext]";
                        }

                    },
                  
                ]
            })
            
        ]
    }
}
