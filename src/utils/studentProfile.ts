import { StudentProfile } from '../types';

const STORAGE_KEY = 'quiz_student_profile_data';

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  name: 'Aditya Sharma',
  schoolName: 'Kendriya Vidyalaya',
  age: 15,
  classGrade: 'Class 10',
  rollNumber: 'KV-2025-042',
  section: 'A',
  avatarEmoji: '👨‍🎓',
};

export const AVAILABLE_CLASSES = [
  { id: 'Class 1', labelEn: 'Class 1', labelHi: 'कक्षा 1 (Primary)', gradeNumber: 1 },
  { id: 'Class 2', labelEn: 'Class 2', labelHi: 'कक्षा 2 (Primary)', gradeNumber: 2 },
  { id: 'Class 3', labelEn: 'Class 3', labelHi: 'कक्षा 3 (Primary)', gradeNumber: 3 },
  { id: 'Class 4', labelEn: 'Class 4', labelHi: 'कक्षा 4 (Primary)', gradeNumber: 4 },
  { id: 'Class 5', labelEn: 'Class 5', labelHi: 'कक्षा 5 (Primary)', gradeNumber: 5 },
  { id: 'Class 6', labelEn: 'Class 6', labelHi: 'कक्षा 6 (Middle)', gradeNumber: 6 },
  { id: 'Class 7', labelEn: 'Class 7', labelHi: 'कक्षा 7 (Middle)', gradeNumber: 7 },
  { id: 'Class 8', labelEn: 'Class 8', labelHi: 'कक्षा 8 (Middle)', gradeNumber: 8 },
  { id: 'Class 9', labelEn: 'Class 9', labelHi: 'कक्षा 9 (Secondary)', gradeNumber: 9 },
  { id: 'Class 10', labelEn: 'Class 10', labelHi: 'कक्षा 10 (Secondary Board)', gradeNumber: 10 },
  { id: 'Class 11', labelEn: 'Class 11', labelHi: 'कक्षा 11 (Sr. Secondary)', gradeNumber: 11 },
  { id: 'Class 12', labelEn: 'Class 12', labelHi: 'कक्षा 12 (Sr. Secondary Board)', gradeNumber: 12 },
];

export const POPULAR_SCHOOLS = [
  'Kendriya Vidyalaya',
  'Delhi Public School (DPS)',
  'Navodaya Vidyalaya',
  'DAV Public School',
  'Saraswati Vidya Mandir',
  'Army Public School',
  'St. Xavier’s High School',
  'Modern Public School',
];

export const AVATAR_OPTIONS = ['👨‍🎓', '👩‍🎓', '🧑‍🎓', '👦', '👧', '🦁', '🚀', '🦉', '⭐', '🔬'];

export function getStudentProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_STUDENT_PROFILE,
        ...parsed,
      };
    }
    // Also check if legacy student name was saved
    const legacyName = localStorage.getItem('quiz_student_name') || localStorage.getItem('quiz_username');
    if (legacyName) {
      return {
        ...DEFAULT_STUDENT_PROFILE,
        name: legacyName,
      };
    }
  } catch (err) {
    console.error('Failed to parse student profile from localStorage', err);
  }
  return DEFAULT_STUDENT_PROFILE;
}

export function saveStudentProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    localStorage.setItem('quiz_student_name', profile.name);
    localStorage.setItem('quiz_username', profile.name);
    localStorage.setItem('quiz_school_name', profile.schoolName);
    localStorage.setItem('quiz_student_age', String(profile.age));
    localStorage.setItem('quiz_student_class', profile.classGrade);

    // Dispatch a storage-like custom event so all open views update
    window.dispatchEvent(new CustomEvent('studentProfileUpdated', { detail: profile }));
  } catch (err) {
    console.error('Failed to save student profile', err);
  }
}
