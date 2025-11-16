// components/comment/EditForm.tsx
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditForm({ initialText, onSubmit, onCancel }: any) {
  const [text, setText] = useState(initialText);

  const save = (e: any) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
  };

  return (
    <form onSubmit={save} className="space-y-2 mt-2">
      <Textarea
        className="text-sm min-h-[70px]"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-2">
        <Button size="sm">Save</Button>
        <Button size="sm" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
