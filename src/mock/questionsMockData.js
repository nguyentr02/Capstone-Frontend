// src/mock/questionsMockData.js
export const questionsMockData = [
    {
      id: 1,
      questionnaire_id: 1,
      question_text: 'How would you rate the conference overall?',
      question_type: 'radio',
      category: 'feedback', 
      validation_rules: JSON.stringify({ required: true }),
      created_at: '2025-01-02T09:00:00Z',
      updated_at: '2025-01-02T09:00:00Z'
    },
    {
      id: 2,
      questionnaire_id: 1,
      question_text: 'Which topic was the most interesting?',
      question_type: 'text',
      category: 'feedback',
      validation_rules: JSON.stringify({ maxLength: 100 }),
      created_at: '2025-01-02T09:10:00Z',
      updated_at: '2025-01-03T12:00:00Z'
    },
    {
      id: 3,
      questionnaire_id: 2,
      question_text: 'What improvements would you suggest for the festival?',
      question_type: 'textarea',
      category: 'suggestion',
      validation_rules: JSON.stringify({ required: true, maxLength: 500 }),
      created_at: '2025-01-16T11:15:00Z',
      updated_at: '2025-01-16T11:15:00Z'
    },
    {
      id: 4,
      questionnaire_id: 2,
      question_text: 'Would you attend again next year?',
      question_type: 'radio',
      category: 'future_intent',
      validation_rules: JSON.stringify({ required: true }),
      created_at: '2025-01-16T11:20:00Z',
      updated_at: '2025-01-16T11:20:00Z'
    }
  ]
  