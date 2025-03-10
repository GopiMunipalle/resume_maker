import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { MdEdit } from "react-icons/md";
import Cookies from "js-cookie";
import {
  fetchUserData,
  removeUserAccount,
  updateUserData,
} from "../../services/authservices";
import { ThreeDots } from "react-loader-spinner";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEdit, setEdit] = useState({
    isNameEdit: false,
    isNumberEdit: false,
    isLinkedinUrlEdit: false,
    isGithubUrlEdit: false,
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getserData();
  }, []);

  const getserData = async () => {
    try {
      const token = Cookies.get("token");
      const { data } = await fetchUserData(token as string);
      setName(data.name);
      setEmail(data.email);
      setNumber(data.number);
      setLinkedinUrl(data.linkedinUrl);
      setGithubUrl(data.githubUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      setLoading(true);
      await updateUserData(Cookies.get("token") as string, {
        name,
        email,
        number,
        linkedinUrl,
        githubUrl,
      });
      setLoading(false);
      setEdit({
        isNameEdit: false,
        isNumberEdit: false,
        isLinkedinUrlEdit: false,
        isGithubUrlEdit: false,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const removeAccount = async () => {
    const confirmRemoval = window.confirm(
      "Are you sure you want to remove your account? This action cannot be undone."
    );
    if (confirmRemoval) {
      try {
        setLoading(true);
        const { data } = await removeUserAccount(
          Cookies.get("token") as string
        );
        if (data.status === 200) {
          Cookies.remove("token");
          navigate("/");
        }
      } catch (error: any) {
        setLoading(false);
        alert(error.error ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleNameEdit = () => {
    setEdit({ ...isEdit, isNameEdit: !isEdit.isNameEdit });
    if (!isEdit.isNameEdit) setName(name);
  };

  const toggleNumberEdit = () => {
    setEdit({ ...isEdit, isNumberEdit: !isEdit.isNumberEdit });
    if (!isEdit.isNumberEdit) setNumber(number);
  };

  const toggleGithubUrlEdit = () => {
    setEdit({ ...isEdit, isGithubUrlEdit: !isEdit.isGithubUrlEdit });
    if (!isEdit.isGithubUrlEdit) setGithubUrl(githubUrl);
  };

  const toggleLinkedinUrlEdit = () => {
    setEdit({ ...isEdit, isLinkedinUrlEdit: !isEdit.isLinkedinUrlEdit });
    if (!isEdit.isLinkedinUrlEdit) setLinkedinUrl(linkedinUrl);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-red">
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  return (
    <div className="bg-[#121212] min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-6 w-full">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-md font-semibold text-gray-700">Name</h2>
              <MdEdit
                size={22}
                onClick={toggleNameEdit}
                className="text-blue-500 cursor-pointer hover:text-blue-700"
              />
            </div>
            <input
              type="text"
              disabled={!isEdit.isNameEdit}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !isEdit.isNameEdit ? "bg-gray-200" : "bg-white"
              }`}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex flex-col w-full">
              <label className="text-lg text-gray-700">Email</label>
              <input
                type="email"
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-lg text-gray-700">Phone Number</label>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  disabled={!isEdit.isNumberEdit}
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEdit.isNumberEdit ? "bg-gray-200" : "bg-white"
                  }`}
                />
                <MdEdit
                  size={22}
                  onClick={toggleNumberEdit}
                  className="text-blue-500 cursor-pointer hover:text-blue-700 ml-2"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
            <div className="flex flex-col w-full">
              <label className="text-lg text-gray-700">GitHub URL</label>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  disabled={!isEdit.isGithubUrlEdit}
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEdit.isGithubUrlEdit ? "bg-gray-200" : "bg-white"
                  }`}
                />
                <MdEdit
                  size={22}
                  onClick={toggleGithubUrlEdit}
                  className="text-blue-500 cursor-pointer hover:text-blue-700 ml-2"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-lg text-gray-700">LinkedIn URL</label>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  disabled={!isEdit.isLinkedinUrlEdit}
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !isEdit.isLinkedinUrlEdit ? "bg-gray-200" : "bg-white"
                  }`}
                />
                <MdEdit
                  size={22}
                  onClick={toggleLinkedinUrlEdit}
                  className="text-blue-500 cursor-pointer hover:text-blue-700 ml-2"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={updateUser}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-6"
          >
            Save Changes
          </button>

          <div className="mt-8 w-full flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold">Remove Account</h2>
            <p className="text-gray-600">
              If you remove your account, it cannot be recovered.
            </p>
            <button
              onClick={removeAccount}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg mt-4 flex items-center justify-center"
            >
              <FaTrash className="mr-2" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
