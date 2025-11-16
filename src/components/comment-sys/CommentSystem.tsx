"use client";

import React, { useEffect } from "react";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} from "@/feature/comment/commentApi";

import CommentForm from "./forms/CommentForm";
import CommentSkeleton from "./skeletons/CommentSkeleton";
import CommentList from "./CommentLists";
import { socket } from "@/lib/socket";

export default function CommentSystem({ noteId }: { noteId: string }) {
  const { data, isLoading, refetch } = useGetCommentsQuery({
    noteId,
    page: 1,
    limit: 20,
  });

  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [editComment] = useEditCommentMutation();

  // -----------------------------
  // GLOBAL REALTIME LISTENERS (NO ROOMS)
  // -----------------------------
  useEffect(() => {
    const handleCreate = () => refetch();
    const handleEdit = () => refetch();
    const handleDelete = () => refetch();

    socket.on("comment:created", handleCreate);
    socket.on("comment:edited", handleEdit);
    socket.on("comment:deleted", handleDelete);

    return () => {
      socket.off("comment:created", handleCreate);
      socket.off("comment:edited", handleEdit);
      socket.off("comment:deleted", handleDelete);
    };
  }, []); // ← stable, no warnings

  // -----------------------------
  // CRUD HANDLERS (backend emits already)
  // -----------------------------

  const handleAdd = async (message: string, parentId: string | null = null) => {
    try {
      await addComment({
        noteId,
        message,
        parentCommentId: parentId,
      }).unwrap();
    } catch (err) {
      console.error("Add comment failed:", err);
    }
  };

  const handleEdit = async (commentId: string, message: string) => {
    try {
      await editComment({ noteId, commentId, message }).unwrap();
    } catch (err) {
      console.error("Edit comment failed:", err);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment({ noteId, commentId }).unwrap();
    } catch (err) {
      console.error("Delete comment failed:", err);
    }
  };

  const comments = data?.data?.comments || [];

  return (
  <section>
    <h1 className=" text-xl py-2.5">Comments:  {comments.length}</h1>
      <div className="space-y-6 overflow-x-auto">
      <CommentForm onSubmit={({ text }: any) => handleAdd(text)} />

      <hr className="my-4 opacity-40" />

      {isLoading ? (
        <div className="space-y-3">
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      ) : (
        <CommentList
          comments={comments}
          onReply={(parentId: string, val: any) => handleAdd(val.text, parentId)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  </section>
  );
}
