import { createContext, useContext, useState, ReactNode } from "react";

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
      instructor: "David Levi",
      createdAt: Date.now() - 172800000,
    },
  ]);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sarah Cohen",
      role: "Lead Instructor & Founder",
      bio: "Sarah has been teaching Israeli folk dance for over 15 years. She trained in Tel Aviv and brings authentic techniques and cultural knowledge to every class.",
      email: "sarah@israelidancing.com",
    },
    {
      id: "2",
      name: "David Levi",
      role: "Advanced Instructor",
      bio: "David specializes in complex choreographies and regional variations. He's performed with professional dance troupes across Israel and Europe.",
      email: "david@israelidancing.com",
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
