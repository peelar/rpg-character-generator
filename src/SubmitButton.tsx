"use client";

import { useFormStatus } from "react-dom";

export const SubmitButton = ({ isSubmitted }: { isSubmitted: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-stone-500 hover:bg-stone-700 text-white font-bold text-xl py-2 px-4 rounded transition-all shadow-md transform hover:scale-105 border-4 border-black row-span-2"
      disabled={pending}
      type="submit"
    >
      {pending ? "Revealing..." : isSubmitted ? "More" : "Reveal"}
    </button>
  );
};
