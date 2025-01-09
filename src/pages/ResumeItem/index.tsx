import { useParams } from "react-router-dom";
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

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "in",
    });

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    let y = 0.5;

    const maxWidth = pageWidth - 1;

    const checkPageOverflow = (requiredSpace: number) => {
      if (y + requiredSpace > pageHeight - 0.5) {
        doc.addPage();
        y = 0.5;
      }
    };

    doc.setDrawColor(169, 169, 169);
    doc.setLineWidth(0.02);

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(`${resume?.user.name}`, pageWidth / 2, y, { align: "center" });
    y += 0.3;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `${resume?.user.email} | ${resume?.user.number} | ${resume?.user.githubUrl} | ${resume?.user.linkedinUrl}`,
      pageWidth / 2,
      y,
      { align: "center" }
    );
    y += 0.3;

    doc.line(0.5, y, pageWidth - 0.5, y);
    y += 0.3;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Experience", 0.5, y);
    y += 0.3;

    resume?.experience.forEach((item) => {
      checkPageOverflow(0.8);

      doc.setFont("helvetica", "bold");
      doc.text(item.title, 0.5, y);
      doc.setFont("helvetica", "normal");

      const lines = doc.splitTextToSize(item.description, maxWidth);
      doc.text(lines, 0.5, y + 0.2);

      doc.text(
        `${item.startDate} - ${item.endDate ? item.endDate : "Present"}`,
        pageWidth - 0.5,
        y,
        { align: "right" }
      );

      y += lines.length * 0.3 + 0.1;
    });

    doc.line(0.5, y, pageWidth - 0.5, y);
    y += 0.3;

    doc.setFont("helvetica", "bold");
    doc.text("Skills", 0.5, y);
    y += 0.3;

    doc.setFont("helvetica", "normal");
    doc.text(String(resume?.skills), 0.5, y);
    y += 0.3;

    doc.line(0.5, y, pageWidth - 0.5, y);
    y += 0.3;

    doc.setFont("helvetica", "bold");
    doc.text("Projects", 0.5, y);
    y += 0.3;

    resume?.projects.forEach((item) => {
      checkPageOverflow(0.8);

      doc.setFont("helvetica", "bold");
      doc.text(item.title, 0.5, y);
      doc.setFont("helvetica", "normal");

      const lines = doc.splitTextToSize(item.description, maxWidth);
      doc.text(lines, 0.5, y + 0.2);

      doc.text(
        `${item.startDate} - ${item.endDate ? item.endDate : "Present"}`,
        pageWidth - 0.5,
        y,
        { align: "right" }
      );
      y += lines.length * 0.2;
      doc.text(`Technologies Used: ${item.technologies}`, 0.5, y + 0.4);

      y += lines.length * 0.2 + 0.3;
    });

    doc.line(0.5, y - 0.3, pageWidth - 0.5, y - 0.3);
    y += 0.1

    doc.setFont("helvetica", "bold");
    doc.text("Education", 0.5, y);
    y += 0.3;

    resume?.education.forEach((item) => {
      checkPageOverflow(0.8);

      doc.setFont("helvetica", "bold");
      doc.text(item.degree, 0.5, y);
      doc.setFont("helvetica", "normal");
      doc.text(item.school, 0.5, y + 0.2);

      doc.text(
        `${item.startDate} - ${item.endDate ? item.endDate : "Present"}`,
        pageWidth - 0.5,
        y,
        { align: "right" }
      );

      y += 0.6;
    });

    doc.save("resume.pdf");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-6">
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
            <p className="font-small border-r-2 pr-2 border-gray-400">
              {resume?.user.githubUrl}
            </p>
          </div>
        </div>
        <hr className="my-6 border-gray-400" />
        <div>
          <h2 className="text-xl font-semibold">Experience</h2>
          {Array.isArray(resume?.experience) &&
            resume?.experience.length > 0 &&
            resume?.experience.map((item) => (
              <div key={item.id} className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm">
                    {item.startDate} - {item.endDate ? item.endDate : "Present"}
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
                    {item.startDate} - {item.endDate ? item.endDate : "Present"}
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
                    {item.startDate} - {item.endDate ? item.endDate : "Present"}
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
