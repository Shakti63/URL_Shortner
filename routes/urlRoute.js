const express = require('express');
const router = express.Router();

const ShortURL = require('../models/urlSchema')

router.get('/',async(req,res) =>{
    const shorturls= await ShortURL.find()
      
  res.render('index', {shorturls : shorturls});
})

router.post('/shortUrls',async(req,res) =>{
  const url= req.body.full
  const newshortURL = new ShortURL({
    full : url
  })

  await newshortURL.save()
  console.log('short url-', newshortURL);
  res.redirect('/')
})

router.get('/:shortUrl', async(req,res)=>{
  const shorturl = await ShortURL.findOne({short : req.params.shortUrl})
  if(shorturl == null){
    return res.sendStatus(404)
  }
  await shorturl.clicks++ ;
  shorturl.save();
  res.redirect(shorturl.full)

})
  
router.get('/delete/:id', async (req,res)=>{
  const id =req.params.id
  try{
   await ShortURL.deleteOne({_id : id})
   res.redirect('/')


  }
  catch{
    console.log(err);
  }
})


module.exports = router;