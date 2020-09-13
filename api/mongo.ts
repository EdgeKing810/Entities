import { MongoClient } from 'https://deno.land/x/mongo@v0.11.1/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const client = new MongoClient();
client.connectWithUri(`${config().URI}`);

interface HeroSchema {
  _id: { $oid: string };
  category: {
    name: string;
    hero: {
      id: string;
      name: string;
      tagline: string;
    };
    creation_time: Date;
  };
}

const db = client.database('heroes_db');
const entities = db.collection<HeroSchema>('entities');

export default entities;
