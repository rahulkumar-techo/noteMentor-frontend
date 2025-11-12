"use client"
export function NoteDescription({ description, user, createdAt }: any) {
  return (
    <section className="bg-[#0d0d0f]/70 px-3 md:p-6 rounded-2xl border border-gray-800 backdrop-blur-md">
      <h2 className="text-xl font-semibold text-[#FFD700]">About this Note</h2>
      <p className="text-sm text-gray-300 leading-relaxed">{description || "No description provided."}</p>
      <div className="text-xs text-gray-400 mt-4 space-y-1">
        {user && <p>👤 Uploaded by: <span className="text-gray-300">{user}</span></p>}
        <p>🕒 Uploaded on: <span className="text-gray-300">{new Date(createdAt).toLocaleString()}</span></p>
      </div>
    </section>
  );
}