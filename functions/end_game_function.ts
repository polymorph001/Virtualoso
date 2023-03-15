import { SlackAPI } from 'deno-slack-api/mod.ts';
import { DefineFunction, Schema, SlackFunction } from 'deno-slack-sdk/mod.ts';

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/future/functions/custom
 */
export const EndGameFunctionDefinition = DefineFunction({
  callback_id: 'end_game_function',
  title: 'End Game',
  description: 'Ends the game and tallies the results',
  source_file: 'functions/end_game_function.ts',
  input_parameters: {
    properties: {
      channel_id: {
        type: Schema.slack.types.channel_id,
      },
    },
  },
  output_parameters: {
    properties: {
      message: {
        type: Schema.types.string,
        description: 'Greeting for the recipient',
      },
    },
    required: ['message'],
  },
});

export default SlackFunction(EndGameFunctionDefinition, async ({ inputs, token }) => {
  const { channel_id } = inputs;
  console.log('djb executing message to channel', channel_id);
  return {
    outputs: {
      message: `These are your winners:`,
    },
  };
});
