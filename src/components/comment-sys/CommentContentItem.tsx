"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
    currentUserId   // ➤ add this
}: any) {
    const [openReply, setOpenReply] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    

    const desktopIndent = level === 1 ? 20 : 0;
    const isOwner = currentUserId === comment.userId?._id; // ⭐ check owner
    return (
        <div
            className="flex gap-3"
            style={{
                paddingLeft: isMobile
                    ? Math.min(level * 12, 20)  // ⭐ mobile indentation
                    : (level === 1 ? 20 : level * 12), // ⭐ desktop indentation
            }}
        >


            <CustomAvatar src={comment.userId?.avatar?.secure_url} />

            <div className="flex-1 min-w-0">

                {isMobile && comment.replyTo && (
                    <button
                        onClick={() => scrollToParent(comment.replyTo)}
                        className="text-xs text-blue-600 flex items-center gap-1 mb-1"
                    >
                        ↳ Replying to <span className="font-semibold">{comment.replyToUserName}</span>
                    </button>
                )}

                <p className="font-semibold text-sm">{comment.userId?.fullname}</p>
                <p className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                </p>

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

                {/* ACTIONS */}
                <div className="flex gap-6 text-xs font-semibold mt-2">

                    {/* Reply always visible */}
                    <button onClick={() => setOpenReply(!openReply)} className="text-blue-600">
                        Reply
                    </button>

                    {/* ONLY show if owner */}
                    {isOwner && (
                        <>
                            <button onClick={() => setOpenEdit(true)} className="text-yellow-600">
                                Edit
                            </button>
                            <button onClick={() => onDelete(comment._id)} className="text-red-600">
                                Delete
                            </button>
                        </>
                    )}
                </div>

                {openReply && (
                    <div className="mt-2">
                        <ReplyForm
                            onSubmit={(v: any) => {
                                onReply(comment._id, v);
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

