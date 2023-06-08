"use client";

import "./Input.css";

import keycode from "keycode";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  COMMANDS,
  matchingCommand,
  unknownCommand,
} from "@/components/Terminal/commands";
import { TERMINAL_NAME } from "@/config";

export function Input() {
  const [prompt, setPrompt] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [caretPosition, setCaretPosition] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const inputId = useId();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const command = e.target.value;
    setPrompt(command);
    setSuggestion(matchingCommand(command));
  }, []);

  const handleHotkeys = useCallback(
    (e: KeyboardEvent) => {
      const strategy: Record<KeyboardEvent["code"], () => void> = {
        [keycode.codes.tab]: () => {
          if (!suggestion) {
            return;
          }

          e.preventDefault();
          e.stopPropagation();
          setPrompt(suggestion);
          setSuggestion("");
        },
        [keycode.codes.backspace]: () => {
          setCaretPosition((prevState) => prevState - 1);
        },
      };

      strategy[keycode(e.key)]?.();
    },
    [suggestion],
  );

  const handleCaretUpdate = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      if (e.nativeEvent.target) {
        const offset = e.type === "beforeinput" ? 1 : 0;

        setCaretPosition((e.currentTarget.selectionStart ?? 0) + offset);
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      (COMMANDS[prompt] ?? unknownCommand)();
    },
    [prompt],
  );

  useEffect(() => {
    const focusOnInput = () => {
      if (!inputRef.current || document.activeElement !== document.body) {
        return;
      }

      inputRef.current.focus();
    };

    window.addEventListener("keydown", focusOnInput);

    return () => {
      window.removeEventListener("keydown", focusOnInput);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label className="flex gap-5" htmlFor={inputId}>
        <p className="relative select-none whitespace-pre bg-white pl-1 mix-blend-difference before:absolute before:right-0 before:top-1/2 before:aspect-square before:h-[70%] before:-translate-y-1/2 before:translate-x-1/2 before:rotate-45 before:bg-white">
          <span className="text-white mix-blend-difference">
            {TERMINAL_NAME}
          </span>
        </p>
        <div className="relative flex-1">
          <div
            aria-hidden
            aria-label={prompt[caretPosition] ?? " "}
            className="caret pointer-events-none absolute h-0 select-none whitespace-pre text-transparent"
          >
            {prompt.substring(0, caretPosition)}
          </div>

          {suggestion && (
            <div className="absolute select-none whitespace-pre text-white opacity-50 mix-blend-difference">
              <span className="invisible">{prompt}</span>
              {suggestion.substring(prompt.length)}
            </div>
          )}

          <input
            id={inputId}
            ref={inputRef}
            value={prompt}
            onChange={handleChange}
            onKeyDown={handleHotkeys}
            onSelect={handleCaretUpdate}
            onBeforeInput={handleCaretUpdate}
            className="w-full bg-transparent caret-transparent outline-none"
          />
        </div>
      </label>
    </form>
  );
}
