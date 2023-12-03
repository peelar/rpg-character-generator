"use client";

import { generateRpgCharacter } from "@/lib/actions";
import { Character } from "@/lib/schema";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { GeneratedCharacters } from "./GenerateResult";

const initialState: { data: Character[] } = {
  data: [],
};

export const GenerateForm = () => {
  const [state, formAction] = useFormState(generateRpgCharacter, initialState);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { pending } = useFormStatus();

  return (
    <form
      className="h-full"
      onSubmit={() => {
        setIsSubmitted(true);
      }}
      action={formAction}
    >
      <div className="flex flex-col justify-between items-center h-full gap-4">
        <GeneratedCharacters characters={state.data} />
        <button
          className="bg-stone-500 hover:bg-stone-700 text-white font-bold text-xl py-2 px-4 rounded transition-all shadow-md transform hover:scale-105 border-4 border-black row-span-2"
          disabled={pending}
          type="submit"
        >
          {pending ? "Revealing..." : isSubmitted ? "More" : "Reveal"}
        </button>
      </div>
    </form>
  );
};
