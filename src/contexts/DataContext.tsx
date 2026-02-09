import { createContext, useContext, useState, ReactNode } from "react";
import harelAsarafImage from "@/assets/images/harel-asaraf.jpg";
import ashleyAsarafImage from "@/assets/images/ashley-asaraf.jpg";
import leslieAsarafImage from "@/assets/images/leslie-asaraf.jpg";


interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  level: string;
  instructor: string;
  createdAt: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  email?: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: number;
}

interface DataContextType {
  sessions: Session[];
  teamMembers: TeamMember[];
  contactMessages: ContactMessage[];
  addContactMessage: (message: Omit<ContactMessage, "id" | "createdAt">) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      title: "Teach - Oldies's Partners Dance Workshop ",
      date: "Monday",
      time: "8:30 - 8:45 PM",
      location: "Soho Dance LA - Main ballroom",
      description: "Perfect for newcomers! Learn basic steps and simple circle dances in a welcoming environment.",
      level: "Beginner - Intermediate",
      instructor: "Harel Asaraf",
    },
    {
      id: "2",
      title: "Teach - Mainstream/Unique Dancing Session",
      date: "Monday",
      time: "9:30 - 9:45 PM",
      location: "Soho Dance LA - Main ballroom",
      description: "Challenge yourself with complex choreographies and partner dances from different regions of Israel.",
      level: "Intermediate - Advanced",
      instructor: "Harel Asaraf",
    },
    {
      id: "3",
      title: "Advanced Partner Dances Session",
      date: "Monday",
      time: "10:30 PM - 12:00 AM",
      location: "Soho Dance LA - Main ballroom",
      description: "Challenge yourself with complex choreographies and partner dances from different regions of Israel.",
      level: "Advanced",
      instructor: "Harel Asaraf",
    },
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Harel Asaraf",
      role: "Markid & Lead Instructor",
      bio: "Our wonderful markid for both Mondays and Thursdays. His parents were/are avid dancers and even met through Israeli Folk Dancing so he grew up in the dancing world. He's been part of dance companies and expanded beyond Israeli dancing, from modern to country line dancing. He's been teaching and running sessions for 12+ years and loves this community.",
      email: "session@sababanights.com",
      imageUrl: harelAsarafImage,
    },
    {
      id: "2",
      name: "Ashley Asaraf",
      role: "Instructor & Dancer",
      bio: "Harel's wife and partner for the Monday couples session. Grew up acting, singing and was trained in tap dancing. She did many sports, but took a break from dancing until she started going country line dancing, where she met Harel. He introduced her to the world of Israeli dancing 5+ years ago and the rest is history.",
      email: "session@sababanights.com",
      imageUrl: ashleyAsarafImage,
    },
    {
      id: "3",
      name: "Leslie Asaraf",
      role: "Instructor & Elder",
      bio: "Classically trained ballet dancer who has been dancing for over four decades. Partners with her son and daughter in law in running Sababa Nights and will occasionally bring food for the session that is for sure a crowd pleaser.",
      email: "session@sababanights.com",
      imageUrl: leslieAsarafImage,
    },

  ]);

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  const addContactMessage = (messageData: Omit<ContactMessage, "id" | "createdAt">) => {
    const newMessage: ContactMessage = {
      ...messageData,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setContactMessages(prev => [newMessage, ...prev]);
  };

  return (
    <DataContext.Provider value={{
      sessions,
      teamMembers,
      contactMessages,
      addContactMessage,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
