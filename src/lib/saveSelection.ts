// Sends the user's gender choice to the API so it gets stored in MongoDB.
// Fire-and-forget: we never block the UI on the network, and failures are
// only logged so the quiz keeps working even if the DB is unreachable.
export function saveSelection(gender: "male" | "female") {
  fetch("/api/selection", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gender }),
  }).catch((err) => {
    console.error("Could not save selection:", err);
  });
}
