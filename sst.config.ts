import { SSTConfig } from 'sst';
import { Web } from './stacks/Web';
import { Api } from './stacks/Api';
import { Database } from './stacks/Database';

export default {
  config(_input) {
    return {
      name: 'stevestpierredotcom',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(Database).stack(Api).stack(Web);
  },
} satisfies SSTConfig;
