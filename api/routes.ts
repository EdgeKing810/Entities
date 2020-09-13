import { RouterContext } from 'https://deno.land/x/oak/mod.ts';
import entities from './mongo.ts';

const getHeroes = async (ctx: RouterContext) => {
  const heroes = await entities.find();
  ctx.response.body = heroes;
};

const createHero = async (ctx: RouterContext) => {
  const { value } = ctx.request.body({ type: 'json' });
  const { name, hero_id, hero_name, hero_tagline } = await value;

  if (!value || !name || !hero_id || !hero_name || !hero_tagline) {
    ctx.response.status = 200;
    ctx.response.body = 'Invalid post data in request';
    return;
  }

  const newHero = {
    category: {
      name: name,
      hero: {
        id: hero_id,
        name: hero_name,
        tagline: hero_tagline,
      },
      creation_time: new Date(),
    },
  };

  entities.insertOne(newHero);

  ctx.response.status = 200;
  ctx.response.body = `Entity ${hero_name} successfully added!`;
};

export { getHeroes, createHero };
