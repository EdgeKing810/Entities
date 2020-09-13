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
    ctx.response.body = 'Invalid post data in request';
    return;
  }

  const newEntity = {
    id,
    name,
    tagline,
    category,
    modified: new Date(),
  };

  entities.insertOne(newEntity);

  ctx.response.status = 200;
  ctx.response.body = `Entity ${name} successfully added!`;
};

const updateEntity = async (ctx: RouterContext) => {
  const { value } = ctx.request.body({ type: 'json' });
  const { category, id, name, tagline } = await value;

  if (!value || !id || !name || !tagline) {
    ctx.response.status = 400;
    ctx.response.body = 'Inalid post data in request';
    return;
  }

  const updatedEntity = {
    id,
    name,
    tagline,
    category,
    modified: new Date(),
  };

  entities.updateOne({ id: id }, { $set: updatedEntity });

  ctx.response.status = 200;
  ctx.response.body = `Entity ${name} sucessfully modified!`;
};

export { getEntities, createEntity, updateEntity };
