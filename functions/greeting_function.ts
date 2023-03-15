import { DefineFunction, Schema, SlackFunction } from 'deno-slack-sdk/mod.ts';

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

export default SlackFunction(GreetingFunctionDefinition, () => {
  // TODO: generate emoji prompt here
  const greeting = 'test';
  return { outputs: { greeting } };
});
