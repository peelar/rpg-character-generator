"use server";

import zodToJsonSchema from "zod-to-json-schema";
import { openai } from "./openai";
import { BIO_MAX_LENGTH, Character, MAX_STAT, characterSchema } from "./schema";

const textToCharacter = (text: string) => {
  return characterSchema.parse(JSON.parse(text));
};

const N = 8;

const prompt = `Generate ${N} unique characters for a fantasy RPG game. Each character should have a level and stats (strength, dexterity, intelligence, charisma) ranging from 1 to ${MAX_STAT}. Bio must be shorter than ${BIO_MAX_LENGTH} characters. Ensure that each character has a distinct and unique name, with no repetitions or similar-sounding names. Each name should be clearly different from the others, reflecting a variety of origins and styles. The generated characters should not be from an existing fantasy franchise`;

function filterOutCharacterWithSimilarNames(characters: Character[]) {
  const filteredCharacters = characters.filter((character) => {
    const words = character.name.split(" ");
    const filteredWords = words.filter(
      (word) => word === "the" || word.length > 2
    );

    const hasSimilarName = characters.some(
      (otherCharacter) =>
        otherCharacter.name !== character.name &&
        filteredWords.some((word) => otherCharacter.name.includes(word))
    );

    if (hasSimilarName) {
      console.log(
        `Character ${character.name} filtered out because there is already a character with a similar name.`
      );
    }

    return !hasSimilarName;
  });

  return filteredCharacters;
}

export async function generateRpgCharacter() {
  console.log("Generating RPG characters...");
  const parameters = zodToJsonSchema(characterSchema);

  const response = await openai.chat.completions.create({
    temperature: 1.5,
    model: "gpt-3.5-turbo-1106",
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

  console.log("Parsed characters");
  console.log(characters);

  const filteredCharacters = filterOutCharacterWithSimilarNames(characters);

  console.log("Filtered characters");
  console.log(filteredCharacters);

  return { data: filteredCharacters.slice(0, 3) as Character[] };
}
