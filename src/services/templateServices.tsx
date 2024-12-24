import { apiConfig } from "../config/apiConfig";
import {
  AwardsData,
  CeritificatesData,
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
  awards: AwardsData[],
  ceritificates: CeritificatesData[],
  userId: number,
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
        awards: awards,
        certifications: ceritificates,
        userId: userId,
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

export const getAllResumes = async (token: string) => {
  try {
    const response = await fetch(apiConfig.allResumes, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      return { status: false, message: result.message };
    }
    return { status: true, data: result[0].resumes };
  } catch (error: any) {
    return { status: false, message: error.message };
  }
};
