import { SlackAPI } from 'deno-slack-api/mod.ts';
import { DefineFunction, Schema, SlackFunction } from 'deno-slack-sdk/mod.ts';
import emoji from '../assets/emoji.ts';
import EndGameWorkflow from '../workflows/end_game_workflow.ts';

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/future/functions/custom
 */
export const GreetingFunctionDefinition = DefineFunction({
  callback_id: 'greeting_function',
  title: 'Generate a greeting',
  description: 'Generate a greeting',
  source_file: 'functions/greeting_function.ts',
  input_parameters: {
    properties: {
      duration: {
        type: Schema.types.integer,
        description: 'How long should the game run for, in minutes',
      },
      channel_id: {
        type: Schema.slack.types.channel_id,
        description: 'Destination channel',
      },
    },
  },
  output_parameters: {
    properties: {
      greeting: {
        type: Schema.types.string,
        description: 'Greeting for the recipient',
      },
    },
    required: ['greeting'],
  },
});

export default SlackFunction(GreetingFunctionDefinition, async ({ inputs, token }) => {
  const { channel_id, duration } = inputs;

  const client = SlackAPI(token);
  const res = await client.apiCall('emoji.list');
  const customEmoji = Object.keys(res?.emoji);
  const allEmoji = [...emoji, ...customEmoji];

  const greeting = Array.from(Array(10).keys())
    .map(() => `:${allEmoji[Math.floor(Math.random() * allEmoji.length)]}:`)
    .join('');

  const now = new Date();
  now.setMinutes(now.getMinutes() + duration);

  // Schedule the job to end
  await client.workflows.triggers.create<typeof EndGameWorkflow.definition>({
    name: 'Example',
    type: 'scheduled',
    workflow: `#/workflows/${EndGameWorkflow.definition.callback_id}`,
    inputs: {
      channel_id: { value: channel_id },
    },
    schedule: {
      start_time: now.toISOString(),
      timezone: 'UTC',
      frequency: {
        type: 'once',
      },
    },
  });

  return {
    outputs: {
      greeting: `Given these ten emojis, create as meaningful a sentence as possible. The more emojis a sentence consists, the more points it gets.\n\n${greeting}`,
    },
  };
});
