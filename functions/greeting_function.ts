import { SlackAPI } from 'deno-slack-api/mod.ts';
import { DefineFunction, Schema, SlackFunction } from 'deno-slack-sdk/mod.ts';
import emoji from '../assets/emoji.ts';

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

export default SlackFunction(GreetingFunctionDefinition, async ({ token }) => {
  // TODO: generate emoji prompt here
  const client = SlackAPI(token);
  const res = await client.apiCall('emoji.list');
  const customEmoji = Object.keys(res?.emoji);
  const allEmoji = [...emoji, ...customEmoji];

  const greeting = Array.from(Array(10).keys())
    .map(() => `:${allEmoji[Math.floor(Math.random() * allEmoji.length)]}:`)
    .join('');

  return {
    outputs: {
      greeting: `Given these ten emojis, create as meaningful a sentence as possible. The more emojis a sentence consists, the more points it gets.\n\n${greeting}`,
    },
  };
});
