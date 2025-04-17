// src/mock/registrationsMockData.js
export const registrationsMockData = [
    {
      id: 1,
      event_id: 1,          // 与 events 表中 id = 1 的活动关联
      participant_id: 101,  // 与 participants 表中的某个参与者关联
      userId: 1,            // 若有用户系统，指向 users 表中的某位用户（可选）
      status: 'confirmed',  // 可取值: 'confirmed', 'pending', 'cancelled' 等
      created_at: '2025-01-15T09:30:00Z',
      updated_at: '2025-01-15T09:30:00Z'
    },
    {
      id: 2,
      event_id: 1,
      participant_id: 102,
      userId: null,         // 此处为空，表示未与系统用户绑定
      status: 'pending',
      created_at: '2025-01-16T11:00:00Z',
      updated_at: '2025-01-16T11:00:00Z'
    },
    {
      id: 3,
      event_id: 2,
      participant_id: 103,
      userId: 2,
      status: 'pending',
      created_at: '2025-02-10T10:15:00Z',
      updated_at: '2025-02-12T08:25:00Z'
    },
    {
      id: 4,
      event_id: 2,
      participant_id: 104,
      userId: 3,
      status: 'confirmed',
      created_at: '2025-02-10T10:30:00Z',
      updated_at: '2025-02-11T09:00:00Z'
    },
    {
      id: 5,
      event_id: 3,
      participant_id: 105,
      userId: null,
      status: 'cancelled',
      created_at: '2025-03-01T12:00:00Z',
      updated_at: '2025-03-05T09:45:00Z'
    }
  ]
  