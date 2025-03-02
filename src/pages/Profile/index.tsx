import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { images } from "../../assets/images";
import Model from "../../components/Model";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth);
  const [isEdit, setEdit] = useState({
    isNameEdit: false,
    isEmailEdit: false,
    isNumberEdit: false,
    isPasswordEdit: false,
    isLinkedinUrlEdit: false,
    isGithubUrlEdit: false,
    isProfilePictureEdit: false,
  });
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.number);
  const [password, setPassword] = useState("........");
  const [linkedinUrl, setLinkedinUrl] = useState(user.linkedinUrl);
  const [githubUrl, setGithubUrl] = useState(user.githubUrl);
  // const [confirmPassword, setConfirmPassword] = useState("........");
  const [modelOpen, isModelOpen] = useState(false);
  // const [profilePicture, setProfilePicture] = useState<string | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    updateUserData();
  }, []);

  const updateUserData = async () => {
    setEdit({
      isNameEdit: true,
      isEmailEdit: false,
      isNumberEdit: false,
      isPasswordEdit: false,
      isLinkedinUrlEdit: false,
      isGithubUrlEdit: false,
      isProfilePictureEdit: false,
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setImagePreview(reader.result as string);
        // setProfilePicture(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
        <div className="flex flex-col sm:flex-row items-center space-x-4">
          <div className="flex flex-col items-center">
            <img
              src={
                images.profilepic || user.profilePicture || "default_image_url"
              }
              alt="profilePic"
              className="w-24 h-24 rounded-full object-cover mb-6 sm:mb-0"
            />
            {/* <MdEdit
              size={22}
              onClick={() => document.getElementById("imageInput")?.click()}
              className="text-blue-500 cursor-pointer hover:text-blue-700"
            /> */}

            <input
              type="file"
              id="imageInput"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg text-gray-700">Name</label>
                {/* <MdEdit
                  size={22}
                  onClick={() => {
                    setEdit({ ...isEdit, isNameEdit: !isEdit.isNameEdit });
                    setName(user.name);
                  }}
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                /> */}
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

            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg text-gray-700">Email</label>
                {/* <MdEdit
                  size={22}
                  onClick={() => {
                    setEdit({ ...isEdit, isEmailEdit: !isEdit.isEmailEdit });
                    setEmail(user.email);
                  }}
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                /> */}
              </div>
              <input
                type="email"
                disabled={!isEdit.isEmailEdit}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEdit.isEmailEdit ? "bg-gray-200" : "bg-white"
                }`}
              />
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg text-gray-700">Password</label>
                {/* <MdEdit
                  size={22}
                  onClick={() => {
                    setEdit({
                      ...isEdit,
                      isPasswordEdit: !isEdit.isPasswordEdit,
                    });
                    // setPassword("......"); */}
                {/* isModelOpen((prevState) => !prevState);
                  }}
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                /> */}
              </div>
              <input
                type="password"
                disabled={!modelOpen}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !modelOpen ? "bg-gray-200" : "bg-white"
                }`}
              />
            </div>

            {modelOpen && (
              <Model
                content={{ name: "Update Password", name2: "Password" }}
                isModelOpen={isModelOpen}
              />
            )}

            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg text-gray-700">Phone Number</label>
                {/* <MdEdit
                  size={22}
                  onClick={() => {
                    setEdit({ ...isEdit, isNumberEdit: !isEdit.isNumberEdit });
                    setNumber(user.number);
                  }}
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                /> */}
              </div>
              <input
                type="text"
                disabled={!isEdit.isNumberEdit}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className={`px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEdit.isNumberEdit ? "bg-gray-200" : "bg-white"
                }`}
              />
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg text-gray-700">GitHub URL</label>
                {/* <MdEdit
                  size={22}
                  onClick={() => {
                    setEdit({
                      ...isEdit,
                      isGithubUrlEdit: !isEdit.isGithubUrlEdit,
                    });
                    setGithubUrl(user.githubUrl); */}
                {/* }}
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                /> */}
              </div>
              <input
                type="text"
                disabled={!isEdit.isGithubUrlEdit}
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className={`px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEdit.isGithubUrlEdit ? "bg-gray-200" : "bg-white"
                }`}
              />
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg text-gray-700">LinkedIn URL</label>
                {/* <MdEdit
                  size={22}
                  onClick={() => {
                    setEdit({
                      ...isEdit,
                      isLinkedinUrlEdit: !isEdit.isLinkedinUrlEdit,
                    });
                    setLinkedinUrl(user.linkedinUrl); */}
                {/* }}
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                /> */}
              </div>
              <input
                type="text"
                disabled={!isEdit.isLinkedinUrlEdit}
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className={`px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEdit.isLinkedinUrlEdit ? "bg-gray-200" : "bg-white"
                }`}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
