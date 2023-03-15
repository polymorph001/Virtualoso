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
  const gifs = [
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGQ2ZTNmM2U4ODI4OGVmYzQyMTg2OTdmNWJlNTI5YzFjMzcxYzY3NSZjdD10cw/XmpKkhzRoP4NSnFtA9/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODYzMDAxMWNhODUxNzc3Mzg2M2Y2NmVjZDU0NDIxZDkxNjU1MzM0MyZjdD1z/Jgn076XZ7K0c4edY6J/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGFiMTExNzhiMjIxYTdiNDE2ZGZlYmIxY2QwY2NmNTEzYTFlNTk2NyZjdD1z/ZbkOKvirE4t5pDEUpP/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTRlZDE0MmQ3ODMzZDRhYjI4MDVmMTJiNDA1MzNjZjY0OTc0NzZkOSZjdD10cw/IafVFKLDvPApR6NAXa/giphy.gif',
  ];

  const gif = gifs[Math.floor(Math.random() * gifs.length)];
  return {
    outputs: {
      message: `The game has ended! Please submit your answers now.\n\n${gif}`,
    },
  };
});
