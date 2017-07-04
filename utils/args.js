function acquire() {
    return require('yargs')
        .options({
            env: {
                default: 'dev',
                type: 'string'
            },
            devTools: {
                default: false,
                type: 'boolean'
            },
        })
        .argv;
}

module.exports = {
    acquire: acquire
};