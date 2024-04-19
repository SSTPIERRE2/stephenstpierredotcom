import { SSTConfig } from 'sst';
import { Web } from './stacks/Web';
import { Database } from './stacks/Database';

export default {
  config() {
    return {
      name: 'stephenstpierredotcom',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(Database);
  },
} satisfies SSTConfig;
