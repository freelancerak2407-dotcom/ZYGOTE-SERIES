import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_SUBJECTS, Subject } from '../data/mockData';

interface UserState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  isOnboarded: boolean;
  login: (email: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

interface ContentState {
  subjects: Subject[];
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  markComplete: (subjectId: string, chapterId: string, subtopicId: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isOnboarded: false,
      login: (email) => set({ isAuthenticated: true, user: { name: 'Dr. Student', email } }),
      logout: () => set({ isAuthenticated: false, user: null }),
      completeOnboarding: () => set({ isOnboarded: true }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useContentStore = create<ContentState>()(
  persist(
    (set) => ({
      subjects: MOCK_SUBJECTS,
      bookmarks: [],
      toggleBookmark: (id) => set((state) => ({
        bookmarks: state.bookmarks.includes(id)
          ? state.bookmarks.filter((b) => b !== id)
          : [...state.bookmarks, id]
      })),
      markComplete: (sId, cId, stId) => set((state) => {
        // Complex deep update logic would go here
        // For now, just a mock update
        return { subjects: [...state.subjects] };
      })
    }),
    {
      name: 'content-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
