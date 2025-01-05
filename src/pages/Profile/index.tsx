// import React, { useState } from "react";
// import { FaStar, FaRegStar } from "react-icons/fa"; // Importing react-icons

// const StarRating = ({ totalStars = 5, initialRating = 0, onRate }: any) => {
//   const [rating, setRating] = useState(initialRating);

//   const handleClick = (rating: number) => {
//     setRating(rating);
//     // if (onRate) onRate(rating); // Optional callback to notify the parent
//   };

//   const renderStar = (index: number) => {
//     const isFilled = rating >= index; // Check if the current index is filled
//     return (
//       <span
//         key={index}
//         onClick={() => handleClick(index)}
//         style={{ cursor: "pointer", margin: "0 5px" }}
//       >
//         {isFilled ? (
//           <FaStar className="text-yellow-500" size={30} /> // Filled star
//         ) : (
//           <FaRegStar className="text-gray-500" size={30} /> // Empty star
//         )}
//       </span>
//     );
//   };

//   return (
//     <div>
//       {Array.from({ length: totalStars }, (_, index) => renderStar(index + 1))}
//       <div>
//         {rating} / {totalStars}
//       </div>
//     </div>
//   );
// };

// export default StarRating;

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { images } from "../../assets/images";
import { MdEdit } from "react-icons/md";

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
  const [confirmPassword, setConfirmPassword] = useState("........");

  useEffect(() => {
    updateUserData();
  }, []);

  const updateUserData = async () => {
    // Code to update user data (API call, etc.)
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col sm:flex-row justify-center space-x-4 p-4">
        <img
          src={user.profilePicture || images.profilepic}
          alt="profilePic"
          className="w-12 h-12 md:w-24 md:h-24 rounded-full object-cover self-center sm:self-start"
        />
        <div className="flex flex-col gap-5">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600">Name</label>
            <div className="flex justify-between items-center border-solid border-2 border-gray-400 rounded">
              <input
                type="text"
                disabled={!isEdit.isNameEdit}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`px-3 py-2  ${
                  !isEdit.isNameEdit ? "bg-gray-200" : "bg-white"
                }border-0 rounded-0 focus:outline-none focus:border-0 focus:ring-0`}
              />
              <MdEdit
                size={20}
                onClick={() => {
                  setEdit({ ...isEdit, isNameEdit: !isEdit.isNameEdit });
                  setName(user.name);
                }}
                className="text-blue-500 cursor-pointer hover:text-blue-700"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600">Email</label>
            <div className="flex justify-between items-center border-solid border-2 border-gray-400 rounded">
              <input
                type="email"
                disabled={!isEdit.isEmailEdit}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`px-3 py-2  ${
                  !isEdit.isEmailEdit ? "bg-gray-200" : "bg-white"
                }border-0 rounded-0 focus:outline-none focus:border-0 focus:ring-0`}
              />
              <MdEdit
                size={20}
                onClick={() => {
                  setEdit({ ...isEdit, isEmailEdit: !isEdit.isEmailEdit });
                  setEmail(user.email);
                }}
                className="text-blue-500 cursor-pointer hover:text-blue-700"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600">Password</label>
            <div className="flex justify-between items-center border-solid border-2 border-gray-400 rounded">
              <input
                type="text"
                disabled={!isEdit.isPasswordEdit}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`px-3 py-2  ${
                  !isEdit.isPasswordEdit ? "bg-gray-200" : "bg-white"
                }border-0 rounded-0 focus:outline-none focus:border-0 focus:ring-0`}
              />
              <MdEdit
                size={20}
                onClick={() => {
                  setEdit({
                    ...isEdit,
                    isPasswordEdit: !isEdit.isPasswordEdit,
                  });
                  setPassword("......");
                }}
                className="text-blue-500 cursor-pointer hover:text-blue-700"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600">Number</label>
            <div className="flex justify-between items-center border-solid border-2 border-gray-400 rounded">
              <input
                type="text"
                disabled={!isEdit.isNumberEdit}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className={`px-3 py-2  ${
                  !isEdit.isNumberEdit ? "bg-gray-200" : "bg-white"
                }border-0 rounded-0 focus:outline-none focus:border-0 focus:ring-0`}
              />
              <MdEdit
                size={20}
                onClick={() => {
                  setEdit({ ...isEdit, isNumberEdit: !isEdit.isNumberEdit });
                  setNumber(user.number);
                }}
                className="text-blue-500 cursor-pointer hover:text-blue-700"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600">GitHub URL</label>
            <div className="flex justify-between items-center border-solid border-2 border-gray-400 rounded">
              <input
                type="text"
                disabled={!isEdit.isGithubUrlEdit}
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className={`px-3 py-2  ${
                  !isEdit.isGithubUrlEdit ? "bg-gray-200" : "bg-white"
                }border-0 rounded-0 focus:outline-none focus:border-0 focus:ring-0`}
              />
              <MdEdit
                size={20}
                onClick={() => {
                  setEdit({
                    ...isEdit,
                    isGithubUrlEdit: !isEdit.isGithubUrlEdit,
                  });
                  setGithubUrl(user.githubUrl);
                }}
                className="text-blue-500 cursor-pointer hover:text-blue-700"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-600">LinkedIn URL</label>
            <div className="flex justify-between items-center border-solid border-2 border-gray-400 rounded">
              <input
                type="text"
                disabled={!isEdit.isLinkedinUrlEdit}
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className={`px-3 py-2  ${
                  !isEdit.isLinkedinUrlEdit ? "bg-gray-200" : "bg-white"
                }border-0 rounded-0 focus:outline-none focus:border-0 focus:ring-0`}
              />
              <MdEdit
                size={20}
                onClick={() => {
                  setEdit({
                    ...isEdit,
                    isLinkedinUrlEdit: !isEdit.isLinkedinUrlEdit,
                  });
                  setLinkedinUrl(user.linkedinUrl);
                }}
                className="text-blue-500 cursor-pointer hover:text-blue-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
