/**
 * 🔗 ShareLinkBox Component
 * - Displays generated link
 * - One-click copy button
 * - Animated feedback
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";

interface ShareLinkBoxProps {
  link: string;
}

export default function ShareLinkBox({ link }: ShareLinkBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-5 border border-gray-800 bg-[#0d0d0f]/80 rounded-xl shadow-md space-y-3">
      <p className="text-gray-300 text-sm">Share this note with others:</p>

      <div className="flex items-center gap-2">
        <Input
          readOnly
          value={link}
          className="flex-1 text-gray-200 bg-transparent border-gray-700"
        />
        <Button
          onClick={handleCopy}
          className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-semibold"
        >
          <Copy className="w-4 h-4 mr-1" />
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
