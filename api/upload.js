import { createFile } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { file } = req.body; // Assicurati di inviare il file come base64 o come binary data

  try {
    const blob = await createFile([file], { access: "public" });

    res.status(200).json({
      message: "File caricato con successo!",
      fileUrl: blob.url,
    });
  } catch (error) {
    res.status(500).json({ error: "Errore durante il caricamento del file" });
  }
}
