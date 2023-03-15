import { DefineWorkflow, Schema } from 'deno-slack-sdk/mod.ts';
import { GreetingFunctionDefinition } from '../functions/greeting_function.ts';

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/future/workflows
 */
const GreetingWorkflow = DefineWorkflow({
  callback_id: 'greeting_workflow',
  title: 'Send a greeting',
  description: 'Send a greeting to channel',
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ['interactivity'],
  },
});

/**
 * For collecting input from users, we recommend the
 * built-in OpenForm function as a first step.
 * https://api.slack.com/future/functions#open-a-form
 */
const inputForm = GreetingWorkflow.addStep(Schema.slack.functions.OpenForm, {
  title: 'Send a greeting',
  interactivity: GreetingWorkflow.inputs.interactivity,
  submit_label: 'Send greeting',
  fields: {
    elements: [
      {
        name: 'channel',
        title: 'Channel to send message to',
        type: Schema.slack.types.channel_id,
        default: GreetingWorkflow.inputs.channel,
      },
      {
        name: 'duration',
        title: 'How long should the game run for, in minutes',
        type: Schema.types.integer,
      },
    ],
    required: ['channel', 'duration'],
  },
});

const greetingFunctionStep = GreetingWorkflow.addStep(GreetingFunctionDefinition, {
  channel_id: inputForm.outputs.fields.channel,
  duration: inputForm.outputs.fields.duration,
});

GreetingWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: inputForm.outputs.fields.channel,
  message: greetingFunctionStep.outputs.greeting,
});

export default GreetingWorkflow;
