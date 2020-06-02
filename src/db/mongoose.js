const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})





// password = abcd@1234  