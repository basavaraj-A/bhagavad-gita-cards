export async function fetchAllShlokas() {
  const response = await fetch("/api/shlokas");
  if (!response.ok) {
    throw new Error("Failed to fetch shlokas");
  }
  return response.json();
}
