"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/app/store";
import CommentContentItem from "../CommentContentItem";
import ReplyArrow from "./ThreadLine";

export default function CommentThreadItem({
  comment,
  level = 0,
  parentUserId = null,
  onReply,
  onEdit,
  onDelete,
  scrollToParent,
  registerRef,
}: any) {
  const user = useSelector((state: RootState) => state.user.user);
  const [expanded, setExpanded] = useState(true);

  // ⭐ Only allow two visible levels
  const displayLevel = level === 0 ? 0 : 1;

  // ⭐ Same user replying = no extra indent
  const sameUser = parentUserId === comment.userId?._id;

  const showArrow = displayLevel === 1 && !sameUser;

  return (
    <div
      className="relative mt-4"
      style={{
        paddingLeft: displayLevel === 1 && !sameUser ? 26 : 0,
      }}
      ref={
        registerRef
          ? (ref) => registerRef(comment._id, { current: ref })
          : undefined
      }
    >

      {/* ⭐ Instagram-style reply arrow */}
      {showArrow && (
        <div className="absolute left-0 top-1 hidden sm:block">
          <ReplyArrow />
        </div>
      )}

      {/* COMMENT BLOCK */}
      <CommentContentItem
        comment={comment}
        level={displayLevel}
        currentUserId={user?._id}
        onReply={onReply}
        onEdit={onEdit}
        onDelete={onDelete}
        scrollToParent={scrollToParent}
      />

      {/* ⭐ CHILDREN (Flatten after level-1) */}
      {comment.replies?.length > 0 && (
        <>
          <button
            className="text-xs text-blue-500 mt-1 mb-1 ml-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? "Hide replies"
              : `View ${comment.replies.length} replies`}
          </button>

          {expanded && (
            <div className="mt-2">
              {comment.replies.map((child: any) => (
                <CommentThreadItem
                  key={child._id}
                  comment={child}
                  level={1} // ⭐ ALWAYS flatten
                  parentUserId={comment.userId?._id}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  scrollToParent={scrollToParent}
                  registerRef={registerRef}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
