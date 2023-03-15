import { Manifest } from 'deno-slack-sdk/mod.ts';
import GreetingWorkflow from './workflows/greeting_workflow.ts';
import GameDatastore from './datastores/game_data.ts';
import { GameStatsType } from './types/game_stats.ts';

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: 'polymoji',
  description: 'A sample that demonstrates using a function, workflow and trigger to send a greeting',
  icon: 'assets/default_new_app_icon.png',
  workflows: [GreetingWorkflow],
  outgoingDomains: [],
  datastores: [GameDatastore],
  types: [GameStatsType],
  botScopes: ['commands', 'chat:write', 'chat:write.public', 'emoji:read', 'datastore:read', 'datastore:write'],
});