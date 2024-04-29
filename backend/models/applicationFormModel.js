const mongoose = require('mongoose');

const applicationFormSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true //remove whitespace from the beginning and end of strings.
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    jobId: {
        type: 'ObjectId',
        ref: 'Job', // Reference to the Job model for the job the candidate is applying for
        required: true
    },
    submittedBy: {
        required: true,
        type: 'ObjectId',
        ref: 'User'
    }

})

module.exports = mongoose.model("Application", applicationFormSchema);