import logo from "./resumemaker.webp";
import template1 from "./template1.png";
import template2 from "./template2.jpg";
import template3 from "./template3.jpg";
import profilepic from "./dummy-profile-pic.jpg";

export const templates = [
  {
    id: 1,
    name: "Modern Resume",
    image: template1,
    content: {
      name: "Your Name",
      title: "Your Title",
      description: "Your Description",
    },
  },
  {
    id: 2,
    name: "Classic Resume",
    image: template2,
    content: {
      name: "Your Name",
      title: "Your Title",
      description: "Your Description",
    },
  },
  {
    id: 3,
    name: "Creative Resume",
    image: template3,
    content: {
      name: "Your Name",
      title: "Your Title",
      description: "Your Description",
    },
  },
];

export const images = {
  resumeLogo: logo,
  profilepic: profilepic,
};
