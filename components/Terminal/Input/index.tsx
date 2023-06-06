"use client";

import "./Input.css";

import {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { TERMINAL_NAME } from "@/config";

export function Input() {
  const [value, setValue] = useState("");
  const [caretPosition, setCaretPosition] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const inputId = useId();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleCaretUpdate = useCallback(
    (e: SyntheticEvent<HTMLInputElement>, offset = 0) => {
      if (e.nativeEvent.target)
        setCaretPosition((e.currentTarget.selectionStart ?? 0) + offset);
    },
    [],
  );

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    console.log("SUBMIT");
  }, []);

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
      <label className="flex" htmlFor={inputId}>
        <p className="whitespace-pre">{TERMINAL_NAME} </p>
        <div className="relative flex-1">
          <div
            aria-hidden
            aria-label={value[caretPosition] ?? " "}
            className="caret pointer-events-none absolute h-0 select-none whitespace-pre text-transparent"
          >
            {value.substring(0, caretPosition)}
          </div>

          <input
            className="peer w-full bg-transparent caret-transparent outline-none"
            id={inputId}
            ref={inputRef}
            value={value}
            onChange={handleChange}
            onSelect={handleCaretUpdate}
            onBeforeInput={(e) => handleCaretUpdate(e, 1)}
          />
        </div>
      </label>
    </form>
  );
}
