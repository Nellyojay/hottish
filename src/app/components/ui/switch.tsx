"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";


function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200",
        "peer data-[state=checked]:bg-gray-800 data-[state=unchecked]:bg-gray-300",
        "focus-visible:ring-2 focus-visible:ring-ring/50 outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition-transform duration-200",
          "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
