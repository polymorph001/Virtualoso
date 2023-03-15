import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

export const GAME_DATASTORE = "game_datastore";

const GameDatastore = DefineDatastore({
  name: GAME_DATASTORE,
  primary_key: "id",
  attributes: {
    id: {
      type: Schema.types.string,
    },
    player: {
      type: Schema.slack.types.user_id,
    },
    points: {
      type: Schema.types.number,
    },
    // TODO: should we capture time?
  },
});

export default GameDatastore;