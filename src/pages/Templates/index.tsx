import { useEffect } from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { resumesData } from "../../redux/slices/resumeSlice";

function Templates() {
  const resumeData = useSelector((state: RootState) => state.resume.resumes);
  const userData = useSelector((state: RootState) => state.auth);
  const dispath: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispath(resumesData(userData.token));
  }, [userData.token]);

  return (
    <div className="min-h-screen bg-gray-900 pb-10">
      <Header />
      <div className="container mx-auto px-4 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">My Resumes</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/create-resume")}
          >
            Create Resume
          </button>
        </div>

        {resumeData?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-white text-lg">You don't have any resumes yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeData?.map((resume) => (
              <div
                key={resume.id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 text-white"
              >
                <h2 className="text-xl font-bold mb-4">Resume #{resume.id}</h2>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-500 px-2 py-1 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Experience</h3>
                  {resume.experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="mb-3 border-l-2 border-blue-500 pl-3"
                    >
                      <h4 className="font-medium">{exp.title}</h4>
                      <p className="text-sm text-gray-300">{exp.description}</p>
                      <p className="text-sm text-gray-400">
                        {exp.startDate} -{" "}
                        {exp.currentlyWorking ? "Present" : exp.endDate}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Education</h3>
                  {resume.education.map((edu) => (
                    <div
                      key={edu.id}
                      className="mb-3 border-l-2 border-blue-500 pl-3"
                    >
                      <h4 className="font-medium">{edu.school}</h4>
                      <p className="text-sm text-gray-300">{edu.degree}</p>
                      <p className="text-sm text-gray-400">
                        {edu.startDate} -{" "}
                        {edu.currentlyWorking ? "Present" : edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Projects</h3>
                  {resume.projects.map((project) => (
                    <div
                      key={project.id}
                      className="mb-3 border-l-2 border-blue-500 pl-3"
                    >
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-gray-300">
                        {project.description}
                      </p>
                      <p className="text-sm text-gray-400">
                        Technologies: {project.technologies}
                      </p>
                      <p className="text-sm text-gray-400">
                        {project.startDate} -{" "}
                        {project.currentlyWorking ? "Present" : project.endDate}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate(`/resume/${resume.id}`)}
                  className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Templates;
