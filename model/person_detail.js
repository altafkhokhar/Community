const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },

    ragisterNo: {

        type: String
    },

    qualification: {

        type: String
    },

    firstName: {

        type: String
    },

    lastName: {

        type: String,

    },

    birthDate: {

        type: Date,


    },  

    
    gender: {

        type: String,


    },  

    
    email: {

        type: String,


    },


    phoneNumber: {

        type: Number,


    },


    address: {

        type: String,


    },
    pictureName:{

        type: String,
    }

});

const person_detail= mongoose.model('person_detail', schema, 'person_detail');
module.exports = {
    Model: person_detail
}
