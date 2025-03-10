import { useState, useEffect } from "react";
import { submitResumeData } from "../../services/templateServices";
import {
  AwardsData,
  CeritificatesData,
  Education,
  Experience,
  Project,
  ResumeData,
} from "../../utlis/types/commonTypes";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { apiConfig } from "../../config/apiConfig";

type FieldValue = string | boolean | null;

function isCurrentlyWorkingField(field: string): field is "currentlyWorking" {
  return field === "currentlyWorking";
}

function TemplateEditor() {
  const [resume, setResume] = useState<ResumeData>({
    name: "",
    number: "",
    linkedinUrl: "",
    githubUrl: "",
  });
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState<Experience[]>([
    {
      title: "",
      description: "",
      startDate: null,
      endDate: null,
      currentlyWorking: false,
    },
  ]);
  const [education, setEducation] = useState<Education[]>([
    {
      school: "",
      degree: "",
      startDate: null,
      endDate: null,
      currentlyWorking: false,
      cgpa: null,
    },
  ]);
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([
    {
      title: "",
      description: "",
      startDate: null,
      endDate: null,
      currentlyWorking: false,
      link: "",
      technologies: "",
    },
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("0");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type") ?? "create";
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "edit" && id) {
      fetchResumeData(id);
    }
  }, [type, id]);

  const fetchResumeData = async (id: string) => {
    try {
      setLoading(true);
      const token = Cookies.get("token") || "";

      // Call your API to get resume data by ID
      const response = await fetch(apiConfig.getResume + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch resume data");
      }

      const data = await response.json();

      // Populate the form with existing data
      setResume({
        name: data.user.name || "",
        number: data.user.number || "",
        linkedinUrl: data.user.linkedinUrl || "",
        githubUrl: data.user.githubUrl || "",
      });

      setSummary(data.summary || "");
      setSelectedTemplate(data.selectedTemplate || "1");

      // Set skills
      if (data.skills && data.skills.length > 0) {
        setSkills(data.skills);
      }

      // Set experience
      if (data.experience && data.experience.length > 0) {
        setExperience(data.experience);
      }

      // Set education
      if (data.education && data.education.length > 0) {
        setEducation(data.education);
      }

      // Set projects
      if (data.projects && data.projects.length > 0) {
        setProjects(data.projects);
      }
    } catch (error: any) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        title: "",
        description: "",
        startDate: null,
        endDate: null,
        currentlyWorking: false,
      },
    ]);
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        school: "",
        degree: "",
        startDate: null,
        endDate: null,
        currentlyWorking: false,
        cgpa: 0,
      },
    ]);
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        description: "",
        startDate: null,
        endDate: null,
        currentlyWorking: false,
        link: "",
        technologies: "",
      },
    ]);
  };

  // Generic field change handler with proper type handling
  const handleFieldChange = (
    index: number,
    field: string,
    value: FieldValue,
    section: "experience" | "education" | "projects"
  ) => {
    if (section === "experience") {
      setExperience((prev) => {
        const updated = [...prev];
        if (isCurrentlyWorkingField(field)) {
          updated[index][field] = value as boolean;
        } else {
          (updated as { [key: string]: any })[index][field] = value;
        }
        return updated;
      });
    } else if (section === "education") {
      setEducation((prev) => {
        const updated = [...prev];
        if (isCurrentlyWorkingField(field)) {
          updated[index][field] = value as boolean;
        } else {
          (updated as { [key: string]: any })[index][field] = value;
        }
        return updated;
      });
    } else if (section === "projects") {
      setProjects((prev) => {
        const updated = [...prev];
        if (isCurrentlyWorkingField(field)) {
          updated[index][field] = value as boolean;
        } else {
          (updated as { [key: string]: any })[index][field] = value;
        }
        return updated;
      });
    }
  };

  // Delete handler for each section
  const handleDelete = (
    index: number,
    section: "experience" | "education" | "projects" | "skills"
  ) => {
    switch (section) {
      case "experience":
        setExperience((prev) => prev.filter((_, i) => i !== index));
        break;
      case "education":
        setEducation((prev) => prev.filter((_, i) => i !== index));
        break;
      case "projects":
        setProjects((prev) => prev.filter((_, i) => i !== index));
        break;
      case "skills":
        setSkills((prev) => prev.filter((_, i) => i !== index));
        break;
    }
  };

  const handleAddSkill = () => {
    setSkills((prev) => [...prev, ""]);
  };

  const handleSkillChange = (index: number, value: string) => {
    setSkills((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedResume = {
      name: resume.name.trim(),
      number: resume.number?.trim(),
      linkedinUrl: resume.linkedinUrl?.trim(),
      githubUrl: resume.githubUrl?.trim(),
      selectedTemplate: selectedTemplate.trim(),
    };

    const trimmedEducation = education
      .map((edu) => ({
        ...edu,
        school: edu.school.trim(),
        degree: edu.degree.trim(),
        startDate: edu.startDate ? edu.startDate.trim() : null,
        endDate: edu.endDate ? edu.endDate.trim() : null,
      }))
      .filter((edu) => edu.school && edu.degree);

    const trimmedExperience = experience
      .map((exp) => ({
        ...exp,
        title: exp.title.trim(),
        description: exp.description.trim(),
        startDate: exp.startDate ? exp.startDate.trim() : null,
        endDate: exp.endDate ? exp.endDate.trim() : null,
      }))
      .filter((exp) => exp.title && exp.description);

    const trimmedProjects = projects
      .map((project) => ({
        ...project,
        title: project.title.trim(),
        description: project.description.trim(),
        startDate: project.startDate ? project.startDate.trim() : null,
        endDate: project.endDate ? project.endDate.trim() : null,
        link: project.link.trim(),
        technologies: project.technologies.trim(),
      }))
      .filter((project) => project.title && project.description);

    if (selectedTemplate === "0") {
      alert("Please select a template");
      return;
    }

    if (!resume.name || resume.name.trim() === "") {
      alert("Name is required");
      return;
    }
    if (!resume.number || resume.number.trim() === "") {
      alert("Number is required");
      return;
    }
    const trimmedSkills = skills.filter((skill) => skill.trim() !== "");

    if (trimmedSkills.length === 0) {
      alert("At least one skill is required");
      return;
    }
    if (trimmedEducation.length === 0) {
      alert("At least one education is required");
    }

    // Check startDate and endDate of each education entry
    for (const edu of trimmedEducation) {
      if (!edu.school || edu.school.trim() === "") {
        alert("School is required for education ");
        return;
      }
      if (!edu.degree || edu.degree.trim() === "") {
        alert("Degree is required for education ");
        return;
      }

      if (!edu.startDate || edu.startDate.trim() === "") {
        alert("Start date is required for all education entries");
        return;
      }

      if (
        edu.endDate &&
        edu.endDate.trim() !== "" &&
        new Date(edu.endDate) < new Date(edu.startDate)
      ) {
        alert("End date cannot be earlier than start date for education");
        return;
      }
    }
    setLoading(true);

    const token = Cookies.get("token");
    let awards: AwardsData[] = [];
    let ceritificates: CeritificatesData[] = [];

    try {
      const message = await submitResumeData(
        trimmedResume,
        summary.trim(),
        trimmedProjects.length > 0 ? trimmedProjects : [],
        trimmedSkills,
        trimmedExperience.length > 0 ? trimmedExperience : [],
        trimmedEducation.length > 0 ? trimmedEducation : [],
        awards,
        ceritificates,
        token as string,
        type,
        Number(id)
      );
      setLoading(false);
      if (message.id !== undefined) {
        navigate("/templates", { state: { id: message.id }, replace: true });
      } else {
        setError(message.error ?? message);
      }
    } catch (error) {
      setLoading(false);
      setError(
        "An error occurred while submitting your data. Please try again."
      );
    }
  };

  const handleTemplateChange = (e: any) => {
    setSelectedTemplate(e.target.value);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-red">
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white flex flex-col  h-full w-full max-w-4xl mx-auto p-4">
        <button
          className="bg-lime-500 text-white self-start mb-5 p-3 rounded"
          onClick={() => navigate(-1)}
        >
          back
        </button>
        <div className="space-y-4">
          <select
            value={selectedTemplate}
            onChange={handleTemplateChange}
            className="p-2 border rounded bg-white"
          >
            <option value="0">Select Template</option>
            <option value="1">Minimal Style</option>
            <option value="2">Modern Style</option>
            <option value="3" disabled>
              Cover Letter
            </option>
            <option value="4" disabled>
              UI/UX Designer
            </option>
            <option value="5" disabled>
              Product Designer
            </option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Enter Name"
              value={resume.name}
              onChange={(e) =>
                setResume((prev) => ({ ...prev, name: e.target.value }))
              }
              className="p-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Enter Phone Number"
              value={resume.number}
              onChange={(e) =>
                setResume((prev) => ({ ...prev, number: e.target.value }))
              }
              className="p-2 border rounded"
            />
            <input
              type="url"
              placeholder="LinkedIn Profile(Optional)"
              value={resume.linkedinUrl}
              onChange={(e) =>
                setResume((prev) => ({ ...prev, linkedinUrl: e.target.value }))
              }
              className="p-2 border rounded"
            />
            <input
              type="url"
              placeholder="GitHub Profile(Optional)"
              value={resume.githubUrl}
              onChange={(e) =>
                setResume((prev) => ({ ...prev, githubUrl: e.target.value }))
              }
              className="p-2 border rounded"
            />
          </div>
        </div>

        <hr className="my-6" />

        <div className="space-y-2">
          <h2 className="text-sm md:text-xl font-bold">
            Professional Summary(Optional)
          </h2>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write a professional summary..."
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <hr className="my-6" />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm md:text-xl font-bold">
              Experience(Optional)
            </h2>
            <button
              onClick={handleAddExperience}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Experience
            </button>
          </div>

          {experience.map((exp, index) => (
            <div key={index} className="p-4 border rounded space-y-4">
              <input
                type="text"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    "title",
                    e.target.value,
                    "experience"
                  )
                }
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Job Description"
                value={exp.description}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    "description",
                    e.target.value,
                    "experience"
                  )
                }
                className="w-full p-2 border rounded"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={exp.startDate || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "startDate",
                        e.target.value,
                        "experience"
                      )
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">End Date</label>
                  <input
                    type="date"
                    value={exp.endDate || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "endDate",
                        e.target.value,
                        "experience"
                      )
                    }
                    className="w-full p-2 border rounded"
                    disabled={exp.currentlyWorking}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.currentlyWorking}
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "currentlyWorking",
                      e.target.checked,
                      "experience"
                    )
                  }
                  className="rounded"
                />
                <label>Currently Working Here</label>
              </div>
              <button
                onClick={() => handleDelete(index, "experience")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <hr className="my-6" />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Skills<span className="text-red-500">*</span>
            </h2>
            <button
              onClick={handleAddSkill}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Skill
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 md:grid md:grid-cols-6 md:gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex items-center pl-1 pr-3 border rounded">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    placeholder="Enter skill"
                    className="flex-1 w-[100px] p-2 border-none outline-none rounded"
                  />
                  <button
                    onClick={() => handleDelete(index, "skills")}
                    className="text-red-500 font-bold cursor-pointer"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6" />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Projects <span className="text-red-500">*</span>
            </h2>
            <button
              onClick={handleAddProject}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Project
            </button>
          </div>

          {projects.map((project, index) => (
            <div key={index} className="p-4 border rounded space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) =>
                  handleFieldChange(index, "title", e.target.value, "projects")
                }
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    "description",
                    e.target.value,
                    "projects"
                  )
                }
                className="w-full p-2 border rounded"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={project.startDate || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "startDate",
                        e.target.value,
                        "projects"
                      )
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">End Date</label>
                  <input
                    type="date"
                    value={project.endDate || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "endDate",
                        e.target.value,
                        "projects"
                      )
                    }
                    className="w-full p-2 border rounded"
                    disabled={project.currentlyWorking}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={project.currentlyWorking}
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "currentlyWorking",
                      e.target.checked,
                      "projects"
                    )
                  }
                  className="rounded"
                />
                <label>Currently Working on This Project</label>
              </div>
              <input
                type="text"
                placeholder="Technologies Used (comma-separated)"
                value={project.technologies}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    "technologies",
                    e.target.value,
                    "projects"
                  )
                }
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => handleDelete(index, "projects")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <hr className="my-6" />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Education <span className="text-red-500">*</span>
            </h2>
            <button
              onClick={handleAddEducation}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Education
            </button>
          </div>

          {education.map((educations, index) => (
            <div key={index} className="p-4 border rounded space-y-4">
              <input
                type="text"
                placeholder="School Title"
                value={educations.school}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    "school",
                    e.target.value,
                    "education"
                  )
                }
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Degree"
                value={educations.degree}
                onChange={(e) =>
                  handleFieldChange(
                    index,
                    "degree",
                    e.target.value,
                    "education"
                  )
                }
                className="w-full p-2 border rounded"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={educations.startDate || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "startDate",
                        e.target.value,
                        "education"
                      )
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">End Date</label>
                  <input
                    type="date"
                    value={educations.endDate || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "endDate",
                        e.target.value,
                        "education"
                      )
                    }
                    className="w-full p-2 border rounded"
                    disabled={educations.currentlyWorking}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={educations.currentlyWorking}
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "currentlyWorking",
                      e.target.checked,
                      "education"
                    )
                  }
                  className="rounded"
                />
                <label>Currently Pursuing education</label>
              </div>
              <input
                type="number"
                placeholder="CGPA"
                value={educations.cgpa ?? 0}
                onChange={(e) =>
                  handleFieldChange(index, "cgpa", e.target.value, "education")
                }
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => handleDelete(index, "education")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-900 rounded self-center mt-10"
          onClick={handleSubmit}
        >
          submit
        </button>
      </div>
    </>
  );
}

export default TemplateEditor;
