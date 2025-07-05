import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const projectStore = create((set, get) => ({
  projects: [],
  selectedProject: null,
  users : [],
  createProject: async (data) => {
    try {
      const res = await axiosInstance.post('project/create', data);
      set({ projects: [...get().projects, res.data] });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  },

  fetchProjects: async () => {
    try {
      const res = await axiosInstance.get('project/all');
      set({ projects: res.data.projects });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  },

  fetchProjectDetails: async (id) => {
    try {
      const res = await axiosInstance.get(`project/all/${id}`);
      set({ users: res.data.users,selectedProject : res.data.project });
        console.log(res.data.project);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  },
  deleteProject: async (id) => {
    try {
      await axiosInstance.delete(`project/${get().selectedProject.id}/user/${id}`);
      toast.success('User removed from project successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  },
  updateProject: async (id, payload) => {
    try {
      await axiosInstance.put(`project/${get().selectedProject.id}/user/${id}`, payload);
      toast.success('Project updated successfully');
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  },
}));
