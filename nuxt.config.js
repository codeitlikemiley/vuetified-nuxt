require('dotenv').config()
var nodeExternals = require('webpack-node-externals');

module.exports = {
    srcDir: __dirname,
    env: {
        apiUrl: process.env.API_URL,
        appName: process.env.APP_NAME,
        appLocale: process.env.APP_LOCALE
    },
    head: {
        title: process.env.DEFAULT_TITLE,
        titleTemplate: '%s | ' + process.env.APP_NAME,
        meta: [
            { charset: 'utf-8' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
            { name: 'viewport', content: 'width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes' },
            { name: 'og:locale', content: 'en_US' },
            { name: 'googlebot', content: 'index,follow' },
            { name: 'robots', content: 'index,follow,noodp' },
            { name: 'description', content: 'DEFAULT Description' },
            { name: 'country', content: 'Philippines' },
            { name: 'revisit-after', content: '7 days' },
            { name: 'mobile-web-app-capable', content: 'yes' },
            //! Add Here Your Social Network SEO
            {
                property: 'og:image',
                content:
              'https://user-images.githubusercontent.com/904724/26879447-689b56a8-4b91-11e7-968f-5eea1d6c71b4.png'
            },
            { property: 'twitter:card', content: 'summary_large_image' },
            { property: 'twitter:site', content: '@nuxt_js' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    loading: { color: '#007bff' },
    router: {
        middleware: ['locale', 'check-auth']
    },
    css: [
        { src: 'roboto-base64', lang: 'css' },
        { src: '~assets/style/app.styl', lang: 'stylus' },
        { src: '~assets/sass/app.scss', lang: 'scss' }
    ],
    plugins: [
        // '~components/global',
        '~/plugins/i18n',
        '~/plugins/axios',
        '~/plugins/fontawesome',
        '~/plugins/vform',
        '~/plugins/vuetify'
        // '~plugins/nuxt-client-init', //! UNCOMMENT FOR SPA MODE ONLY
    ],
    modules: [
        '@nuxtjs/router',
        // '~/modules/spa',
        '@nuxtjs/apollo',
        [
            'nuxt-env', {
                keys: [
                    'API_URL', 'APP_NAME', 'APP_URL', 'APP_LOCALE', 'APP_TRADEMARK',
                    'SITE_ADDRESS', 'SITE_CITY', 'SITE_STATE', 'SITE_CONTACT_NO', 'SITE_COUNTRY', 'SITE_EMAIL'
                ]
            }
        ]
    ],
    apollo: {
        clientConfigs: {
            default: '~/apollo/client-configs/default.js'
        }
    },
    build: {
        babel: {
            plugins: [
                ['transform-imports', {
                    'vuetify': {
                        'transform': 'vuetify/es5/components/${member}',
                        'preventFullImport': true
                    }
                }]
            ]
        },
        //! This Will Export The Script in A Vendor.js */
        vendor: [
            '~/plugins/vuetify.js'
        ],
        extractCSS: true,
        /*
      ** Run ESLint on save
      */
        extend (config, { isDev, isClient, isServer }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
            if (isServer) {
                //! Externalize app dependencies. This makes the server build much faster
                //! and generates a smaller bundle file. -> /\.css$/
                config.externals = [
                    nodeExternals({
                        //! this will be included in the bundle
                        //! needed since we use ala carte in vuetify
                        whitelist: [/^vuetify/]
                    })
                ]
            }
            //! add All Your webpack Aliases here
            config.resolve.alias['@fortawesome/fontawesome-free-solid$'] = '@fortawesome/fontawesome-free-solid/shakable.es.js'
        },
        filenames: {
            css: 'common.[contenthash].css',
            manifest: 'manifest.[hash].js',
            vendor: 'common.[chunkhash].js',
            app: 'app.[chunkhash].js',
            chunk: '[name].[chunkhash].js'
        }
    }
};
