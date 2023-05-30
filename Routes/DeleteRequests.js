const express = require('express')
const app = express()
const deleteRouter = express.Router()
const { Room_Model, Employee_Model, Booking_Model } = require('../DB/schema.js')






// deleting a room
deleteRouter.delete('/delete-room/:room_id', ( req, res ) => {
    Room_Model.findByIdAndDelete( req.params.room_id, ( err, room ) => {
        if ( err ) 
            res.status(404).end(`failed to delete room due to error, ${ err }`)
        else {
            res.status(200).json( room )
        }
    })

})



// deleting all rooms.
deleteRouter.delete('/delete-all-rooms', ( req, res ) => {
    Room_Model.deleteMany({}, ( err, deleted_rooms ) => {
        if ( err ) 
            res.status(500).json(`failed to delete rooms due to error, ${ err }`)
        else {
            res.status(200).json( deleted_rooms )
        }
    })
})




// deleting a staff
deleteRouter.delete('/delete-staff/:employee_id', ( req, res ) => {
    Employee_Model.findByIdAndDelete( req.params.employee_id, ( err, employee ) => {
        if ( err ) 
            res.status(404).end(`failed to delete employee due to error, ${ err }`)
        else {
            res.status(200).json( employee )
        }
    })
})



// deleting all staff.
deleteRouter.delete('/delete-all-staff', ( req, res ) => {
    Employee_Model.deleteMany({}, ( err, deleted_staff ) => {
        if ( err ) 
            res.status(404).end(`failed to delete all staff due to error, ${ err }`)
        else {
            res.status(200).json( deleted_staff )
        }
    })
})




// deleting a booking.
deleteRouter.delete('/delete-booking/:booking_id', ( req, res ) => {
    Booking_Model.findByIdAndDelete( req.params.booking_id, ( err, deleted_booking ) => {
        if ( err ) 
            res.status(500).end(`failed to delete booking due to error, ${ err }`)
        else {
            res.status(200).json( deleted_booking )
        }
    })
})



// deleting all bookings.
deleteRouter.delete('/delete-all-bookings', ( req, res ) => {
    Booking_Model.deleteMany({}, ( err, deleted_bookings ) => {
        if ( err ) 
            res.status(500).end(`failed to delete all booking due to error, ${ err }`)
        else {
            res.status(200).json( deleted_bookings )
        }
    })
})







module.exports = deleteRouter