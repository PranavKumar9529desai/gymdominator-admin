export default async function FetchTrainers({
  gymid,
}: {
  gymid: string;
}): Promise<Trainer[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/owner/trainers/${gymid}`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as TrainersResponse;

    if (!data.trainers) {
      throw new Error("No trainers data received");
    }

    console.log("trainers data is this", data.trainers);
    return data.trainers;
  } catch (error) {
    console.error("Error fetching trainers:", error);
    return []; // Return empty array instead of undefined
  }
}
