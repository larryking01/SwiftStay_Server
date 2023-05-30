const express = require('express')
const app = express()
const putRouter = express.Router()
const { Room_Model, Employee_Model, Booking_Model } = require('../DB/schema.js')








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




// the put requests

// updating room details
putRouter.put('/update-room-details/:room_id', ( req, res ) => {
    Room_Model.findByIdAndUpdate( req.params.room_id, 
                                  { $set: {   
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
                                            room_features: req.body.room_features
                                          }
                                   }, 
                                   ( err, room ) => {
                                        if ( err ) 
                                            res.status(400).end(`failed to update room details due to error, ${ err }`)
                                        else {
                                          res.status(200).json( room )
                                        }

                                    } )

})




// updating staff details
putRouter.put('/update-staff-details/:staff_id', ( req, res ) => {
    Employee_Model.findByIdAndUpdate( req.params.staff_id, 
                                      {
                                      $set: {
                                              employee_full_name: CapitalizeAllLetters( req.body.employee_full_name.trim() ),
                                              employee_position: CapitalizeAllLetters( req.body.employee_position.trim() ),
                                              employee_phone_number: CapitalizeAllLetters( req.body.employee_phone_number.trim() ),
                                              employee_date_of_birth: CapitalizeAllLetters( req.body.employee_date_of_birth.trim() )
                                            }
                                      },
                                      ( err, employee ) => {
                                            if ( err ) 
                                                res.status(500).json(`failed to update employee details due to error, ${ err }`)
                                            else {
                                              res.status(200).json( employee )
                                            }
                                      })
                                      
})




// updating booking details.
putRouter.put('/update-booking/:booking_id', ( req, res ) => {
  Booking_Model.findByIdAndUpdate( req.params.booking_id, 
                                   {
                                     $set: {
                                              booker_email: req.body.booker_email,
                                              booker_full_name: CapitalizeAllLetters( req.body.booker_full_name.trim() ),
                                              booker_contact_number: req.body.booker_contact_number,
                                              booker_check_in_date: req.body.booker_check_in_date,
                                              booker_checkout_date: req.body.booker_checkout_date
                                            }
                                   },
                                   ( err, updated_booking ) => {
                                      if ( err ) 
                                        res.status(404).json(`failed to update booking details due to error, ${ err }`)
                                      else {
                                        res.status(200).json( updated_booking )
                                      }
                                    }
                                    )

})














module.exports = putRouter