const mongoose = require("mongoose")

const File = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type:String,
        required:true
    },
    files: []
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
File.virtual('url').get(function() {
    //Para rodar somente localhost comentar a linha 20
    const url = process.env.URL || 'http://localhost:3000'
    //Para rodar somente localhost, comentar a linha 22 e descomentar a linha 23
    return `${url}/files/${encodeURIComponent(this.path)}`; 
    //return `http://localhost:3000/files/${encodeURIComponent(this.path)}`;  
})

module.exports = mongoose.model('File', File);