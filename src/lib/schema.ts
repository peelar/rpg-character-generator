import { z } from "zod";

export const MAX_STAT = 20;

export const BIO_MAX_LENGTH = 200;

// describe RPG character
export const characterSchema = z
  .object({
    name: z
      .string()
      .describe("A unique name for the character straight from a fantasy book"),
    class: z
      .enum(["warrior", "mage", "rogue"])
      .describe("The class of the character"),
    city: z.string(),
    bio: z
      .string()
      .max(BIO_MAX_LENGTH)
      .describe("A short bio of the character"),
    level: z.number().int().positive().max(MAX_STAT),
    stats: z.object({
      strength: z.number().int().positive().max(MAX_STAT),
      dexterity: z.number().int().positive().max(MAX_STAT),
      intelligence: z.number().int().positive().max(MAX_STAT),
      charisma: z.number().int().positive().max(MAX_STAT),
    }),
  })
  .describe("RPG character");

export type Character = z.infer<typeof characterSchema>;
