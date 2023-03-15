import { DefineWorkflow, Schema } from 'deno-slack-sdk/mod.ts';
import { EndGameFunctionDefinition } from '../functions/end_game_function.ts';

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/future/workflows
 */
const EndGameWorkflow = DefineWorkflow({
  callback_id: 'end_game_workflow',
  title: 'End the game',
  description: 'Ends the game and tallies the results',
  input_parameters: {
    properties: {
      channel_id: {
        type: Schema.slack.types.channel_id,
      },
    },
  },
});

const endGameFunctionStep = EndGameWorkflow.addStep(EndGameFunctionDefinition, {
  channel_id: EndGameWorkflow.inputs.channel_id,
});

EndGameWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: EndGameWorkflow.inputs.channel_id,
  message: endGameFunctionStep.outputs.message,
});

export default EndGameWorkflow;
