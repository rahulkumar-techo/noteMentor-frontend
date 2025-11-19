export type FormDataType = {
  role: string;

  academic: {
    board: string;
    classOrYear: string;
    subjects: string[];
    languagePreference: string;
    examGoal: string;
  };

  personalization: {
    learningSpeed: string;
    goalType: string;
    focusDuration: number;
    noteUploadType: string;
  };
};
