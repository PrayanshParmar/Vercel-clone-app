// hooks/use-log-store.ts
import {create} from "zustand";

interface LogItem {
  event_id: string;
  log: string;
  timestamp: string;
  status: string;
  deployId: string;
}

interface LogsStore {
  errorOrReadyLog: LogItem | null;
  setErrorOrReadyLog: (log: LogItem | null) => void;
  resetLog: () => void;
}

const useLogsStore = create<LogsStore>((set) => ({
  errorOrReadyLog: null,
  setErrorOrReadyLog: (log) => set({ errorOrReadyLog: log }),
  resetLog: () =>
    set({
      errorOrReadyLog: {
        event_id: "",
        log: "",
        timestamp: "",
        status: "",
        deployId: "",
      },
    }),
}));

export default useLogsStore;
