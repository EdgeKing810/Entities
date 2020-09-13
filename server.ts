import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

import { getHeroes, createHero } from './api/routes.ts';

const router = new Router();

router.get('/', getHeroes).post('/add', createHero);
// .post('/update', updateHero);
//   .delete('/delete', deleteHero);

const port: number = parseInt(config().API_PORT);
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app
  .listen({ port: port })
  .then(() => console.log(`Listening on port: ${port}`));
