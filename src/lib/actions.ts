"use server";

import zodToJsonSchema from "zod-to-json-schema";
import { openai } from "./openai";
import { BIO_MAX_LENGTH, Character, MAX, characterSchema } from "./schema";

const textToCharacter = (text: string) => {
  return characterSchema.parse(JSON.parse(text));
};

const N = 3;

const prompt = `Generate ${N} unique characters for a fantasy RPG game. Each character should have a level and stats (strength, dexterity, intelligence, charisma) ranging from 1 to ${MAX}. Bio must be shorter than ${BIO_MAX_LENGTH} characters. Ensure that each character has a distinct and unique name, with no repetitions or similar-sounding names. Each name should be clearly different from the others, reflecting a variety of origins and styles. The generated characters should not be from an existing fantasy franchise`;

export async function generateRpgCharacter() {
  console.log("Generating RPG characters...");
  const parameters = zodToJsonSchema(characterSchema);

  const response = await openai.chat.completions.create({
    temperature: 0.8,
    model: "gpt-4",
    messages: [
      {
        content: prompt,
        role: "assistant",
      },
    ],
    functions: [
      {
        name: "output_formatter",
        description: "Should always be used to properly format output",
        parameters,
      },
    ],
    function_call: { name: "output_formatter" },
    n: N,
    seed: Math.floor(Math.random() * 100000),
  });

  const characters = response.choices.reduce((prev, next) => {
    const text = next.message.function_call?.arguments;

    if (!text) {
      return prev;
    }

    try {
      const character = textToCharacter(text);
      return [...prev, character];
    } catch (error) {
      console.log("Error while parsing character");
      console.log(text);
      console.log(error);
      return prev;
    }
  }, [] as Character[]);

  console.log("Returning generated characters");

  return { data: characters as Character[] };
}
