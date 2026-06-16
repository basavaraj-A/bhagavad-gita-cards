const BASE_URL = "http://localhost:5000";

export async function fetchQuotesByPhilosopher(name) {
  const response = await fetch(
    `${BASE_URL}/api/quotes?philosopher=${encodeURIComponent(name)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch quotes");
  }
  return response.json();
}