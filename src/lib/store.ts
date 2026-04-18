import { create } from "zustand";

export type IncidentSeverity = "low" | "medium" | "high" | "critical";
export type IncidentStatus = "detected" | "investigating" | "responding" | "resolved";
export type UserRole = "admin" | "tactical" | "dispatch";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Incident {
  id: string;
  type: string;
  location: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  timestamp: Date;
  details: string;
  aiConfidence?: number;
  aiEvidence?: string[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: "on-duty" | "off-duty" | "responding";
  location: string;
  avatar?: string;
}

interface CrisisStore {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Incidents
  incidents: Incident[];
  activeIncidentId: string | null;
  addIncident: (incident: Omit<Incident, "id" | "timestamp" | "status">) => void;
  updateIncidentStatus: (id: string, status: IncidentStatus) => void;
  setActiveIncident: (id: string | null) => void;
  clearIncidents: () => void;

  // Staff
  staff: StaffMember[];
  autoAssignStaff: (incidentId: string) => void;

  // Scenarios
  startScenario: (scenarioId: "FIRE" | "BREACH" | "PANIC") => void;

  // Advanced Features
  currentSite: "Campus Hub" | "Industrial" | "Metro Mall";
  setSite: (site: "Campus Hub" | "Industrial" | "Metro Mall") => void;
  showHeatmap: boolean;
  toggleHeatmap: () => void;
}

export const useCrisisStore = create<CrisisStore>((set) => ({
  user: null,
  isAuthenticated: false,
  
  currentSite: "Campus Hub",
  showHeatmap: false,
  setSite: (site) => set({ currentSite: site }),
  toggleHeatmap: () => set((state) => ({ showHeatmap: !state.showHeatmap })),

  login: async (email, password) => {
    // Fake login logic with provided credentials
    const credentials: Record<string, { pass: string, user: User }> = {
      "admin@crisisai.com": { 
        pass: "admin123", 
        user: { id: "1", name: "Chief Commander", email: "admin@crisisai.com", role: "admin" } 
      },
      "tactical@crisisai.com": { 
        pass: "guard123", 
        user: { id: "2", name: "Tactical Analyst", email: "tactical@crisisai.com", role: "tactical" } 
      },
      "dispatch@crisisai.com": { 
        pass: "radio123", 
        user: { id: "3", name: "Dispatch Officer", email: "dispatch@crisisai.com", role: "dispatch" } 
      },
    };

    const entry = credentials[email];
    if (entry && entry.pass === password) {
      set({ user: entry.user, isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => set({ user: null, isAuthenticated: false }),

  incidents: [
    {
      id: "1",
      type: "System Heartbeat",
      location: "Building A - Server Room",
      severity: "low",
      status: "resolved",
      timestamp: new Date(Date.now() - 3600000),
      details: "Routine system check completed.",
    }
  ],
  activeIncidentId: null,
  addIncident: (data) => set((state) => ({
    incidents: [
      {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        status: "detected",
        aiConfidence: data.aiConfidence || 95 + Math.random() * 4.9, // Default to high confidence for demo
        aiEvidence: data.aiEvidence || ["NEURAL_PATTERN_MATCH", "THERMAL_ANOMALY"],
      },
      ...state.incidents,
    ]
  })),
  updateIncidentStatus: (id, status) => set((state) => ({
    incidents: state.incidents.map((inc) => 
      inc.id === id ? { ...inc, status } : inc
    )
  })),
  setActiveIncident: (id) => set({ activeIncidentId: id }),
  clearIncidents: () => set({ incidents: [] }),

  staff: [
    { id: "S1", name: "Alex Rivera", role: "Security Sector A", status: "on-duty", location: "Lobby" },
    { id: "S2", name: "Sarah Chen", role: "Medical First Responder", status: "on-duty", location: "Clinic" },
    { id: "S3", name: "Marcus Thorne", role: "Technical Ops", status: "responding", location: "Server Room" },
    { id: "S4", name: "Elena Volkov", role: "Perimeter Security", status: "off-duty", location: "External" },
  ],

  autoAssignStaff: (incidentId) => set((state) => {
    // Find first on-duty staff
    const staffIndex = state.staff.findIndex(s => s.status === "on-duty");
    if (staffIndex === -1) return state;

    const newStaff = [...state.staff];
    newStaff[staffIndex] = { ...newStaff[staffIndex], status: "responding" };

    return { staff: newStaff };
  }),

  startScenario: (id) => {
    const { addIncident, autoAssignStaff, setSite } = useCrisisStore.getState();

    if (id === "FIRE") {
        setSite("Metro Mall");
        setTimeout(() => {
            addIncident({
                type: "Fire Detected",
                severity: "critical",
                location: "Metro Mall - Food Court",
                details: "Thermal signature analysis indicates rapid oxygen consumption and high temperature bloom.",
                aiConfidence: 99.2,
                aiEvidence: ["THERMAL_IMAGING", "SMOKE_SENSOR_L3"]
            });
        }, 1500);
        setTimeout(() => {
            const latest = useCrisisStore.getState().incidents[0];
            autoAssignStaff(latest.id);
        }, 3000);
    } else if (id === "BREACH") {
        setSite("Campus Hub");
        setTimeout(() => {
            addIncident({
                type: "Perimeter Breach",
                severity: "high",
                location: "North Gate - Sector 4",
                details: "Motion anomaly detected at unauthorized transit node. Neural scan identifies non-staff signature.",
                aiConfidence: 97.4,
                aiEvidence: ["MOTION_VECTOR", "SIG_MATCH_FAIL"]
            });
        }, 1500);
        setTimeout(() => {
            const latest = useCrisisStore.getState().incidents[0];
            autoAssignStaff(latest.id);
        }, 3000);
    } else if (id === "PANIC") {
        setSite("Industrial");
        setTimeout(() => {
            addIncident({
                type: "Crowd Panic",
                severity: "high",
                location: "Main Assembly Hall",
                details: "Anomalous velocity vectors detected. Mass movement patterns suggest uncontrolled evacuation.",
                aiConfidence: 91.8,
                aiEvidence: ["VELOCITY_BLOOM", "CROWD_DYNAMICS"]
            });
        }, 1500);
        setTimeout(() => {
            const latest = useCrisisStore.getState().incidents[0];
            autoAssignStaff(latest.id);
        }, 3000);
    }
  }
}));
