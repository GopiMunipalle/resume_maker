import { apiConfig } from "../config/apiConfig";
import {
  Education,
  Experience,
  Project,
  ResumeData,
} from "../utlis/types/commonTypes";

export const submitResumeData = async (
  resume: ResumeData,
  summary: any,
  projects: Project[],
  skills: string[],
  experience: Experience[],
  education: Education[],
  token: string
) => {
  try {
    const response = await fetch(apiConfig.createResume, {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({
        experience: experience,
        education: education,
        projects: projects,
        skills: skills,
        summary: summary,
        resume: resume,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      return result.message;
    }
    return result;
  } catch (error: any) {
    return error.message;
  }
};
