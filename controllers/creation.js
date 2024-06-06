const axios = require('axios');
const Guide = require('../models/Guide');
const Creation = require('../models/Creation');

exports.new = async (req, res) => {
  try {
    const guideId = req.query.guide;
    if (guideId) {
      let guide = await Guide.findById(guideId).select('id title description author prompt');

      if (!guide) {
        return res.status(404).send('Guide not found');
      }

      res.render('create', {
        title: 'Create',
        guide: guide
      });
    }
    
    const srcCreationId = req.query.src;

    if (srcCreationId) {
    const creation = await Creation.findById(srcCreationId).populate('author').populate('guide');
    res.render('create', {
      title: 'Create',
      guide: creation.guide,
      creation: creation
    });

    }
     if(!guideId && !srcCreationId)
        return res.status(404).send('Missing Guide or Creation ID');

  } catch (error) {
    console.error('Error fetching:', error);
    res.status(500).send('Server error');
  }
};
//codestral-latest
exports.sendMistralCodeMessage = async (req, res) => {
  const { guideId, messageList } = req.body;

  try {
    const guide = await Guide.findById(guideId).select('prompt');
    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    const prompt = guide.prompt;

    const apiKey = 'Q3wJ5IgYiVKj52E4UjHY90thn6HqxQBh';
    const url = 'https://codestral.mistral.ai/v1/chat/completions';

    const response = await axios.post(url, {
      model: 'codestral-latest',
      messages: [{ role: 'system', content: prompt }, ...messageList],
      temperature: 0.7,
      top_p: 1,
      stream: false,
      safe_prompt: false,
      random_seed: 311095
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const responseMessage = response.data.choices[0].message.content;
    messageList.push({ role: 'assistant', content: responseMessage });

    res.json({ messageList });

  } catch (error) {
    console.error('Error sending message to Mistral:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

//Mistral
exports.sendMessage = async (req, res) => {
  const { guideId, messageList } = req.body;

  try {
    const guide = await Guide.findById(guideId).select('prompt');
    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    const prompt = guide.prompt;

    const apiKey = process.env.MISTRAL_API_KEY;
    const url = 'https://api.mistral.ai/v1/chat/completions';

    const response = await axios.post(url, {
      model: 'mistral-large-latest',
      messages: [{ role: 'system', content: prompt }, ...messageList],
      temperature: 0.7,
      top_p: 1,
      stream: false,
      safe_prompt: false,
      random_seed: 311095
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const responseMessage = response.data.choices[0].message.content;
    messageList.push({ role: 'assistant', content: responseMessage });

    res.json({ messageList });

  } catch (error) {
    console.error('Error sending message to Mistral:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

//Open AI
exports.sendOpen4oMessage = async (req, res) => {
  const { guideId, messageList } = req.body;

  try {
    const guide = await Guide.findById(guideId).select('prompt');
    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    const prompt = guide.prompt;

    const apiKey = process.env.OPENAI_API_KEY;
    const url = 'https://api.openai.com/v1/chat/completions';

    const response = await axios.post(url, {
      model: 'gpt-4o',
      messages: [{ role: 'system', content: prompt }, ...messageList],
      temperature: 0.7,
      top_p: 1,
      // stream: false,
      // safe_prompt: false,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const responseMessage = response.data.choices[0].message.content;
    messageList.push({ role: 'assistant', content: responseMessage });

    res.json({ messageList });

  } catch (error) {
    console.error('Error sending message to Mistral:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
//Gemini
exports.sendGeminiMessage = async (req, res) => {
  const { guideId, messageList } = req.body;

  try {
    const guide = await Guide.findById(guideId).select('prompt');
    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    const prompt = guide.prompt;
    const apiKey = process.env.GEMINI_API_KEY;
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;

    const updatedMessageList = messageList.map(({ content, ...rest }) => ({ ...rest, parts: content }));

    const response = await axios.post(url, {
      contents: [
        { role: 'model', parts: [{ text: prompt }] },
        ...updatedMessageList
      ],
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseMessage = response.data.candidates[0].content.parts.map(part => part.text).join(' ');
    messageList.push({ role: 'assistant', content: responseMessage });

    res.json({ messageList });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Open AI
exports.sendOpen35Message = async (req, res) => {
  const { guideId, messageList } = req.body;

  try {
    const guide = await Guide.findById(guideId).select('prompt');
    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    const prompt = guide.prompt;

    const apiKey = process.env.OPENAI_API_KEY;
    const url = 'https://api.openai.com/v1/chat/completions';

    const response = await axios.post(url, {
      model: 'gpt-3.5-turbo-1106',//'gpt-4o',
      messages: [{ role: 'system', content: prompt }, ...messageList],
      temperature: 0.7,
      top_p: 1,
      // stream: false,
      // safe_prompt: false,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const responseMessage = response.data.choices[0].message.content;
    messageList.push({ role: 'assistant', content: responseMessage });

    res.json({ messageList });

  } catch (error) {
    console.error('Error sending message to Mistral:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

//GroQ
exports.sendGroqMessage = async (req, res) => {
  const { guideId, messageList } = req.body;

  try {
    const guide = await Guide.findById(guideId).select('prompt');
    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    const prompt = guide.prompt;

    const apiKey = process.env.GROQ_API_KEY;
    const url = 'https://api.groq.com/openai/v1/chat/completions';

    const response = await axios.post(url, {
      model: 'llama3-70b-8192',
      messages: [{ role: 'system', content: prompt }, ...messageList],
      temperature: 0.7,
      // top_p: 1,
      // stream: false,
      // safe_prompt: false,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const responseMessage = response.data.choices[0].message.content;
    messageList.push({ role: 'assistant', content: responseMessage });

    res.json({ messageList });

  } catch (error) {
    console.error('Error sending message to Mistral:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};


exports.createCreation = async (req, res) => {
  const { guideId, creationName, content } = req.body;

  try {
    const guide = await Guide.findById(guideId);
    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' });
    }

    const userId = req.user._id; // Assuming you have the user information in req.user

    const newCreation = new Creation({
      author: userId,
      title: creationName,
      content: content,
      guide: guideId,
    });

    await newCreation.save();

    res.status(201).json({ message: 'Creation published successfully!' });
  } catch (error) {
    console.error('Error creating new creation:', error);
    res.status(500).json({ error: 'Failed to publish creation' });
  }
};

exports.preview = async (req, res) => {
  try {
    const creationId = req.query.creation;
    const creation = await Creation.findById(creationId).populate("author");

    if (!creation) {
      return res.status(404).send('Creation not found');
    }

    res.render('preview', {
      title: creation.title,
      creation: creation
    });
  } catch (error) {
    console.error('Error fetching creation:', error);
    res.status(500).send('Server error');
  }
};

exports.previewRaw = async (req, res) => {
  try {
    const creationId = req.query.creation;
    const creation = await Creation.findById(creationId);

    if (!creation) {
      return res.status(404).send('Creation not found');
    }

    // Set the content type to HTML and send the creation content
    res.set('Content-Type', 'text/html');
    res.send(creation.content);

  } catch (error) {
    console.error('Error fetching creation:', error);
    res.status(500).send('Server error');
  }
};

exports.delete = async (req, res) => {
  try {
    const creationId = req.query.creation;
    const creation = await Creation.findById(creationId);

    if (!creation) {
      return res.status(404).send('Creation not found');
    }

    // Delete the creation
    await Creation.findByIdAndDelete(creationId);

    // Get the referer URL
    const refererUrl = req.get('Referer');

    // Redirect back to the referer URL
    res.redirect(refererUrl);

  } catch (error) {
    console.error('Error deleting creation:', error);
    res.status(500).send('Server error');
  }
};
