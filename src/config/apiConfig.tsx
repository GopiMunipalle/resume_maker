const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiConfig = {
  signUp: `${BASE_URL}/user/signup`,
  login: `${BASE_URL}/user/login`,
  createResume: `${BASE_URL}/resume/`,
  allResumes: `${BASE_URL}/resume/all`,
  getResume: `${BASE_URL}/resume/`,
};
