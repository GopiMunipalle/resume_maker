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
    const doc = new jsPDF();
    const margin = 10;
    let currentY = margin; // Track the Y position on the page

    const addText = (
      text: string,
      fontSize: number,
      lineHeight: number = 10
    ) => {
      doc.setFontSize(fontSize);
      doc.text(text, margin, currentY);
      currentY += lineHeight;
    };

    const addSectionHeader = (header: string, fontSize: number) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", "bold");
      doc.text(header, margin, currentY);
      currentY += 8;
      doc.setFont("helvetica", "normal");
    };

    const checkPageOverflow = (heightRequired: number) => {
      if (currentY + heightRequired > doc.internal.pageSize.height - margin) {
        doc.addPage();
        currentY = margin; // Reset Y position when adding a new page
      }
    };

    // Add Title (Resume Name)
    addText("Resume of " + resume?.user.name, 18);

    // Add user details (email, creation date)
    addText(`Email: ${resume?.user.email}`, 12);
    addText(`Created At: ${resume?.user.createdAt}`, 12);
    addText(`Updated At: ${resume?.user.updatedAt}`, 12);

    checkPageOverflow(30); // Check if the next section fits in the remaining space

    // Experience Section
    addSectionHeader("Experience", 14);
    if (resume?.experience && resume?.experience.length > 0) {
      const experienceData = resume.experience.map((item) => [
        item.title,
        `${item.startDate} - ${item.endDate || "Present"}`,
        item.description,
      ]);
      let finalY: number;
      autoTable(doc, {
        head: [["Title", "Duration", "Description"]],
        body: experienceData,
        startY: currentY,
        theme: "striped",
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 30 },
          2: { cellWidth: 100 },
        },
        didDrawPage: () => {
          checkPageOverflow(40); // Check after adding the table
        },
      });
      // currentY = (autoTable as any).lastAutoTable.finalY; // Update currentY to the end of the table
    }

    checkPageOverflow(30); // Check if the next section fits in the remaining space

    // Skills Section
    addSectionHeader("Skills", 14);
    addText(Array(resume?.skills).join(", "), 12);

    checkPageOverflow(20); // Check for overflow before the next section

    // Projects Section
    addSectionHeader("Projects", 14);
    if (resume?.projects && resume?.projects.length > 0) {
      resume.projects.forEach((item) => {
        addText(
          `${item.title} (${item.startDate} - ${item.endDate || "Present"})`,
          12
        );
        addText(item.description, 12);
        addText(`Technologies: ${item.technologies}`, 12);
        if (item.link) {
          addText(`Link: ${item.link}`, 12);
        }
        checkPageOverflow(25); // Check after each project for overflow
      });
    }

    checkPageOverflow(30); // Check for overflow before the next section

    // Education Section
    addSectionHeader("Education", 14);
    if (resume?.education && resume?.education.length > 0) {
      const educationData = resume.education.map((item) => [
        item.degree,
        `${item.startDate} - ${item.endDate || "Present"}`,
        item.school,
        item.cgpa || "N/A",
      ]);
      let finalY: number;
      autoTable(doc, {
        head: [["Degree", "Duration", "School", "CGPA"]],
        body: educationData,
        startY: currentY,
        theme: "striped",
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 30 },
          2: { cellWidth: 50 },
          3: { cellWidth: 20 },
        },
        didDrawPage: () => {
          checkPageOverflow(40); // Check after adding the table
        },
      });
      // currentY = (autoTable as any).lastAutoTable.finalY; // Update currentY to the end of the table
    }

    // Save the PDF
    doc.save("resume.pdf");
  };
  // const generatePDF = () => {
  //   const doc = new jsPDF();
  //   const margin = 10;
  //   const pageWidth = doc.internal.pageSize.width;
  //   const pageHeight = doc.internal.pageSize.height;

  //   // Add Title (Resume Name)
  //   doc.setFontSize(18);
  //   doc.text("Resume of " + resume?.user.name, margin, margin + 10);

  //   // Add user details (email, creation date, etc.)
  //   doc.setFontSize(12);
  //   doc.text(`Email: ${resume?.user.email}`, margin, margin + 20);
  //   doc.text(`Created At: ${resume?.user.createdAt}`, margin, margin + 25);
  //   doc.text(`Updated At: ${resume?.user.updatedAt}`, margin, margin + 30);

  //   doc.addPage(); // Move to the next page for Experience

  //   // Experience Section (using jsPDF autoTable for a table)
  //   if (resume?.experience && resume?.experience.length > 0) {
  //     doc.text("Experience", margin, margin + 10);
  //     const experienceData = resume.experience.map((item) => [
  //       item.title,
  //       `${item.startDate} - ${item.endDate || "Present"}`,
  //       item.description,
  //     ]);
  //     autoTable(doc, {
  //       head: [["Title", "Duration", "Description"]],
  //       body: experienceData,
  //       startY: margin + 15,
  //       theme: "striped",
  //       columnStyles: {
  //         0: { cellWidth: 60 },
  //         1: { cellWidth: 30 },
  //         2: { cellWidth: 100 },
  //       },
  //     });
  //   }

  //   // Skills Section
  //   // doc.addPage();
  //   doc.text("Skills", margin, margin + 10);
  //   doc.text(Array(resume?.skills).join(", "), margin, margin + 20);

  //   // Projects Section
  //   // doc.addPage();
  //   if (resume?.projects && resume?.projects.length > 0) {
  //     doc.text("Projects", margin, margin + 10);
  //     resume.projects.forEach((item, index) => {
  //       doc.text(
  //         `${item.title} (${item.startDate} - ${item.endDate || "Present"})`,
  //         margin,
  //         margin + 15 + index * 8
  //       );
  //       doc.text(item.description, margin, margin + 20 + index * 8);
  //       doc.text(
  //         `Technologies: ${item.technologies}`,
  //         margin,
  //         margin + 25 + index * 8
  //       );
  //       if (item.link) {
  //         doc.text(`Link: ${item.link}`, margin, margin + 30 + index * 8);
  //       }
  //     });
  //   }

  //   // Education Section
  //   doc.addPage();
  //   if (resume?.education && resume?.education.length > 0) {
  //     doc.text("Education", margin, margin + 10);
  //     const educationData = resume.education.map((item) => [
  //       item.degree,
  //       `${item.startDate} - ${item.endDate || "Present"}`,
  //       item.school,
  //       item.cgpa || "N/A",
  //     ]);
  //     autoTable(doc, {
  //       head: [["Degree", "Duration", "School", "CGPA"]],
  //       body: educationData,
  //       startY: margin + 15,
  //       theme: "striped",
  //       columnStyles: {
  //         0: { cellWidth: 60 },
  //         1: { cellWidth: 30 },
  //         2: { cellWidth: 50 },
  //         3: { cellWidth: 20 },
  //       },
  //     });
  //   }

  //   // Save the PDF
  //   doc.save("resume.pdf");
  // };

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
