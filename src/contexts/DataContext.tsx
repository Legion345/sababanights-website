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
  addSession: (session: Omit<Session, "id" | "createdAt">) => void;
  addTeamMember: (member: Omit<TeamMember, "id">) => void;
  addContactMessage: (message: Omit<ContactMessage, "id" | "createdAt">) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      title: "Beginner's Circle Dance Workshop",
      date: "2024-01-25",
      time: "19:30",
      location: "Community Center - Main Hall",
      description: "Perfect for newcomers! Learn basic steps and simple circle dances in a welcoming environment.",
      level: "Beginner",
      instructor: "Sarah Cohen",
      createdAt: Date.now() - 86400000,
    },
    {
      id: "2",
      title: "Advanced Choreography Session",
      date: "2024-02-01",
      time: "20:00",
      location: "Community Center - Studio B",
      description: "Challenge yourself with complex choreographies and partner dances from different regions of Israel.",
      level: "Advanced",
      instructor: "Harel Asaraf",
      createdAt: Date.now() - 172800000,
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

  const addSession = (sessionData: Omit<Session, "id" | "createdAt">) => {
    const newSession: Session = {
      ...sessionData,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
  };

  const addTeamMember = (memberData: Omit<TeamMember, "id">) => {
    const newMember: TeamMember = {
      ...memberData,
      id: Date.now().toString(),
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

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
      addSession,
      addTeamMember,
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
