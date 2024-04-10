import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  password: z.string(),
});

export const RoleSchema = z.object({
  name: z.union([
    z.literal("Sheriff"),
    z.literal("Deputy"),
    z.literal("Renegade"),
    z.literal("Bandit"),
  ]),
  imgUrl: z.string(),
});

export const CharacterSchema = z.object({
  name: z.string(),
  imgUrl: z.string(),
  description: z.string(),
  life: z.number(),
});

export const CardSchema = z.object({
  title: z.string(),
  imgUrl: z.string(),
  isInstant: z.boolean(),
  signature: z.object({
    number: z.string(),
    sign: z.string(),
  }),
});

export const PlayerSchema = z.object({
  name: z.string(),
  role: RoleSchema,
  isRevealed: z.boolean(),
  character: CharacterSchema,
  life: z.number(),
  cardsInHand: CardSchema.array(),
  inventoryCards: CardSchema.array(),
  playedCards: CardSchema.array(),
  isActive: z.boolean(),
});

export const LogSchema = z.object({
  playerName: z.string(),
  interaction: z.string(),
});

export const GameSchema = z.object({
  id: z.number(),
  admin: z.string(),
  hasStarted: z.boolean(),
  requests: UserSchema.omit({ password: true }).array(),
  joinedUsers: UserSchema.omit({ password: true }).array(),
  players: PlayerSchema.array(),
  unusedCards: CardSchema.array(),
  communityCards: CardSchema.array(),
  usedCards: CardSchema.array(),
  logs: LogSchema.array(),
});
