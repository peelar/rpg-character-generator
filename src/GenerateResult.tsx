"use client";

import { Character } from "@/lib/schema";
import React from "react";

const classEmojiMap: Record<Character["class"], string> = {
  rogue: "🏹",
  mage: "🧙",
  warrior: "🤺",
};

const CharacterCard = (props: Character) => {
  return (
    <div className="bg-gray-200 p-4 border-4 border-gray-600 shadow-md flex flex-col justify-around h-96">
      <div>
        <h1 className="text-2xl font-bold mb-4">
          {props.name} {classEmojiMap[props.class]}
        </h1>
        <p className="text-black/60 text-md mb-2">{props.bio}</p>
      </div>

      <div>
        <p className="text-lg mb-2">
          <b>City:</b> {props.city}
        </p>
        <p className="text-lg mb-2">
          <b>Level:</b> {props.level}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-md mt-4">
        <p>Strength: {props.stats.strength}</p>
        <p>Dexterity: {props.stats.dexterity}</p>
        <p>Intelligence: {props.stats.intelligence}</p>
        <p>Charisma: {props.stats.charisma}</p>
      </div>
    </div>
  );
};

export const GeneratedCharacters = ({
  characters,
}: {
  characters: Character[];
}) => {
  const [isCopied, setIsCopied] = React.useState(false);

  React.useEffect(() => {
    setIsCopied(false);
  }, [characters]);

  return (
    <section className="flex flex-col gap-2">
      <div className="grid grid-flow-col auto-cols-[360px] overflow-x-scroll gap-8 max-w-6xl pb-4 row-span-1">
        {characters.map((character) => (
          <CharacterCard key={character.name} {...character} />
        ))}
      </div>
      <div className="flex flex-row-reverse mt-2">
        <button
          type="button"
          className="p-2 shadow-sm hover:bg-gray-50 border-2 border-gray-600 rounded-md"
          onClick={() => {
            const json = JSON.stringify(characters);
            navigator.clipboard.writeText(json);
            setIsCopied(true);
          }}
        >
          {isCopied ? "Copied!" : "Copy JSON"}
        </button>
      </div>
    </section>
  );
};
