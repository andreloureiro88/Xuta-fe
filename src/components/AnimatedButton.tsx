import React, { useCallback } from "react";

const AnimatedButton: React.FC<{ text: string; trigger: () => void }> = ({
  text,
  trigger,
}) => {
  const onTrigger = useCallback(() => {
    trigger();
  }, [trigger]);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onTrigger();
      }}
      className="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block"
    >
      <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
      <span className="relative group-hover:text-white">{text}</span>
    </button>
  );
};

export default AnimatedButton;
