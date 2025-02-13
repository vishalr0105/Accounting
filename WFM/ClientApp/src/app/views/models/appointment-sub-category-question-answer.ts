export class AppointmentSubCategoryQuestionAnswer {
  id?: string;
  answer: string;
  appointmentSubCategoryQuestionId?: string;
  appointmentSubCategoryQuestion?: string;
  tempId?: number;
}

export class AppointmentSubCategoryAnswersByQuestion {
  questionId: string;
  question: string;
  answers?: AppointmentSubCategoryQuestionAnswer[] = [];
}
