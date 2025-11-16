"use client";

import React, { useRef } from "react";
import CommentThreadItem from "./thread/CommentThreadItem";

export default function CommentList({ comments, onReply, onEdit, onDelete }: any) {
  
  // ⭐ FIXED TYPE
  const commentRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});

  const registerRef = (id: string, ref: React.RefObject<HTMLDivElement>) => {
    commentRefs.current[id] = ref;
  };

  const scrollToParent = (id: string) => {
    const ref = commentRefs.current[id];
    if (ref?.current) {
      ref.current.classList.add("bg-yellow-100");

      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        ref.current?.classList.remove("bg-yellow-100");
      }, 2000);
    }
  };

  return (
    <div className="w-full space-y-4 overflow-x-auto">
      {comments?.map((c: any) => (
        
        <div key={c._id} className="border-b border-muted/30 pb-4 mb-4">
          <CommentThreadItem
            comment={c}
            level={0}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            registerRef={registerRef}
            scrollToParent={scrollToParent}
          />
        </div>

      ))}
    </div>
  );
}
