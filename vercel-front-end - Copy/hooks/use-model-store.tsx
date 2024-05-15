 import { User } from "@prisma/client";
import { create } from "zustand"
export type ModelType = "createProject" | "feedBack" | "rootDirectory";



interface modelDataProps{
  User?: User;
  api?: string; 
}


interface ModelaStore {
  type: ModelType | null;
  data: modelDataProps;
  isOpen: boolean;
  onOpen: (type: ModelType, data?: modelDataProps) => void;
  onClose: () => void;
}

export const useModel = create<ModelaStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
