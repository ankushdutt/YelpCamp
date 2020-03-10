if(process.env.NODE_ENV === 'production'){
    module.exports = require('./conig.prod')    
} else {
    module.exports = require('./config.dev')
}
