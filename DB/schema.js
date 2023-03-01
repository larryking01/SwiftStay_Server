const mongoose = require('mongoose')   
mongoose.set( 'strictQuery', true )
const { Schema } = mongoose



// the room schema.
const RoomSchema = new Schema({
    room_number: {
        type: String,
        required: true,
        unique: true
    },

    room_category: {
        type: String,
        required: true,
        unique: false
    },

    room_rate: {
        type: String,
        required: true,
        unique: false
    },

    room_availability: {
        type: String,
        required: true,
        unique: false
    },

    room_cover_photo_url: {
        type: String,
        required: true
    },

    room_extra_photo_url_1: {
        type: String,
        required: true
    },

    room_extra_photo_url_2: {
        type: String,
        required: true
    },

    room_extra_photo_url_3: {
        type: String,
        required: true
    },

    room_extra_photo_url_4: {
        type: String,
        required: true
    },

    room_extra_photo_url_5: {
        type: String,
        required: false
    },

    room_description: {
        type: String,
        required: false
    },

    room_features: {
        type: [ String ],
        required: false,
        default: [ ]
    },

    room_latitude_coordinate: {
        type: String,
        required: true
    },

    room_longitude_coordinate: {
        type: String,
        required: true
    }


}, { timestamps: true, strict: true } )




// the employee schema
const EmployeeSchema = new Schema({
    
    employee_full_name: {
        type: String,
        required: true
    },

    employee_position: {
        type: String,
        required: true,
        unique: false
    },

    employee_phone_number: {
        type: String,
        required: true,
        unique: true
    },

    employee_date_of_birth: {
        type: String,
        required: true,
        unique: false
    }

}, { timestamps: true, strict: true })



// the booking schema.
const BookingSchema = new Schema({
    booker_email: { 
        type: String,
        required: true
    },

    booker_full_name: {
        type: String,
        required: true
    },

    booker_contact_number: {
        type: String,
        required: true
    },

    booker_check_in_date: {
        type: String,
        required: true
    },

    booker_checkout_date: {
        type: String,
        required: true
    },

    booked_room_id: {
        type: Schema.Types.ObjectId,
        ref: 'Room Model'
    }

}, { timestamps: true, strict: true })



// models for both schemas.
const Room_Model = mongoose.model( 'Room Model', RoomSchema )

const Employee_Model = mongoose.model( 'Employee Model', EmployeeSchema )

const Booking_Model = mongoose.model('Booking Model', BookingSchema)


// exporting the modules.
module.exports = {
    Room_Model,
    Employee_Model,
    Booking_Model
}
