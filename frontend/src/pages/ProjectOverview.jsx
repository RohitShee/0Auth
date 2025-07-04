import { useEffect,useState } from "react";
import { User, KeyRound, Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { projectStore } from "../stores/projectStore";


const ProjectOverview = () => {
  const {id} = useParams();
  const {selectedProject,users, fetchProjectDetails} = projectStore();
  const [copied, setCopied] = useState(false);
 useEffect(() => {
    fetchProjectDetails(id);
  }, []);
  if (!selectedProject) return <Loader className="h-5 w-5 animate-spin"/>

  const handleCopy = () => {
    navigator.clipboard.writeText(project.api_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0D0D2B] text-white p-6 md:p-12">
      <h1 className="text-2xl font-bold mb-1">{selectedProject.name}</h1>
      <p className="text-gray-400 mb-6">Project created on {new Date(selectedProject.created_at).toLocaleDateString()}</p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard icon={<User />} title="Total Users" value={selectedProject.user_count} />
        <StatCard icon={<KeyRound />} title="API Requests" value={selectedProject.request_count} />
      </div>

      {/* API Key */}
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

      {/* Users*/}
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
          <th className="px-4 py-2">Custom Fields</th>
        </tr>
      </thead>
      <tbody className="text-sm text-gray-200">
        {users.map((user, idx) => (
          <tr key={idx} className="border-b border-gray-800">
            <td className="px-4 py-2">
              {user.user_profile?.avatar_url ? (
                <img
                  src={user.user_profile.avatar_url}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </td>
            <td className="px-4 py-2">{user.user_profile?.name || "N/A"}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.user_profile?.role || "N/A"}</td>
            <td className="px-4 py-2 whitespace-pre-wrap">
              {user.user_profile?.custom_field
                ? JSON.stringify(user.user_profile.custom_field, null, 2)
                : "N/A"}
            </td>
          </tr>
        ))}
        {users.length === 0 && (
          <tr>
            <td colSpan="5" className="px-4 py-2 text-center text-gray-500">No users found.</td>
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
