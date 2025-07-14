// Local Storage utility functions
export const STORAGE_KEYS = {
  USER: 'faang_prep_user',
  DSA_PROGRESS: 'faang_prep_dsa',
  SYSTEM_DESIGN_PROGRESS: 'faang_prep_system_design',
  RESUME_CHECKLIST: 'faang_prep_resume',
  MOCK_INTERVIEWS: 'faang_prep_interviews',
  ROADMAP_PROGRESS: 'faang_prep_roadmap',
  SYSTEM_DESIGN_ROADMAP: 'faang_prep_system_design_roadmap'
};

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};