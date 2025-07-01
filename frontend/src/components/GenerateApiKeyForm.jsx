import { useState } from "react";
import { KeyRound } from "lucide-react";
import toast from "react-hot-toast";
import { projectStore } from "../stores/projectStore"; 

export default function GenerateApiKeyForm({ onCreated }) {
 const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const createProject = projectStore((state) => state.createProject);

  const handleGenerate = async () => {
    if (!name.trim()) return toast.error("Project name required");
    setLoading(true);
    try {
      await createProject({ name }); // <- call store function here
      toast.success("API Key generated!");
      setName("");
    } catch (err) {
      toast.error("Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1A1A40] p-6 rounded-lg mb-8">
      <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <KeyRound className="text-indigo-400" size={20} />
        Generate New API Key
      </h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter your project name"
          className="w-full px-4 py-2 rounded bg-[#2A2A50] text-white placeholder-gray-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded hover:opacity-90"
        >
          {loading ? "Generating..." : "Generate API Key"}
        </button>
      </div>
    </div>
  );
}