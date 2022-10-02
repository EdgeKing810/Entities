import Fastify from 'fastify';
import FastifyCORS from '@fastify/cors';
import FastifyRateLimit from '@fastify/rate-limit';
import FastifyHelmet from '@fastify/helmet';
import FastifyURLData from '@fastify/url-data';

import os from 'os';
import cluster from 'cluster';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import router from './routes.js';

dotenv.config();

const app = Fastify({ logger: { level: 'info', file: 'logs/access.log' } });

const port = process.env.API_PORT;
const clusterWorkerSize = os.cpus().length;

let whitelist = [
  'http://localhost:3000',
  'http://localhost:8500',
  'https://heroes.kinesis.games',
  'http://172.20.128.2:80',
  'http://172.20.128.2:3000',
  'http://172.20.128.2:8500',
];

await app.register(FastifyCORS, () => (origin, callback) => {
  if (whitelist.indexOf(origin) !== -1 || process.env.ENV === 'dev') {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
});

await app.register(FastifyRateLimit, {
  max: 1000,
  timeWindow: '1 minute',
});

await app.register(FastifyHelmet, {
  contentSecurityPolicy: { useDefaults: true },
  dnsPrefetchControl: { allow: false },
  hidePoweredBy: true,
  noSniff: true,
  referrerPolicy: { policy: 'no-referrer' },
  xssFilter: true,
});

await app.register(FastifyURLData);

if (!process.env.URI) {
  console.log('No URI set for the mongodb:// connection!');
}

const uri = process.env.URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// ######################################## ROUTES #######################################

const prevPath = '/api/v1';
app.register(router, {
  prefix: prevPath ? prevPath : '',
});

// #######################################################################################

const start = async () => {
  try {
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port: ${port} | PID: ${process.pid}`);
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

if (clusterWorkerSize > 1) {
  if (cluster.isMaster) {
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork();
    }

    cluster.on('exit', function (worker) {
      console.log(`Worker ${worker.id} has exited.`);
    });
  } else {
    start();
  }
} else {
  start();
}
