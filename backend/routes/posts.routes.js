const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');
const helpFunctions = require('../functions/functions');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})  //- jesli chcemy tylko opublikowane do stata
      // .select('email publicDate title photo')//jakie pola beda pokazywane
      .sort({ publicDate: -1 }); //sortowanie malejace po polu publicDate (-1) - malejaco
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    const tabResult = [];
    tabResult.push(result);
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(tabResult);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/posts/:id/edit', async (req,res) => {
  const { id, title, content, status, price, phoneNumber, localization,modDate } = req.body;

  try {
    const result = await Post
      .findById(req.params.id);

    result.id = id;
    result.title = title;
    result.content = content;
    // result.email = email;
    result.localization = localization;
    result.phoneNumber = phoneNumber;
    result.price = price;
    // result.photo = photo;
    result.status = status;
    result.modDate = modDate;
    // result.publicDate = publicDate;
    await result.save();

    res.json(result);

  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
  try {
    const { _id, publicDate, modDate, status, photo, price, phoneNumber } = req.body;
    let { title, content, email, localization } = req.body;

    const titleEscape = helpFunctions.escape(title);
    const contentEscape = helpFunctions.escape(content);
    const localizationEscape = helpFunctions.escape(localization);
    const emailPattern = helpFunctions.emailPattern(email);

    if (emailPattern && publicDate && modDate && status && titleEscape && contentEscape) {
      const titleLength = title.length;
      const contentLength = content.length;

      if (titleLength >= 10 && contentLength >= 20) {

        title = titleEscape;
        content = contentEscape;
        email = emailPattern;
        localization = localizationEscape;

        const newPost = new Post({ _id, email, publicDate, modDate, status, title, content, photo, price, phoneNumber, localization });
        await newPost.save(); // ...save new photo in DB
        res.json(newPost);
      } else {
        throw new Error('Wrong input! Too short title or content');
      }
    } else {
      throw new Error('Wrong input!');
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
