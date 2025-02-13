import { AppointmentSubCategoryQuestionAnswer } from "./appointment-sub-category-question-answer";

export class AppointmentSubCategoryQuestion {
    id?: string;
    diagnosticQuestion: string;
    subcategoryNameId: string;
    companyId: string;
    answers: AppointmentSubCategoryQuestionAnswer[] = [];
}