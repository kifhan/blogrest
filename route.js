module.exports = function(app, Post) {
  app.get('/posts', function(req,res){
    Post.find(function(err, posts){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(posts);
    })
  })
  app.get('/posts/:post_url', function(req,res){
    Post.findOne({post_url: req.params.post_url}, function(err, post){
        if(err) return res.status(500).json({error: err});
        if(!post) return res.status(404).json({error: 'post not found'});
        res.json(post);
    })
  })
  app.post('/posts', function(req,res){
    var post = new Post();
    post.title = req.body.title
    post.post_url = req.body.post_url
    post.slide_url = req.body.slide_url
    post.sreen_ratio = req.body.sreen_ratio
    post.youtube_url = req.body.youtube_url
    post.kor_doc = req.body.kor_doc
    post.ko_en_doc = req.body.ko_en_doc
    post.trans_dir = req.body.trans_dir
    post.eng_doc = req.body.eng_doc

    post.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    })
  })
  app.put('/posts/:post_url', function(req,res){
    Post.findOne({post_url: req.params.post_url}, function(err, post){
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!post) return res.status(404).json({ error: 'post not found' });

        if(req.body.title) post.title = req.body.title;
        if(req.body.post_url) post.post_url = req.body.post_url;
        if(req.body.slide_url) post.slide_url = req.body.slide_url;
        if(req.body.sreen_ratio) post.sreen_ratio = req.body.sreen_ratio;
        if(req.body.youtube_url) post.youtube_url = req.body.youtube_url;
        if(req.body.kor_doc) post.kor_doc = req.body.kor_doc;
        if(req.body.ko_en_doc) post.ko_en_doc = req.body.ko_en_doc;
        if(req.body.trans_dir) post.trans_dir = req.body.trans_dir;
        if(req.body.eng_doc) post.eng_doc = req.body.eng_doc;

        post.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'post updated'});
        });

    });
  })
  app.delete('/posts/:post_url', function(req,res){
    Post.remove({ _id: req.params.post_url }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });
        res.status(204).end();
    })
  })
  app.delete('/posts/', function(req,res){
    Post.remove(function(err, output){
      if(err) return res.status(500).json({ error: "database failure" });
      res.status(204).end();
    })
  })
}
