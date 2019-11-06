import 'dotenv/config';

import Bee from 'bee-queue';
import * as Sentry from '@sentry/node';
import redisConfig from '../config/redis';
import sentryConfig from '../config/sentry';

import jobs from '../app/jobs';

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });

    if (process.env.NODE_ENV === 'production') {
      Sentry.init(sentryConfig);
    }
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure);
      bee.on('succeeded', this.handleFailure);
      bee.process(handle);
    });
  }

  async handleFailure(job, err) {
    console.log(job.queue.name, err);
    Sentry.captureException(err);
  }
}

export default new Queue();
