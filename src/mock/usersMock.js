// src/mock/usersMock.js
export const usersMockData = [
  {
    id: 1,
    first_name: 'Alice',
    last_name: 'Johnson',
    email: 'alice@example.com',
    phone_no: '123-456-7890',
    role: 1, // 例如 1=Admin
    password: 'hashedPassword123',
    created_at: '2025-01-15T10:00:00Z',
    updated_at: '2025-01-15T10:00:00Z'
  },
  {
    id: 2,
    first_name: 'Bob',
    last_name: 'Smith',
    email: 'bob@example.com',
    phone_no: '555-987-6543',
    role: 2, // 例如 2=User
    password: 'hashedPassword456',
    created_at: '2025-02-10T09:30:00Z',
    updated_at: '2025-02-15T14:20:00Z'
  },
  {
    id: 3,
    first_name: 'Carol',
    last_name: 'White',
    email: 'carol@example.com',
    phone_no: '555-222-1111',
    role: 2, // 普通用户
    password: 'hashedPassword789',
    created_at: '2025-03-05T14:45:00Z',
    updated_at: '2025-03-06T08:10:00Z'
  },
  {
    id: 4,
    first_name: 'David',
    last_name: 'Brown',
    email: 'david@example.com',
    phone_no: '555-333-4444',
    role: 3, // 例如 3=Staff
    password: 'hashedPasswordABC',
    created_at: '2025-02-20T11:00:00Z',
    updated_at: '2025-02-20T12:00:00Z'
  },
  {
    id: 5,
    first_name: 'Eve',
    last_name: 'Adams',
    email: 'eve@example.com',
    phone_no: '555-111-2222',
    role: 1, // 管理员
    password: 'hashedPasswordXYZ',
    created_at: '2025-01-25T07:20:00Z',
    updated_at: '2025-02-01T13:45:00Z'
  }
]

