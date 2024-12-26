import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Resume } from "../../utlis/types/commonTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getOneResume } from "../../services/templateServices";

interface ResumeUser extends Resume {
  name: string;
  email: string;
  number?: string;
  linkedIn?: string;
  gitbuLink?: string;
}

function ResumeItem() {
  const { id } = useParams();
  const [resume, setResume] = useState<ResumeUser[]>([]);
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    async function fetchResume() {
      const result = await getOneResume(user.token, Number(id));
      console.log("result", result);
      if (!result.status) {
        alert(result.message);
        return;
      }
      setResume(result.data);
    }
    fetchResume();
  }, []);

  return (
    <div className="flex-1 max-h-screen h-screen justify-center items-center bg-gray-900 p-6">
      <div className="bg-white w-2/4 p-5 flex-1 flex-col justify-center items-center">
        <div>
          <h1>{resume[0].name}</h1>
          <div>
            <p>{resumeUser.email}</p>
            <p>{resumeUser.number}</p>
            <p>{resumeUser.linkedIn}</p>
            <p>{resumeUser.gitbuLink}</p>
          </div>
        </div>
        <div>
          <h1>Experience</h1>
          {resume[0].experience.map((item) => (
            <div key={item.id}>
              <div>
                <h1>{item.title}</h1>
                <p>
                  {item.startDate} - {item.endDate ? item.endDate : "Present"}
                </p>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <div>
          <h1>Skills</h1>
          <p>{resume[0].skills}</p>
        </div>
        <div>
          <h1>Projects</h1>
          {resume[0].projects.map((item) => (
            <div key={item.id}>
              <div>
                <h1>{item.title}</h1>
                <p>
                  {item.startDate}-{item.endDate ? item.endDate : "Present"}
                </p>
              </div>
              <p>{item.description}</p>
              <p>Technologies Used: {item.technologies}</p>
              {item.link && <p>Link: {item.link}</p>}
            </div>
          ))}
        </div>
        <div>
          <h1>Education</h1>
          {resume[0].education.map((item) => (
            <div key={item.id}>
              <div>
                <h1>{item.degree}</h1>
                <p>
                  {item.startDate}-{item.endDate ? item.endDate : "Present"}
                </p>
              </div>
              <p>{item.school}</p>
              {item.cgpa && <p>CGPA: {item.cgpa}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResumeItem;
