export class DiagnosticQuestions {
    id: string
    category: string
    appointmentJobCategoryID:string
    subcategoryNameID :string
    subCategory:string
    DiagnosticQuestionMaster:any
    question:string
  }

  export class addNewQuestion {
    id: string
    text:string
    DiagnosticOptions = new Array();
  }

  export class addOptions {
    id: string
    questionId: string
    text:string
  }


  export interface QuestionOptions {
    question: Question
    options: Option[]
  }

  export interface Question {
    companyID: string
    jobDiagnosticQuestionsAnswersID: string
    diagnosticQuestion: string
    id: string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
  }

  export interface Option {
    companyID: string
    diagnosticQuestionID: string
    optionName: string
    id: string
    createdBy: string
    updatedBy: any
    createdAt: string
    updatedAt: string
  }
