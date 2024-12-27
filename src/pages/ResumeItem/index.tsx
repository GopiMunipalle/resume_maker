import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Education,
  Experience,
  Project,
  Resume,
  User,
} from "../../utlis/types/commonTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getOneResume } from "../../services/templateServices";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";

export interface Data {
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

    // Divider color and thickness
    doc.setDrawColor(169, 169, 169); // Light gray color for dividers
    doc.setLineWidth(0.02);

    // Title Section (Center Aligned)
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("sample", pageWidth / 2, 1, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `${resume?.user.email} | ${resume?.user.createdAt} | ${resume?.user.updatedAt}`,
      pageWidth / 2,
      1.3,
      { align: "center" }
    );

    doc.line(0.5, 1.6, pageWidth - 0.5, 1.6); // Line under header
    let y = 1.8;

    // Experience Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Experience", 0.5, y); // Left aligned
    y += 0.3;

    resume?.experience.forEach((item) => {
      doc.setFont("helvetica", "bold");
      doc.text(item.title, 0.5, y); // Job title
      doc.setFont("helvetica", "normal");
      doc.text(item.description, 0.5, y + 0.2); // Job description

      doc.text(
        `${item.startDate} - ${item.endDate ? item.endDate : "Present"}`,
        pageWidth - 0.5,
        y,
        { align: "right" }
      );

      y += 0.6;
    });

    doc.line(0.5, y, pageWidth - 0.5, y); // Line after experience section
    y += 0.3;

    // Skills Section
    doc.setFont("helvetica", "bold");
    doc.text("Skills", 0.5, y); // Left aligned
    y += 0.3;

    doc.setFont("helvetica", "normal");
    doc.text("Node, Javascript, React, Mongodb, Typescript, Bootstrap", 0.5, y);
    y += 0.5;

    doc.line(0.5, y, pageWidth - 0.5, y); // Line after skills section
    y += 0.3;

    // Projects Section
    doc.setFont("helvetica", "bold");
    doc.text("Projects", 0.5, y); // Left aligned
    y += 0.3;

    resume?.projects.forEach((item) => {
      doc.setFont("helvetica", "bold");
      doc.text(item.title, 0.5, y); // Project title
      doc.setFont("helvetica", "normal");
      doc.text(item.description, 0.5, y + 0.2); // Project description

      doc.text(
        `${item.startDate} - ${item.endDate ? item.endDate : "Present"}`,
        pageWidth - 0.5,
        y,
        { align: "right" }
      );

      doc.text(`Technologies Used: ${item.technologies}`, 0.5, y + 0.4);

      y += 0.8;
    });

    doc.line(0.5, y, pageWidth - 0.5, y); // Line after projects section
    y += 0.3;

    // Education Section
    doc.setFont("helvetica", "bold");
    doc.text("Education", 0.5, y); // Left aligned
    y += 0.3;

    resume?.education.forEach((item) => {
      doc.setFont("helvetica", "bold");
      doc.text(item.degree, 0.5, y); // Degree
      doc.setFont("helvetica", "normal");
      doc.text(item.school, 0.5, y + 0.2); // School name

      doc.text(
        `${item.startDate} - ${item.endDate ? item.endDate : "Present"}`,
        pageWidth - 0.5,
        y,
        { align: "right" }
      );

      y += 0.6;
    });

    // Save the generated PDF
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
              {resume?.user.createdAt}
            </p>
            <p className="font-small border-r-2 pr-2 border-gray-400">
              {resume?.user.updatedAt}
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
