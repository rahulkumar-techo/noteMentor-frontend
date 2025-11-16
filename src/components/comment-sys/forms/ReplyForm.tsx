// components/comment/ReplyForm.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ReplyForm({ onSubmit, onCancel }: any) {
  const [text, setText] = useState("");

  const submit = (e: any) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ text });
    setText("");
  };

  return (
    <form onSubmit={submit} className="space-y-2 mt-2">
      <Textarea
        className="text-sm min-h-[70px]"
        placeholder="Write a reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-2">
        <Button size="sm">Reply</Button>
        <Button size="sm" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
