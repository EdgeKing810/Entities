import { MongoClient } from 'https://deno.land/x/mongo@v0.11.1/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const client = new MongoClient();
client.connectWithUri(`${config().URI}`);

interface EntitySchema {
  id: string;
  name: string;
  tagline: string;
  category: string;
  modified: Date;
}

const db = client.database('entities_db');
const entities = db.collection<EntitySchema>('entities');

export default entities;
