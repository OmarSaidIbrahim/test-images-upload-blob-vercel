import { useState } from 'react';
import { put } from '@vercel/blob';

function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [blobUrl, setBlobUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!file) return;

        setUploading(true);

        try {
            const response = await fetch('/api/upload-url');
            const { url, headers } = await response.json();

            const res = await fetch(url, {
                method: 'PUT',
                headers: headers,
                body: file,
            });

            if (res.ok) {
                const blob = await put(file.name, file, { access: 'public' });
                setBlobUrl(blob.url);
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setUploading(false);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept="image/*" required />
                <button type="submit" disabled={!file || uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {blobUrl && <p>Uploaded image URL: <a href={blobUrl}>{blobUrl}</a></p>}
        </div>
    );
}

export default FileUpload;