const mongoose =  require('mongoose')

mongoose.connect('mongodb://localhost/angular-auth', {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
    .then(db => console.log('DataBase is connected'))
    .catch(err => console.log(err))