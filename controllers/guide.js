const Guide = require('../models/Guide');

exports.new = (req, res) => {
  res.render('guide/new', {
    title: 'New Guide',
  });
};

exports.postNew = async (req, res) => {
  try {
    const { title, description, prompt } = req.body;
    const newGuide = new Guide({
      title,
      description,
      prompt,
      author: req.user._id // Assuming the user is stored in req.user by passport
    });
    await newGuide.save();
    req.flash('success', { msg: 'Guide created successfully.' });
    res.redirect('/'); // Redirect to a page showing the list of guides or the newly created guide
  } catch (error) {
    console.error(error);
    req.flash('errors', { msg: 'Error creating guide. Please try again.' });
    res.redirect('/');
  }
};
