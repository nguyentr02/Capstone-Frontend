// src/mock/responsesMockData.js
export const responsesMockData = [
    {
      id: 1,
      eq_id: 1,              // 关联到 event_questions 表中的某个问题 (id=1)
      registration_id: 1,    // 关联到 registrations 表中的某条注册 (id=1)
      response_text: 'Excellent conference overall!',
      selected_option_id: null, // 针对文本回答通常为空
      created_at: '2025-01-16T09:00:00Z',
      updated_at: '2025-01-16T09:00:00Z'
    },
    {
      id: 2,
      eq_id: 2,
      registration_id: 1,
      response_text: null,
      selected_option_id: 3, // 如果问题是 radio/checkbox/select 并选了第3个选项
      created_at: '2025-01-16T09:05:00Z',
      updated_at: '2025-01-16T09:05:00Z'
    },
    {
      id: 3,
      eq_id: 3,
      registration_id: 3,
      response_text: 'More food stalls and better seating area.',
      selected_option_id: null,
      created_at: '2025-02-12T10:20:00Z',
      updated_at: '2025-02-12T10:20:00Z'
    },
    {
      id: 4,
      eq_id: 4,
      registration_id: 4,
      response_text: null,
      selected_option_id: 1,
      created_at: '2025-02-12T10:30:00Z',
      updated_at: '2025-02-12T10:45:00Z'
    }
  ]
  