const mongoose = require('mongoose');

const todosSchema = mongoose.Schema({
  title:  {type:String, default :'hello', required : true} , // String is shorthand for {type: String}
  description: String,
},{
    versionKey: false,// for deactivating __v on mongoDB,
    timestamps: true // time of update and time of creation(createAt, updatedAt) 
});

// create the Todo model 
const Todos = mongoose.model('Todos', todosSchema);

// export model to use it in an other place
module.exports = Todos;