import Bee from 'bee-queue';
import * as Sentry from '@sentry/node';
import Log from '../app/schemas/Log';
import redisConfig from '../config/redis';

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
  }

  add(queue, job) {
    return this.queues[queue].bee
      .createJob(job)
      .retries(2)
      .save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
      bee.on('retrying', this.handleFailure).process(handle);
    });
  }

  async handleFailure(job, err) {
    Sentry.captureException(err);

    await Log.create({
      type: 'Error',
      description: `Queue ${job.queue.name}: FAILED`,
      content: JSON.stringify(err),
    });
  }
}

export default new Queue();
