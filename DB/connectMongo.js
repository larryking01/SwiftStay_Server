const mongoose = require('mongoose')
const config = require('./config.js')


// connecting to mongoose and handling initial connection errors
mongoose.connect( config.atlas_uri, { dbName: config.cloud_db })
.then(() => console.log('mongodb connection successful....'))
.catch( error => console.log(`failed to connect mongodb due to initial connection error, ${ error }`))



// handling runtime errors.
mongoose.connection.on('error', ( error ) => {
    console.log(`failed to connect to mongodb due to error after initial connection, ${ error }`)
})