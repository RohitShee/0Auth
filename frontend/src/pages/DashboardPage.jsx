import { useEffect } from "react";
import GenerateApiKeyForm from "../components/GenerateApiKeyForm";
import ProjectCard from "../components/ProjectCard";
import EmptyState from "../components/EmptyState";
import { projectStore } from "../stores/projectStore";

const DashboardPage = () => {
  const { projects, fetchProjects } = projectStore();

  useEffect(() => {
    fetchProjects(); 
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D2B] text-white px-4 md:px-12 py-8">
      <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
      <p className="text-gray-400 mb-6">
        Manage your API keys and monitor your projects
      </p>
      
      <GenerateApiKeyForm />

      <h2 className="text-lg font-semibold mb-3">Your API Keys & Projects</h2>
      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
