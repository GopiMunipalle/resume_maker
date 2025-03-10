import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Education,
  Experience,
  Project,
  User,
} from "../../utlis/types/commonTypes";
import { getOneResume } from "../../services/templateServices";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Cookies from "js-cookie";

export interface Data {
  summary: string;
  selectedTemplate: string;
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
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token") ?? "";
    async function fetchResume() {
      const result = await getOneResume(token, Number(id));
      if (!result.status) {
        alert(result.message);
        return;
      }
      setResume(result.data);
    }
    fetchResume();
  }, [id]);

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
    const contactInfo = `${resume?.user.email || ""} | ${
      resume?.user.number || ""
    } | ${resume?.user.githubUrl || ""}`;
    doc.text(contactInfo, pageWidth / 2, y, { align: "center" });
    y += 0.3;

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

  const generatePDF2 = () => {
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

    // New function to draw section title with line
    const drawSectionWithLine = (title: string) => {
      checkPageOverflow(lineSpacing * 1.5);
      // Add the section title
      doc.setFont("helvetica", "bold");
      doc.text(title, margin, y);
      y += lineSpacing * 0.4; // Move down a bit before drawing the line

      // Draw the line across the entire width of the content area
      doc.setLineWidth(0.008); // Thinner line
      doc.setDrawColor(150, 150, 150); // Lighter gray
      doc.line(margin, y, pageWidth - margin, y);

      // Move the y position down a bit for the content that will follow
      y += lineSpacing * 1;
    };

    // Main Content
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(resume?.user.name || "", pageWidth / 2, y, { align: "center" });
    y += 0.3;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const contactInfo = `${resume?.user.email || ""} | ${
      resume?.user.number || ""
    } | ${resume?.user.githubUrl || ""}`;
    doc.text(contactInfo, pageWidth / 2, y, { align: "center" });
    y += 0.3;

    const linkedInUrl = resume?.user.linkedinUrl || "";
    if (linkedInUrl) {
      doc.text(linkedInUrl, pageWidth / 2, y, { align: "center" });
      y += 0.4;
    }

    // Summary Section
    if (resume?.summary) {
      drawSectionWithLine("Summary");
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(resume.summary, maxWidth);
      doc.text(lines, margin, y);
      y += lines.length * lineSpacing + 0.2; // Add some extra space after the section
    }

    // Experience Section
    if (Array.isArray(resume?.experience) && resume.experience.length >= 1) {
      drawSectionWithLine("Experience");

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
          y += lineSpacing;

          doc.setFont("helvetica", "normal");
          const descLines = doc.splitTextToSize(description, maxWidth);
          doc.text(descLines, margin, y);
          y += descLines.length * lineSpacing + 0.1;
        }
      );
      y += 0.1; // Add space after section
    }

    // Skills Section
    if (resume?.skills && resume.skills.length > 0) {
      drawSectionWithLine("Skills");

      doc.setFont("helvetica", "normal");
      const skillsText = resume.skills.join(", ");
      const lines = doc.splitTextToSize(skillsText, maxWidth);
      doc.text(lines, margin, y);
      y += lines.length * lineSpacing + 0.2;
    }

    // Projects Section
    if (Array.isArray(resume?.projects) && resume.projects.length >= 1) {
      drawSectionWithLine("Projects");

      resume.projects.forEach(
        ({ title, description, startDate, endDate, technologies, link }) => {
          checkPageOverflow(0.8);
          const formattedDate = `${getMonthAndYear(startDate)} - ${
            endDate ? getMonthAndYear(endDate) : "Present"
          }`;

          const dateWidth = doc.getTextWidth(formattedDate);
          const xPosition = pageWidth - margin - dateWidth;

          doc.setFont("helvetica", "bold");
          doc.text(title, margin, y);
          doc.text(formattedDate, xPosition, y);
          y += lineSpacing;

          doc.setFont("helvetica", "normal");
          const descLines = doc.splitTextToSize(description, maxWidth);
          doc.text(descLines, margin, y);
          y += descLines.length * lineSpacing;

          if (technologies) {
            const techText = `Technologies Used: ${technologies}`;
            const techLines = doc.splitTextToSize(techText, maxWidth);
            doc.text(techLines, margin, y);
            y += techLines.length * lineSpacing;
          }

          if (link) {
            const linkText = `Link: ${link}`;
            const linkLines = doc.splitTextToSize(linkText, maxWidth);
            doc.text(linkLines, margin, y);
            y += linkLines.length * lineSpacing;
          }

          y += 0.1; // Add a bit of space between projects
        }
      );
      y += 0.1; // Add space after section
    }

    // Education Section
    if (Array.isArray(resume?.education) && resume.education.length) {
      drawSectionWithLine("Education");

      resume.education.forEach(
        ({ degree, school, startDate, endDate, cgpa }) => {
          checkPageOverflow(0.8);
          const formattedDate = `${getMonthAndYear(startDate)} - ${
            endDate ? getMonthAndYear(endDate) : "Present"
          }`;

          const dateWidth = doc.getTextWidth(formattedDate);
          const xPosition = pageWidth - margin - dateWidth;

          doc.setFont("helvetica", "bold");
          doc.text(degree, margin, y);
          doc.text(formattedDate, xPosition, y);
          y += lineSpacing;

          doc.setFont("helvetica", "normal");
          doc.text(school, margin, y);
          y += lineSpacing;

          if (cgpa) {
            doc.text(`CGPA: ${cgpa}`, margin, y);
            y += lineSpacing;
          }

          y += 0.1; // Add a bit of space between education entries
        }
      );
    }

    doc.save("resume.pdf");
  };

  const handleDownload = () => {
    if (resume?.selectedTemplate === "1") {
      generatePDF();
    } else {
      generatePDF2();
    }
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
          <div className="flex flex-wrap gap-2 justify-center">
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
          <p className="font-small text-wrap border-r-2 pr-2 border-gray-400">
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
          {Array.isArray(resume?.experience) &&
            resume?.experience.length > 0 && (
              <h2 className="text-xl font-semibold">Experience</h2>
            )}
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
        {Array.isArray(resume?.experience) && resume?.experience.length > 0 && (
          <hr className="my-6 border-gray-400" />
        )}
        <div>
          <h2 className="text-xl font-semibold">Skills</h2>
          <p className="text-sm">{resume?.skills.join(", ")}</p>
        </div>
        <hr className="my-6 border-gray-400" />
        <div>
          {Array.isArray(resume?.projects) && resume?.projects.length > 0 && (
            <h2 className="text-xl font-semibold">Projects</h2>
          )}
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
        {Array.isArray(resume?.projects) && resume?.projects.length > 0 && (
          <hr className="my-6 border-gray-400" />
        )}
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
          onClick={handleDownload}
          className="mt-4 bg-blue-500 text-white p-2 rounded w-full sm:w-auto"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default ResumeItem;
