const express = require('express')
const app = express()
const getRouter = express.Router()
const { Room_Model, Employee_Model, Booking_Model, Review_Model } = require('../DB/schema.js')



// function to capitalize first letter of each word.
// const CapitalizeFirstLetterOfEachWord = ( word ) => {
//     let separateWords = word.split(' ')

//     for ( element in separateWords ) {
//         separateWords[ element ] = separateWords[ element ].charAt(0).toUpperCase() + separateWords[ element ].substring(1).tolowerCase()
//     }

//     return separateWords.join(' ')

// }


// function to capitalize all letters.
const CapitalizeAllLetters = ( word ) => {
    return word.toUpperCase()

}



// the get requests.
// fetching all rooms
getRouter.get('/fetch-all-rooms', ( req, res ) => {
    Room_Model.find({}, '', ( err, rooms ) => {
        if ( err ) 
            res.status(400).json(`failed to fetch rooms due to error, ${ err }`)
        else {
            if ( rooms.length > 0 ) {
                res.status(200).json( rooms )
            }
            else {
                res.status(500).json('sorry, no rooms added yet............')
            }
        }
    })

})




// fetching room details.
getRouter.get('/room-details/:hotel_name/:hotel_id', ( req, res ) => {
    Room_Model.findById( req.params.hotel_id, ( err, hotel ) => {
        if ( err ) 
            res.status(400).json(`sorry an error occurred, ${ err }`)
        else {
            if ( hotel ) {
                res.status( 200 ).json( hotel )
            }
            else {
                res.status(500).json('no matching hotel found....')
            }
        }
    } )
})






// fetching unique room.
getRouter.get('/search-room/:search_text', ( req, res ) => {
    Room_Model.find({ $or: [ { room_number: req.params.search_text }, 
                             { room_rate: req.params.search_text },
                             { room_location: req.params.search_text },
                             { room_category: req.params.search_text }
                           ] 
                    }, 
                   ( err, rooms ) => {
                        if ( err ) 
                            res.status(400).json(`failed to fetch rooms due to error, ${ err }`)
                        else {
                            if ( rooms.length > 0 ) {
                                res.status(200).json( rooms )
                            }
                            else {
                                res.status(200).json('sorry, no rooms added yet....')
                            }
                             }
                               })

})




// fetching all staff.
getRouter.get('/fetch-all-staff', ( req, res ) => {
    Employee_Model.find({}, '', ( err, employees ) => {
        if ( err ) 
            res.status(400).json(`failed to fetch employees due to error, ${ err }`)
        else {
            if ( employees.length > 0 ) {
                res.status(200).json( employees )
            }
            else {
                res.status(200).json('sorry, no employees added yet....')
            }
            }
    })

})



// fetching unique staff.
getRouter.get('/fetch-unique-staff/:staff_id', ( req, res ) => {
    Employee_Model.find({ _id: req.params.staff_id, employee_full_name: req.body.employee_full_name.trim() }, '', ( err, employee ) => {
        if ( err ) {
            res.status(500).json(`sorry an error occured, ${ err }`)
        }
        else {
            if ( employee.length > 0 ) {
                res.status( 200 ).json( employee )
            }
            else {
                res.status(400).json('sorry no matching staff found')
            }
        }
    })

})



// fetching all bookings.
getRouter.get('/fetch-all-bookings', ( req, res ) => {
    Booking_Model.find({}, '').populate('booked_room_id').exec( ( err, bookings ) => {
        if ( err ) res.status(500).json('failed to fetch bookings due to error %s', err )
        else {
            if ( bookings.length < 1 ) {
                res.status(200).json('sorry no bookings made yet....')
            }
            else {
                res.status(200).json( bookings )
            }
        }
    })

})



// fetching all guests
getRouter.get('/fetch-all-guests', ( req, res ) => {
    Booking_Model.find({}, 'booker_email booker_full_name booker_contact_number')
    .populate({ path: 'booked_room_id', select: 'room_number'}).exec(( err, guest ) => {
        if( err ) {
            res.status(500).json(`failed to fetch guest due to error, ${ err }`)
        }
        else {
            if( guest.length < 1 ) {
                res.status(400).json('no rooms booked yet')
            }
            else {
                res.status(200).json( guest )
            }
        }
    })

})





// fetching unique guest.
getRouter.get('/fetch-unique-guest/:booker_full_name', ( req, res ) => {
    Booking_Model.find({ booker_full_name: CapitalizeAllLetters( req.params.booker_full_name.trim() ) },
                         'booker_email booker_full_name booker_contact_number' ).populate({ path: 'booked_room_id', select: 'room_number' })
                         .exec(( err, unique_guest ) => {
                            if( err ) {
                                res.status(500).json(`failed to fetch guest due to error, ${ err }`)
                            }
                            else {
                                if( unique_guest.length < 1 ) {
                                    res.status(400).json('sorry, we have no records for target guest...')
                                }
                                else {
                                    res.status(200).json( unique_guest )
                                }
                            }
                    
                         })
    
})



// fetching all reviews on a hotel.
getRouter.get('/fetch-reviews/:hotel_name/:hotel_id', ( req, res ) => {
    Review_Model.find({ reviewed_hotel_name: req.params.hotel_name }, '', ( err, reviews ) => {
        if ( err ) {
            res.status( 400 ).json('failed to fetch reviews due to error')
        }
        else {
            if ( reviews.length < 1 ) {
                res.status( 404 ).json('no reviews on this hotel yet')
            }
            else {
                res.status( 200 ).json( reviews )
            }
        }
    })
})






















module.exports = getRouter


