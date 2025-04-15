import { useEffect, useState } from "react";
import axios from "axios";

interface DocumentType {
  id: number;
  name: string;
  cid: string;
  type: string;
  ownerId: string;
  timestamp: string;
}

export default function DocumentList() {
  const [documents, setDocuments] = useState<DocumentType[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get<{ data: DocumentType[] }>(
          "http://localhost:5000/api/documents/"
        );
        setDocuments(response.data.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Uploaded Documents</h2>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Owner ID</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">IPFS Link</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="border-t">
                <td className="px-4 py-2 border">{doc.name}</td>
                <td className="px-4 py-2 border">{doc.type}</td>
                <td className="px-4 py-2 border">{doc.ownerId}</td>
                <td className="px-4 py-2 border">
                  {new Date(doc.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-2 border text-blue-600 underline">
                  <a
                    href={`https://ipfs.io/ipfs/${doc.cid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
            {documents.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
