// components/comment/CommentForm.tsx
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CommentForm({ onSubmit }: any) {
  const [text, setText] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <Textarea
        className="min-h-[90px] text-sm"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button size="sm">Post</Button>
    </form>
  );
}
