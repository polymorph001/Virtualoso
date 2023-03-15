import { DefineType, Schema } from "deno-slack-sdk/mod.ts";


export const GameStatsType = DefineType({
  title: "Game Stats",
  description: "Scoreboard information",
  name: "game_stats",
  type: Schema.types.object,
  properties: {
    player: { type: Schema.slack.types.user_id },
    total_points: { type: Schema.types.number },
  },
  required: ["player", "total_points"],
});