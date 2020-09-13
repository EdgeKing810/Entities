import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

const getHeroes = (ctx: RouterContext) => {
  ctx.response.body = "Welcome to the KinesisGames' Heroes API";
};

export { getHeroes };
