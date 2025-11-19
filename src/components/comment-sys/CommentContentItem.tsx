"use client";

import React, { useState } from "react";
import ReplyForm from "./forms/ReplyForm";
import EditForm from "./forms/EditForm";
import CustomAvatar from "../CustomAvatar";

export default function CommentContentItem({
  comment,
  level,
  isMobile,
  onReply,
  onEdit,
  onDelete,
  scrollToParent,
  currentUserId,
}: any) {
  const [openReply, setOpenReply] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // ⭐ Only two visible levels (0 or 1)
  const displayLevel = level === 0 ? 0 : 1;

  // ⭐ Clean padding rules
  const padding = isMobile
    ? (displayLevel === 1 ? 12 : 0)
    : (displayLevel === 1 ? 18 : 0);

  const isOwner = currentUserId === comment.userId?._id;

  return (
    <div className="flex gap-3" style={{ paddingLeft: padding }}>
      
      {/* Avatar */}
      <CustomAvatar src={comment.userId?.avatar?.secure_url} />

      <div className="flex-1 min-w-0">

        {/* ⭐ Replying indicator (Instagram style) */}
        {comment.replyToUserName && displayLevel === 1 && (
          <button
            onClick={() => scrollToParent(comment.replyTo)}
            className="text-xs text-blue-500 flex items-center gap-1 mb-1"
          >
            ↳ replying to <span className="font-semibold">{comment.replyToUserName}</span>
          </button>
        )}

        {/* ⭐ Fullname + username */}
        <p className="font-semibold text-sm">
          {comment.userId?.fullname}
          {comment.userId?.username && (
            <span className="text-muted-foreground text-xs ml-1">
              (@{comment.userId.username})
            </span>
          )}
        </p>

        {/* ⭐ Date */}
        <p className="text-xs text-muted-foreground">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>

        {/* ⭐ Text or Edit Form */}
        {!openEdit ? (
          <p className="text-sm mt-2 whitespace-pre-wrap wrap-break-word">
            {comment.message}
          </p>
        ) : (
          <EditForm
            initialText={comment.message}
            onSubmit={(txt: string) => {
              onEdit(comment._id, txt);
              setOpenEdit(false);
            }}
            onCancel={() => setOpenEdit(false)}
          />
        )}

        {/* ⭐ Actions */}
        <div className="flex gap-6 text-xs font-semibold mt-2">
          <button
            onClick={() => setOpenReply(!openReply)}
            className="text-blue-600"
          >
            Reply
          </button>

          {isOwner && (
            <>
              <button
                onClick={() => setOpenEdit(true)}
                className="text-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(comment._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </>
          )}
        </div>

        {/* ⭐ Reply Form */}
        {openReply && (
          <div className="mt-2">
            <ReplyForm
              onSubmit={(value: any) => {
                onReply(comment._id, value);
                setOpenReply(false);
              }}
              onCancel={() => setOpenReply(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
