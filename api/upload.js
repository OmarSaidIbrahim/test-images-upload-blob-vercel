const { Blob } = require("@vercel/blob");

export default async function handler(req, res) {
  const blob = new Blob({
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const { url, headers } = await blob.getSignedUrl({
    access: "public",
    expires: Date.now() + 60 * 1000, // URL expires in 1 minute
  });

  res.json({ url, headers });
}
