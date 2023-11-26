"use client";

import { generateRpgCharacter } from "@/lib/actions";
import { Character } from "@/lib/schema";
import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";
import { GeneratedCharacters } from "./GenerateResult";

const initialState: { data: Character[] } = {
  data: [],
};

export const GenerateForm = () => {
  const [state, formAction] = useFormState(generateRpgCharacter, initialState);

  return (
    <form className="h-full" action={formAction}>
      <div className="flex flex-col justify-between items-center h-full gap-4">
        <GeneratedCharacters characters={state.data} />
        <SubmitButton />
      </div>
    </form>
  );
};
