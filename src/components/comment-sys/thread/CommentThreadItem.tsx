"use client";

import { useSelector } from "react-redux";
import CommentContentItem from "../CommentContentItem";
import { RootState } from "@/app/store";

export default function CommentThreadItem({
  comment,
  level = 0,
  parentUserId = null,
  onReply,
  onEdit,
  onDelete,
}: any) {
  const user = useSelector((state: RootState) => state.user.user);

  const isRoot = level === 0;
  const isSameUserAsParent = parentUserId === comment.userId?._id;

  // Desktop indent ONLY if NOT same user
  const desktopIndent = isSameUserAsParent ? "ml-0" : "ml-8";

  // Mobile indent: smaller, unless same user
  const mobileIndent = isSameUserAsParent ? "ml-0" : "ml-4";

  return (
    <div className="flex mt-4">

      {/* Vertical Line (Desktop Only) */}
      {!isRoot && !isSameUserAsParent && (
        <div className="hidden sm:block">
          <div className="w-[2px] bg-neutral-700 dark:bg-neutral-600 h-full mr-3"></div>
        </div>
      )}

      {/* MAIN COMMENT AREA */}
      <div className="flex-1">
        <CommentContentItem
          comment={comment}
          level={level}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          isMobile={false}
          currentUserId={user?._id}
        />

        {/* CHILDREN */}
        {comment.replies?.length > 0 && (
          <div className={`${mobileIndent} sm:${desktopIndent} mt-3`}>
            {comment.replies.map((child: any) => (
              <CommentThreadItem
                key={child._id}
                comment={child}
                level={level + 1}
                parentUserId={comment.userId?._id}  // pass parent for comparison
                onReply={onReply}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
