import { useState } from 'react';

function FileUpload() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files?.[0]) {
            setFile(e.target.files[0]);
        }

    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        console.log(result.fileUrl);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Carica</button>
        </form>
    );
}

export default FileUpload;