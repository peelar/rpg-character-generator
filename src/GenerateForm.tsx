"use client";

import { generateRpgCharacter } from "@/lib/actions";
import { Character } from "@/lib/schema";
import React from "react";
import { useFormState } from "react-dom";
import { GeneratedCharacters } from "./GenerateResult";
import { SubmitButton } from "./SubmitButton";

const initialState: { data: Character[] } = {
  data: [],
};

export const GenerateForm = () => {
  const [state, formAction] = useFormState(generateRpgCharacter, initialState);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

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
        <SubmitButton isSubmitted={isSubmitted} />
      </div>
    </form>
  );
};
