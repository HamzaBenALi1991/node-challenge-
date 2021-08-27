const mongoose =require('mongoose');

const ImageSchema =mongoose.Schema({
    image :{type :String , required :true  }
},{
    versionKey: false,// for deactivating __v on mongoDB,
    timestamps: true // time of update and time of creation(createAt, updatedAt) 
})

module.exports = mongoose.model('files',ImageSchema)