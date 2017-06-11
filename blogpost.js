var mongoose = require('mongoose')
var Schema = mongoose.Schema
var postSchema = new Schema({
    title: String,
    post_url: String,
    slide_url: String,
    sreen_ratio: String,
    youtube_url: String,
    kor_doc: String,
    ko_en_doc: String,
    trans_dir: String,
    eng_doc: String
})
module.exports = mongoose.model('post', postSchema)
