const Guide = require('../models/Guide');
const Creation = require('../models/Creation');

/**
 * GET /
 * Home page.
 */
exports.index = async (req, res) => {
  try {
    // Fetch all guides from the database and populate the author's profile name
    const guides = await Guide.find().populate('author', 'profile.name');

    // Fetch all creations from the database and populate the author's profile name
    const creations = await Creation.find().populate('author', 'profile.name').populate('guide');

    res.render('home', {
      title: 'Home',
      guides,
      creations
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
