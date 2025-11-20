export const downloadUsersAndNotesCSV = (users:any, notes:any) => {
  try {
    let csv = "";

    // ----- USERS TABLE -----
    csv += "USERS\n";
    csv += "fullname,email,role,createdAt\n";

    users.forEach((u:any) => {
      csv += `"${u.fullname}","${u.email}","${u.role}","${u.createdAt}"\n`;
    });

    csv += "\n\n";

    // ----- NOTES TABLE -----
    csv += "NOTES\n";
    csv += "title,subject,pages,createdAt,authorId\n";

    notes.forEach((n:any) => {
      csv += `"${n?.title ?? ""}",` +
             `"${n?.subject ?? ""}",` +
             `"${n?.pages?.length ?? 0}",` +
             `"${n?.createdAt ?? ""}",` +
             `"${n?.authorId ?? ""}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "users_and_notes.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("CSV Export FAILED:", err);
  }
};
