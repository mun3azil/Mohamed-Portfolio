import { IconType } from "react-icons";
import { 
  FaBook, 
  FaCamera, 
  FaHiking, 
  FaChessKnight, 
  FaGuitar, 
  FaGlobeAmericas,
  FaCode,
  FaLaptopCode
} from "react-icons/fa";

export interface Interest {
  id: string;
  title: string;
  icon: IconType;
  description: string;
}

export const interests: Interest[] = [
  {
    id: "interest-1",
    title: "Reading",
    icon: FaBook,
    description: "I enjoy reading books on technology, science fiction, and personal development."
  },
  {
    id: "interest-2",
    title: "Photography",
    icon: FaCamera,
    description: "Capturing moments and exploring photography techniques is one of my favorite hobbies."
  },
  {
    id: "interest-3",
    title: "Hiking",
    icon: FaHiking,
    description: "I love exploring nature and hiking in new places whenever I get the chance."
  },
  {
    id: "interest-4",
    title: "Chess",
    icon: FaChessKnight,
    description: "Strategic thinking and the challenge of chess has always fascinated me."
  },
  {
    id: "interest-5",
    title: "Music",
    icon: FaGuitar,
    description: "Playing guitar and discovering new music genres helps me relax and stay creative."
  },
  {
    id: "interest-6",
    title: "Traveling",
    icon: FaGlobeAmericas,
    description: "Exploring different cultures and places broadens my perspective and inspires me."
  },
  {
    id: "interest-7",
    title: "Open Source",
    icon: FaCode,
    description: "Contributing to open source projects and learning from the community."
  },
  {
    id: "interest-8",
    title: "Tech Blogging",
    icon: FaLaptopCode,
    description: "Sharing knowledge and experiences through writing technical articles."
  }
];
