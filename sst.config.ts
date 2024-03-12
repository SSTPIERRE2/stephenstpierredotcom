import { SSTConfig } from 'sst';
import { Web } from './stacks/Web';
import { Database } from './stacks/Database';
import { Default } from './stacks/Default';

export default {
  config() {
    return {
      name: 'stephenstpierredotcom',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(Database).stack(Web).stack(Default);
  },
} satisfies SSTConfig;
