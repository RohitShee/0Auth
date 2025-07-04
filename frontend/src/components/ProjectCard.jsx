import { useState } from "react";
import { User2, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(project.api_key).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    });
  };

  return (
    <div className="bg-[#1A1A40] p-4 rounded-lg border border-gray-700 mb-4">
      <Link to={`/project/${project.id}`} className="text-indigo-300 text-base font-semibold mb-1 hover:text-indigo-600 hover:underline">
        {project.name}
      </Link>
      <p className="text-sm text-gray-400 mb-1">
        Created: {new Date(project.created_at).toLocaleDateString()}
      </p>
      <div className="relative bg-[#2A2A50] text-white text-sm px-4 py-2 rounded w-full">
        {project.api_key.slice(0, 10)}...
        <button
          onClick={handleCopy}
          className="absolute top-1/2 right-2 -translate-y-1/2 px-2 py-1 text-sm bg-white text-black rounded"
        >
          {copied ? "Copied" : "Copy Key"}
        </button>
      </div>
      <div className="flex gap-6 mt-3 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <User2 size={14} />
          {project.user_count || 0} Users
        </div>
        <div className="flex items-center gap-1">
          <KeyRound size={14} />
          {project.request_count || 0} API Requests
        </div>
      </div>
    </div>
  );
}
