import { motion } from "framer-motion";

import { activeKeyCodes, KEYBOARD_LAYOUT } from "../constants";
import { Key } from "./Key";

interface Props {
  keys: (typeof KEYBOARD_LAYOUT)[number]["keys"];
}

export function Row({ keys }: Props) {
  return (
    <motion.ul className="mx-auto flex justify-center overflow-hidden">
      {keys.map((key) => (
        <Key
          key={key.id}
          pressed={activeKeyCodes.has(key.code)}
          name={key.name}
          grow={"grow" in key}
          border={"border" in key}
        />
      ))}
    </motion.ul>
  );
}
