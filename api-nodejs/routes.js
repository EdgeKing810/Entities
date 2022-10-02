import { v4 } from 'uuid';
import fs from 'fs';

import Entity from './models/entity.model.js';

const entityRouter = async (app, opts, next) => {
  app.get('/', async (req, res) => {
    const entities = await Entity.find();
    res.send(entities);
  });

  app.post('/add', async (req, res) => {
    const { category, id, name, tagline } = req.body;

    if (!category || !id || !name || !tagline) {
      return res.status(400).send('Invalid post data in request.');
    }

    const existing = await Entity.findOne({ id });

    if (existing) {
      return res.status(400).send('Entity with this ID already exists.');
    }

    const newEntity = {
      id,
      name,
      tagline,
      category,
      modified: new Date(),
    };

    const result = await Entity.create(newEntity);

    if (result) {
      return res.status(200).send(`Entity ${name} successfully added!`);
    } else {
      return res.status(500).send('Error. Please try again.');
    }
  });

  app.post('/update', async (req, res) => {
    const { id, name, tagline } = req.body;

    if (!id || !name || !tagline) {
      return res.status(400).send('Invalid post data in request.');
    }

    const existing = await Entity.findOne({ id });

    if (!existing) {
      return res.status(404).send("Entity with this ID doesn't exist");
    }

    const result = await Entity.updateOne(
      { id },
      {
        $set: {
          name,
          tagline,
          modified: new Date(),
        },
      }
    );

    if (result) {
      return res.status(200).send(`Entity ${name} successfully modified!`);
    } else {
      return res.status(500).send('Error. Please try again.');
    }
  });

  app.post('/delete', async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).send('Invalid post data in request.');
    }

    const existing = await Entity.findOne({ id });

    if (!existing) {
      return res.status(404).send("Entity with this ID doesn't exist");
    }

    const result = await Entity.deleteOne({ id });

    if (result) {
      return res.status(200).send('Entity successfully deleted!');
    } else {
      return res.status(500).send('Error. Please try again.');
    }
  });

  app.get('/reset', async (req, res) => {
    fs.readFile('./initial_data.json', 'utf8', async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error. Please try again.');
      } else {
        const entities = JSON.parse(data);
        const result = await Entity.insertMany(entities);
        if (result) {
          return res.status(200).send('Database successfully reset!');
        } else {
          return res.status(500).send('Error. Please try again.');
        }
      }
    });
  });

  next();
};

export default entityRouter;
