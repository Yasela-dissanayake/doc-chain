import React, { useState } from "react";
import axios from "axios";

export default function LandingPage() {
  const [name, setName] = useState("");
  const [docType, setDocType] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("docType", docType);
    formData.append("ownerId", ownerId);

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/documents/register",
        formData
      );
      setMessage("✅ Document uploaded and registered successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload Document</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Document Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            placeholder="Document Type"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            placeholder="Owner ID (Wallet Address or UID)"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border rounded-xl px-4 py-2 bg-gray-50"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-200"
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>

          {message && <p className="text-center text-sm mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
}
