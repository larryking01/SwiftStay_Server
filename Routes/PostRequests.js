const express = require('express')
const app = express()
const postRouter = express.Router()
const { Room_Model, Employee_Model, Booking_Model, Review_Model } = require('../DB/schema.js')

// supabase.
const supabase = require('../DB/supabase.js')


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



// function to manipulate review date and time and return desired formats.
const DesiredReviewDate = ( ) => {
    let date = new Date()

    // dd/mm/yyyy
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    day = day.toString().padStart( 2, '0' )
    month = month.toString().padStart( 2, '0' )
    
    let desired_review_date = day + '/' + month + '/' + year

    return desired_review_date

}


const DesiredReviewTime = ( ) => {
    let date = new Date()

    //hh/mm
    let hours = date.getHours()
    let minutes = date.getMinutes()

    hours = hours.toString().padStart( 2, 0 )
    minutes = minutes.toString().padStart( 2, 0 )

    let desired_review_time = hours + ':' + minutes

    return desired_review_time
}





// adding a new room
postRouter.post('/add-new-room', ( req, res ) => {
    let newRoom = new Room_Model({
        room_number: req.body.room_number.trim(),
        room_availability: req.body.room_availability.trim(),
        room_category: req.body.room_category.trim(),
        room_rate: req.body.room_rate.trim(),
        room_cover_photo_url: req.body.room_cover_photo_url.trim(),
        room_extra_photo_url_1: req.body.room_extra_photo_url_1.trim(),
        room_extra_photo_url_2: req.body.room_extra_photo_url_2.trim(),
        room_extra_photo_url_3: req.body.room_extra_photo_url_3.trim(),
        room_extra_photo_url_4: req.body.room_extra_photo_url_4.trim(),
        room_extra_photo_url_5: req.body.room_extra_photo_url_5.trim(),
        room_description: req.body.room_description,
        room_features: req.body.room_features,
        room_latitude: parseFloat(req.body.room_latitude.trim()),
        room_longitude: parseFloat(req.body.room_longitude.trim()),
        room_rating: req.body.room_rating,
        room_location: req.body.room_location.trim()
    })

    newRoom.save(( err, room ) => {
        if ( err ) 
            res.status( 400 ).send(`error, ${ err }`)
        else {
            res.status(200).json( room )
        }
    })

})



// adding a new staff
postRouter.post('/add-new-staff', async ( req, res ) => {
    let newEmployee = new Employee_Model({
        employee_full_name: CapitalizeAllLetters( req.body.employee_full_name.trim() ),
        employee_position: CapitalizeAllLetters( req.body.employee_position.trim() ),
        employee_phone_number: CapitalizeAllLetters ( req.body.employee_phone_number.trim() ),
        employee_date_of_birth: CapitalizeAllLetters( req.body.employee_date_of_birth.trim() )
    })

    newEmployee.save( ( err, employee ) => {
        if ( err ) 
            res.status(400).json(`failed to add employee due to error, ${ err }`)
        else {
            res.status(200).json( employee )
        }
    })

})




// the booking.
postRouter.post('/bookings/:room_id', ( req, res ) => {
    let booking = new Booking_Model({
        booker_email: req.body.booker_email,
        booker_full_name: CapitalizeAllLetters( req.body.booker_full_name.trim() ),
        booker_contact_number: CapitalizeAllLetters( req.body.booker_contact_number ),
        booker_check_in_date: req.body.booker_check_in_date,
        booker_checkout_date: req.body.booker_checkout_date,
        booked_room_id: req.params.room_id
    })

    booking.save( ( err, booked_room ) => {
        if ( err ) res.status(500).json('failed to submit booking due to error %s', err )
        else {
            res.status(200).json( booked_room )
        }
    } )
    
})



// the reviews function.
postRouter.post('/post-review/:hotel_name/:hotel_id', ( req, res ) => {
    let review = new Review_Model({
        user_email: req.body.user_email,
        review_body: req.body.review_body,
        review_date: DesiredReviewDate(),
        review_time: DesiredReviewTime(),
        reviewed_hotel_name: req.params.hotel_name,
        reviewed_hotel_id: req.params.hotel_id
    })

    review.save(( err, review ) => {
        if ( err ) {
            res.status( 400 ).json(`failed to submit review due to an error: ${ err }`)
        }
        else {
            res.status( 200 ).json( review )
        }
    })
})




module.exports = postRouter