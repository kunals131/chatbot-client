import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

const TypeWriterEffect = ({
  text,
  className,
  run,
  onTextEnd,
}: {
  text: string;
  className?: string;
  run?: boolean;
  onTextEnd?: () => void;
}) => {
  useEffect(() => {
    const typewriter = document.getElementById("typewriter") as HTMLElement;
    if (typewriter === null) return;
    let index = 0;
    function type() {
      if (index < text.length) {
        typewriter.innerHTML =
          text.slice(0, index) + '<span class="blinking-cursor">|</span>';
        index++;
        setTimeout(type, Math.random() * 150 + 50);
      } else {
        typewriter.innerHTML = text.slice(0, index);

        onTextEnd && onTextEnd();
      }
    }
    if (run) {
      type();
    }
  }, [run, text]);

  return (
    <div id="typewriter" className={cn(className)}>
      {text}
    </div>
  );
};

export default TypeWriterEffect;
