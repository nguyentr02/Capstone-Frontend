// src/mock/paymentsMockData.js
export const paymentsMockData = [
    {
      id: 1,
      purchase_id: 1,           // 外键，关联到 purchases 表中某条购买记录
      amount: 100.0,            // 支付金额
      payment_method: 'credit_card', // e.g. 'credit_card', 'paypal', 'bank_transfer'
      status: 'completed',      // 可取值: 'completed', 'pending', 'failed' 等
      created_at: '2025-01-10T09:45:00Z',
      updated_at: '2025-01-10T09:45:00Z'
    },
    {
      id: 2,
      purchase_id: 2,
      amount: 80.0,
      payment_method: 'paypal',
      status: 'pending',
      created_at: '2025-02-06T08:00:00Z',
      updated_at: '2025-02-06T08:00:00Z'
    },
    {
      id: 3,
      purchase_id: 3,
      amount: 300.0,
      payment_method: 'credit_card',
      status: 'completed',
      created_at: '2025-03-01T12:20:00Z',
      updated_at: '2025-03-01T12:20:00Z'
    },
    {
      id: 4,
      purchase_id: 4,
      amount: 50.0,
      payment_method: 'bank_transfer',
      status: 'failed',
      created_at: '2025-03-10T14:05:00Z',
      updated_at: '2025-03-10T14:10:00Z'
    },
    {
      id: 5,
      purchase_id: 5,
      amount: 150.0,
      payment_method: 'credit_card',
      status: 'completed',
      created_at: '2025-04-01T17:00:00Z',
      updated_at: '2025-04-01T17:00:00Z'
    }
  ]
  