import { RouterContext } from 'https://deno.land/x/oak/mod.ts';
import entities from './mongo.ts';

const getEntities = async (ctx: RouterContext) => {
  const items = await entities.find();
  ctx.response.body = items;
};

const createEntity = async (ctx: RouterContext) => {
  const { value } = ctx.request.body({ type: 'json' });
  const { category, id, name, tagline } = await value;

  if (!value || !category || !id || !name || !tagline) {
    ctx.response.status = 400;
    ctx.response.body = 'Invalid post data in request.';
    return;
  }

  const existing = await entities.findOne({ id: id });
  if (existing) {
    ctx.response.status = 400;
    ctx.response.body = 'Entity with this ID already exists.';
    return;
  } else {
    ctx.response.status = 500;
    ctx.response.body = 'Error. Please try again.';
  }

  const newEntity = {
    id,
    name,
    tagline,
    category,
    modified: new Date(),
  };

  const result = await entities.insertOne(newEntity);

  if (result) {
    ctx.response.status = 200;
    ctx.response.body = `Entity ${name} successfully added!`;
  }
};

const updateEntity = async (ctx: RouterContext) => {
  const { value } = ctx.request.body({ type: 'json' });
  const { id, name, tagline } = await value;

  if (!value || !id || !name || !tagline) {
    ctx.response.status = 400;
    ctx.response.body = 'Inalid post data in request.';
    return;
  }

  const existing = await entities.findOne({ id: id });
  if (!existing) {
    ctx.response.status = 404;
    ctx.response.body = "Entity with this ID doesn't exist.";
    return;
  }

  const updatedEntity = {
    id: existing.category,
    name,
    tagline,
    category: existing.category,
    modified: new Date(),
  };

  const result = await entities.updateOne({ id: id }, { $set: updatedEntity });

  if (result) {
    ctx.response.status = 200;
    ctx.response.body = `Entity ${name} sucessfully modified!`;
  } else {
    ctx.response.status = 500;
    ctx.response.body = 'Error. Please try again.';
  }
};

const deleteEntity = async (ctx: RouterContext) => {
  const { value } = ctx.request.body({ type: 'json' });
  const { id } = await value;

  if (!value || !id) {
    ctx.response.status = 400;
    ctx.response.body = 'Invalid post data in request.';
    return;
  }

  const result = await entities.deleteOne({ id: id });

  if (result) {
    ctx.response.status = 200;
    ctx.response.body = 'Entity successfully deleted!';
  } else {
    ctx.response.status = 500;
    ctx.response.body = 'Error. Please try again';
  }
};

export { getEntities, createEntity, updateEntity, deleteEntity };
