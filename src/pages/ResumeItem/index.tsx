import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Education,
  Experience,
  Project,
  User,
} from "../../utlis/types/commonTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getOneResume } from "../../services/templateServices";
import jsPDF from "jspdf";
import "jspdf-autotable";

export interface Data {
  summary: string;
  awards: any[];
  certifications: any[];
  createdAt: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string[];
  updatedAt: string;
  user: User;
  status: boolean;
}

function ResumeItem() {
  const { id } = useParams();
  const [resume, setResume] = useState<Data | null>(null);
  const user = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResume() {
      const result = await getOneResume(user.token, Number(id));
      if (!result.status) {
        alert(result.message);
        return;
      }
      setResume(result.data);
    }
    fetchResume();
  }, [id, user.token]);

  function getMonthAndYear(startDate: string | null) {
    const date = new Date(String(startDate));
    const options: any = { year: "numeric", month: "short" };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  }

  const generatePDF = () => {
    const doc = new jsPDF({ orientation: "portrait", unit: "in" });
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let y = 0.5;
    const margin = 0.5;
    const maxWidth = pageWidth - 2 * margin;
    const lineSpacing = 0.22;

    const checkPageOverflow = (requiredSpace: number) => {
      if (y + requiredSpace > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    doc.setDrawColor(169, 169, 169);
    doc.setLineWidth(0.02);

    const addSection = (title: string, content: any, bold = false) => {
      checkPageOverflow(lineSpacing * 2);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.text(title, margin, y);
      y += lineSpacing;
      if (content) {
        const lines = doc.splitTextToSize(content, maxWidth);
        doc.text(lines, margin, y);
        y += lines.length * lineSpacing;
      }
    };

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(resume?.user.name || "", pageWidth / 2, y, { align: "center" });
    y += 0.3;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const contactInfo = `${resume?.user.email || ""} | ${resume?.user.number || ""} | ${resume?.user.githubUrl || ""}`;
    doc.text(contactInfo, pageWidth / 2, y, { align: "center" });
    y += 0.3;

    const linkedInUrl = resume?.user.linkedinUrl || "";
    if (linkedInUrl) {
      doc.text(linkedInUrl, pageWidth / 2, y, { align: "center" });
      y += 0.4;
    }

    if (resume?.summary) {
      doc.setFont("helvetica", "bold");
      doc.text("Summary", margin, y);
      addSection("", resume.summary, false);
      y += lineSpacing - 0.2;
    }

    if (Array.isArray(resume?.experience) && resume.experience.length) {
      addSection("Experience", "", true);
      resume.experience.forEach(
        ({ title, description, startDate, endDate }) => {
          checkPageOverflow(0.8);
          const formattedDate = `${getMonthAndYear(startDate)} - ${
            endDate ? getMonthAndYear(endDate) : "Present"
          }`;

          const dateWidth = doc.getTextWidth(formattedDate);
          const xPosition = pageWidth - margin - dateWidth;

          doc.setFont("helvetica", "bold");
          doc.text(title, margin, y);
          doc.text(formattedDate, xPosition, y);
          y += lineSpacing - 0.2;

          addSection("", description);
        }
      );
    }

    if (resume?.skills) {
      y += lineSpacing - 0.2;
      addSection("Skills", resume.skills, true);
    }

    if (Array.isArray(resume?.projects) && resume.projects.length) {
      addSection("Projects", "", true);
      resume.projects.forEach(
        ({ title, description, startDate, endDate, technologies }) => {
          checkPageOverflow(0.8);
          const formattedDate = `${getMonthAndYear(startDate)} - ${
            endDate ? getMonthAndYear(endDate) : "Present"
          }`;

          const dateWidth = doc.getTextWidth(formattedDate);
          const xPosition = pageWidth - margin - dateWidth;

          doc.setFont("helvetica", "bold");
          doc.text(title, margin, y);
          doc.text(formattedDate, xPosition, y);
          y += lineSpacing - 0.2;

          addSection("", description);
          if (technologies) addSection("Technologies Used:", technologies);
        }
      );
    }

    if (Array.isArray(resume?.education) && resume.education.length) {
      addSection("Education", "", true);
      resume.education.forEach(({ degree, school, startDate, endDate }) => {
        checkPageOverflow(0.8);
        const formattedDate = `${getMonthAndYear(startDate)} - ${
          endDate ? getMonthAndYear(endDate) : "Present"
        }`;

        const dateWidth = doc.getTextWidth(formattedDate);
        const xPosition = pageWidth - margin - dateWidth;

        doc.setFont("helvetica", "bold");
        doc.text(degree, margin, y);
        doc.text(formattedDate, xPosition, y);
        y += lineSpacing - 0.2;

        addSection("", school);
      });
    }

    doc.save("resume.pdf");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-xl font-semibold text-zinc-100 hover:text-gray-700 self-start"
      >
        back
      </button>
      <div className="bg-white w-full max-w-3xl p-5 rounded-lg shadow-lg flex flex-col space-y-6">
        <div className="flex flex-col justify-between items-center gap-2">
          <h1 className="text-2xl font-bold">{resume?.user.name}</h1>
          <div className="flex gap-2">
            <p className="font-small border-r-2 pr-2 border-gray-400">
              {resume?.user.email}
            </p>
            <p className="font-small border-r-2 pr-2 border-gray-400">
              {resume?.user.number}
            </p>
            <p className="font-small border-r-2 pr-2 border-gray-400">
              {resume?.user.linkedinUrl}
            </p>
          </div>
            <p className="font-small border-r-2 pr-2 border-gray-400">
              {resume?.user.githubUrl}
            </p>
        </div>
        <hr className="my-6 border-gray-400" />
        {resume?.summary && (
          <>
            <div>
              <h2 className="text-xl font-semibold">Summary</h2>
              <p className="text-sm">{resume?.summary}</p>
            </div>
            <hr className="my-6 border-gray-400" />
          </>
        )}
        <div>
          <h2 className="text-xl font-semibold">Experience</h2>
          {Array.isArray(resume?.experience) &&
            resume?.experience.length > 0 &&
            resume?.experience.map((item) => (
              <div key={item.id} className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm">
                    {getMonthAndYear(item.startDate)} -{" "}
                    {item.endDate ? getMonthAndYear(item.endDate) : "Present"}
                  </p>
                </div>
                <p className="text-sm">{item.description}</p>
              </div>
            ))}
        </div>
        <hr className="my-6 border-gray-400" />
        <div>
          <h2 className="text-xl font-semibold">Skills</h2>
          <p className="text-sm">{resume?.skills.join(", ")}</p>
        </div>
        <hr className="my-6 border-gray-400" />
        <div>
          <h2 className="text-xl font-semibold">Projects</h2>
          {Array.isArray(resume?.projects) &&
            resume?.projects.length > 0 &&
            resume?.projects.map((item) => (
              <div key={item.id} className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm">
                    {getMonthAndYear(item.startDate)} -{" "}
                    {item.endDate ? getMonthAndYear(item.endDate) : "Present"}
                  </p>
                </div>
                <p className="text-sm">{item.description}</p>
                <p className="text-sm">
                  Technologies Used: {item.technologies}
                </p>
                {item.link && <p className="text-sm">Link: {item.link}</p>}
              </div>
            ))}
        </div>
        <hr className="my-6 border-gray-400" />
        <div>
          <h2 className="text-xl font-semibold">Education</h2>
          {Array.isArray(resume?.education) &&
            resume?.education.length > 0 &&
            resume?.education.map((item) => (
              <div key={item.id} className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{item.degree}</h3>
                  <p className="text-sm">
                    {getMonthAndYear(item.startDate)} -{" "}
                    {item.endDate ? getMonthAndYear(item.endDate) : "Present"}
                  </p>
                </div>
                <p className="text-sm">{item.school}</p>
                {item.cgpa && <p className="text-sm">CGPA: {item.cgpa}</p>}
              </div>
            ))}
        </div>
        <button
          onClick={generatePDF}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default ResumeItem;
