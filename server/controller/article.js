const Article = require('../models/article')

let filterFunction = (body) => {
  let output = {}
  for (let key in body) {
    if (key === 'title' || key === 'content' || key === 'image' || key === 'userId') {
      output[key] = body[key]
    }
  }
  return output
}

class ArticleController {

  static addArticle(req, res) {
    console.log('jalan')
    console.log(req.file);
    const {title, content, image} = req.body
    Article
      .create({
        title,
        content,
        image : req.file.cloudStoragePublicUrl,
        userId : req.user.id
      })
      .then(article=>{
        console.log('success')
        res.status(201).json(article)
        // console.log(article);
      })
      .catch(err=>{
        // console.log(`controller`);
        console.log(`addd article masuk sini`);
        res.status(500).json(err)
        // console.log(err);
      })
  }

  static readArticle(req,res){
    // console.log(req.user);
    Article
      .find({userId : req.user.id})
      .then(article=>{
        res.status(201).json(article)
        // console.log(article);
      })
      .catch(err=>{
        res.status(500).json(err)
        // console.log(err);
      })
  }

  static deleteArticle(req,res){
    // console.log(req.params.id);
    Article
      .findOneAndDelete({_id:req.params.id})
      .then(article=>{
        res.status(200).json(article)
      })
      .catch(err=>{
        res.status(500).json(err)
      })
  }

  static updateArticle(req,res){
    console.log(`controller update`);
    console.log(req.body);
    const {title, content} = req.body
    Article
      .findByIdAndUpdate({_id : req.params.id},{title,content,image: req.file.cloudStoragePublicUrl},{new : true})
      .then(article=>{
        res.status(201).json(article)
      })
      .catch(err=>{
        res.status(500).json(err)
      })
  }

  static allArticles(req,res){
    // console.log(req.user);
    Article
      .find({userId : req.user.id})
      .then(article=>{
        res.status(201).json(article)
        // console.log(article);
      })
      .catch(err=>{
        res.status(500).json(err)
        // console.log(err);
      })
  }
}


module.exports = ArticleController