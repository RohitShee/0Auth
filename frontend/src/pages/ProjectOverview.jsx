import { useEffect, useState } from "react";
import { User, KeyRound, Loader, Pencil, DeleteIcon, Check } from "lucide-react";
import { useParams } from "react-router-dom";
import { projectStore } from "../stores/projectStore";


const ProjectOverview = () => {
  const { id } = useParams();
  const { selectedProject, users, fetchProjectDetails, deleteProject,updateProject } = projectStore();
  const [copied, setCopied] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchProjectDetails(id);
  }, [id]);

  const customKeys = Array.from(
    new Set(
      users.flatMap(user =>
        user.user_profile?.custom_field ? Object.keys(user.user_profile.custom_field) : []
      )
    )
  );

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditData({
      name: user.user_profile?.name || "",
      role: user.user_profile?.role || "",
      avatar_url: user.user_profile?.avatar_url || "",
      custom_field: { ...user.user_profile?.custom_field } || {}
    });
  };

  const handleSave = async (userId) => {
   await updateProject(userId,editData);
   window.location.reload();
  };

  const handleDelete = (user) => {
    deleteProject(user.id);
    window.location.reload();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedProject.api_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomFieldChange = (key, value) => {
    setEditData(prev => ({
      ...prev,
      custom_field: {
        ...prev.custom_field,
        [key]: value
      }
    }));
  };

  if (!selectedProject) return (
    <div className="flex items-center justify-center min-h-screen bg-[#0D0D2B] text-white">
      <Loader className="animate-spin text-indigo-400" size={40} />
      <span className="ml-2">Loading project details...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0D0D2B] text-white p-6 md:p-12">
      <h1 className="text-2xl font-bold mb-1">{selectedProject.name}</h1>
      <p className="text-gray-400 mb-6">Project created on {new Date(selectedProject.created_at).toLocaleDateString()}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard icon={<User />} title="Total Users" value={selectedProject.user_count} />
        <StatCard icon={<KeyRound />} title="API Requests" value={selectedProject.request_count} />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">API Key Details</h2>
        <div className="relative bg-[#1A1A40] px-4 py-2 rounded-md text-sm text-white w-full">
          {selectedProject.api_key.slice(0, 10)}...
          <button
            onClick={handleCopy}
            className="absolute top-1/2 right-2 -translate-y-1/2 px-2 py-1 bg-white text-black text-xs rounded"
          >
            {copied ? "Copied!" : "Copy Key"}
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left bg-[#1A1A40] rounded-md">
            <thead className="text-sm border-b border-gray-700 text-gray-300">
              <tr>
                <th className="px-4 py-2">Avatar</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                {customKeys.map((key) => (
                  <th key={key} className="px-4 py-2 capitalize">{key}</th>
                ))}
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-200">
              {users.map((user, idx) => {
                const profile = user.user_profile || {};
                const isEditing = editingUserId === user.id;
                return (
                  <tr key={idx} className="border-b border-gray-800">
                    <td className="px-4 py-2">
                      {isEditing ? (
                        <input type="text" value={editData.avatar_url || ""} onChange={(e) => handleChange("avatar_url", e.target.value)} className="text-black p-1 rounded w-24 bg-white" />
                      ) : (
                        profile.avatar_url ? (
                          <img src={profile.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full" />
                        ) : <span className="text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {isEditing ? (
                        <input type="text" value={editData.name || ""} onChange={(e) => handleChange("name", e.target.value)} className="text-black p-1 rounded w-24 bg-white" />
                      ) : profile.name || "N/A"}
                    </td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      {isEditing ? (
                        <input type="text" value={editData.role || ""} onChange={(e) => handleChange("role", e.target.value)} className="text-black p-1 rounded w-24 bg-white" />
                      ) : profile.role || "N/A"}
                    </td>
                    {customKeys.map((key) => (
                      <td key={key} className="px-4 py-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.custom_field?.[key] || ""}
                            onChange={(e) => handleCustomFieldChange(key, e.target.value)}
                            className="text-black p-1 rounded w-24 bg-white"
                          />
                        ) : profile.custom_field?.[key] ?? "N/A"}
                      </td>
                    ))}
                    <td className="px-4 py-2 flex gap-2">
                      {isEditing ? (
                        <button
                          onClick={() => handleSave(user.id)}
                          className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                        >
                          <Check />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-xs bg-yellow-500 hover:bg-yellow-600 text-black px-2 py-1 rounded"
                        >
                          <Pencil />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user)}
                        className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5 + customKeys.length} className="px-4 py-2 text-center text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color = "text-white" }) => (
  <div className="bg-[#1A1A40] p-4 rounded-lg flex flex-col items-start gap-2 border border-gray-700">
    <div className="text-sm text-gray-300">{title}</div>
    <div className={`text-2xl font-bold flex items-center gap-2 ${color}`}>{icon} {value}</div>
  </div>
);

export default ProjectOverview;
