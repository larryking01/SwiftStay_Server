const express = require('express')
const app = express()
const cors = require('cors')
require('./DB/connectMongo')
const getRouter = require('./Routes/GetRequests')
const postRouter = require('./Routes/PostRequests')
const putRouter = require('./Routes/PutRequests')
const deleteRouter = require('./Routes/DeleteRequests')




const PORT = process.env.PORT || 8000
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )
app.use( cors() )


// for get requests.
app.use('/get', getRouter)


// for post requests.
app.use('/post', postRouter)


// for put requests.
app.use('/put', putRouter)


// for delete requests.
app.use('/delete', deleteRouter)


// handling requests to unspecified routes.
app.use('*', ( req, res, next ) => {
    res.json('sorry, route does not exist....')
    next()
})



// starting the server.
app.listen( PORT, () => {
    console.log(`server running on port ${ PORT }.......`)
})