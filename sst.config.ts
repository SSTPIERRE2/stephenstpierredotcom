import { SSTConfig } from 'sst';
import { Web } from './stacks/Web';
import { Database } from './stacks/Database';

export default $config({
  app(input) {
    return {
      name: 'stephenstpierredotcom',
      home: 'aws',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
    };
  },
  async run() {},
});
