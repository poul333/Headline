module.exports = {
    plugins: {
        //   'autoprefixer': {
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        //   },
        'postcss-pxtorem': {
            rootValue: ({ file }) => file.includes('vant') ? 37.5 : 75, // vant rem为37.5px
            propList: ['*']
        }
    }
}