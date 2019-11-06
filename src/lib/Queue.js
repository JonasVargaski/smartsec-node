import Bee from 'bee-queue';
import Log from '../app/schemas/Log';
import redisConfig from '../config/redis';

import ConfirmAccountMail from '../app/jobs/ConfirmAccountMail';

const jobs = [ConfirmAccountMail];

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
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  async handleFailure(job, err) {
    await Log.create({
      type: 'Error',
      description: `Queue ${job.queue.name}: FAILED`,
      content: JSON.stringify(err),
    });
  }
}

export default new Queue();
