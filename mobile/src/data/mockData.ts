export interface Subtopic {
  id: string;
  title: string;
  isLocked: boolean;
  isCompleted: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

export interface Subject {
  id: string;
  title: string;
  year: string;
  progress: number;
  chapters: Chapter[];
}

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 'anat-1',
    title: 'Human Anatomy',
    year: '1st Year',
    progress: 35,
    chapters: [
      {
        id: 'c1',
        title: 'Upper Limb',
        subtopics: [
          { id: 's1', title: 'Pectoral Region', isLocked: false, isCompleted: true },
          { id: 's2', title: 'Axilla', isLocked: false, isCompleted: false },
          { id: 's3', title: 'Brachial Plexus', isLocked: true, isCompleted: false },
        ]
      },
      {
        id: 'c2',
        title: 'Lower Limb',
        subtopics: [
          { id: 's4', title: 'Front of Thigh', isLocked: true, isCompleted: false },
        ]
      }
    ]
  },
  {
    id: 'phys-1',
    title: 'Physiology',
    year: '1st Year',
    progress: 10,
    chapters: [
      {
        id: 'c3',
        title: 'General Physiology',
        subtopics: [
          { id: 's5', title: 'Cell Membrane', isLocked: false, isCompleted: true },
        ]
      }
    ]
  },
  {
    id: 'bio-1',
    title: 'Biochemistry',
    year: '1st Year',
    progress: 0,
    chapters: []
  }
];

export const MOCK_MCQS = [
  {
    id: 'q1',
    question: 'Which nerve pierces the clavipectoral fascia?',
    options: ['Lateral pectoral nerve', 'Medial pectoral nerve', 'Long thoracic nerve', 'Thoracodorsal nerve'],
    correctIndex: 0,
    explanation: 'The lateral pectoral nerve pierces the clavipectoral fascia to supply the pectoralis major.'
  },
  {
    id: 'q2',
    question: 'The axillary sheath is derived from which layer of deep cervical fascia?',
    options: ['Investing layer', 'Pretracheal layer', 'Prevertebral layer', 'Carotid sheath'],
    correctIndex: 2,
    explanation: 'The axillary sheath is a prolongation of the prevertebral layer of deep cervical fascia.'
  }
];
