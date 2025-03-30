"use client";

import { useEffect, useState } from "react";
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  delay?: number;
  onDebounce?: (value: string) => void;
  title: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, delay = 500, onDebounce, title, ...props }, ref) => {
    const [value, setValue] = useState("");

    useEffect(() => {
      const handler = setTimeout(() => {
        onDebounce?.(value);
      }, delay);

      return () => clearTimeout(handler);
    }, [value, delay, onDebounce]);

    return (
      <div className="relative w-1/3">
        <p className="text-sm mb-1">{title}</p>
        <input
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "w-full rounded-md border border-[#30363d] bg-[#0d1117] px-4 py-2 text-sm text-white",
            "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500",
            className
          )}
          {...props}
        />
        <Search
          className="absolute right-3 top-8 h-5 w-5 text-gray-500"
          strokeWidth={1.8}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
