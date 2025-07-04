import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

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
  }
}));
