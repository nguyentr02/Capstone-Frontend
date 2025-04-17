<!-- views/admin/Questionnaire/ViewQuestionnaire.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { questionsMockData } from '@/mock/questionsMockData.js'
import { usersMockData } from '@/mock/usersMock.js'
import { eventsMockData } from '@/mock/eventsMock.js'

// 获取路由与当前活动 eventId（路由参数应设置为 eventId）
const route = useRoute()
const router = useRouter()
const eventId = parseInt(route.params.eventId)

// 当前活动数据及加载状态
const event = ref(null)
const loading = ref(true)

onMounted(() => {
  // 模拟 API 调用加载当前活动详情
  setTimeout(() => {
    const foundEvent = eventsMockData.find(e => e.id === eventId)
    if (foundEvent) {
      event.value = foundEvent
    } else {
      event.value = {
        id: eventId,
        name: 'Event not found',
        description: '',
        date: '',
        time: '',
        location: '',
        address: '',
        organizer: '',
        organizerContact: '',
        status: '',
        capacity: 0,
        ticketsSold: 0,
        revenue: '',
        imageUrl: '',
        features: []
      }
    }
    loading.value = false
  }, 500)
})

// Tabs 状态，默认显示 Registration Questions Tab
const activeTab = ref('questionnaire')

// ===== Registration Questions (问卷) 相关 =====
const questions = ref([])

// 添加问题：初始问题对象包含文本、题型、选项及其他设置
const addQuestion = () => {
  const newQuestion = {
    id: Date.now(),
    text: '',
    type: 'text', // 默认题型为 text
    options: [''], // 当题型为 select/radio/checkbox 时使用
    required: false,
    hasMaxLength: false
  }
  questions.value.push(newQuestion)
}

// 删除问题
const removeQuestion = (index) => {
  questions.value.splice(index, 1)
}

// 添加选项
const addOption = (question) => {
  question.options.push('')
}

// 删除选项
const removeOption = (question, optionIndex) => {
  if (question.options.length > 1) {
    question.options.splice(optionIndex, 1)
  }
}

// 以下是新增的变量与方法，确保提交按钮能正常工作

// 用于指示保存状态
const saving = ref(false)
// 用于标识当前模式，默认为创建模式
const isEditMode = ref(false)
// 简单的表单校验函数，你可以根据需要扩展校验逻辑
const validateForm = () => {
  // 例如可以校验每个问题是否有文本等
  return true
}

// 保存操作，将保存当前数据（此处以 questions 为例，可根据实际需求调整）
const saveEvent = () => {
  if (!validateForm()) {
    return
  }
  saving.value = true
  // 模拟 API 保存调用（你可以将保存数据改为实际的 API 调用）
  setTimeout(() => {
    console.log('Questions saved:', questions.value)
    saving.value = false
    router.push('/admin/questionnaire')
  }, 1000)
}

// 取消操作
const cancelForm = () => {
  router.push('/admin/questionnaire')
}

// ===== Questionnaire Completers (问卷完成者) 相关 =====
const completersSearchQuery = ref('')
const questionnaireCompleters = computed(() => {
  return usersMockData.filter(user => {
    const query = completersSearchQuery.value.toLowerCase()
    return (
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone_no.toLowerCase().includes(query)
    )
  })
})
const viewCompletionDetails = (userId) => {
  router.push(`/admin/questionnaire/completion/${userId}`)
}

// 格式化日期函数
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <AdminLayout>
    <div class="p-3">
      <!-- Loading 状态 -->
      <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 16rem;">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- 主内容 -->
      <div v-else>
        <!-- 返回按钮 -->
        <button @click="router.push('/admin/questionnaire')" class="btn btn-link text-primary mb-3" title="Back">
          <i class="pi pi-arrow-left"></i>
          Back to Questionnaire
        </button>

        <!-- 当前活动基本信息 -->
        <div class="mb-4">
          <h1 class="fs-2 fw-bold text-dark">{{ event.name }}</h1>
          <div class="d-flex align-items-center">
            <span class="px-2 py-1 rounded-pill small fw-semibold"
                  :class="{
                    'bg-light text-success': event.status === 'Active',
                    'bg-light text-primary': event.status === 'Upcoming',
                    'bg-light text-dark': event.status === 'Completed',
                    'bg-light text-danger': event.status === 'Cancelled'
                  }">
              {{ event.status }}
            </span>
            <span class="text-muted ms-2">{{ formatDate(event.date) }}</span>
          </div>
        </div>

        <!-- Tabs 导航 -->
        <div class="bg-white rounded shadow-sm overflow-hidden mb-4">
          <div class="d-flex border-bottom">
            <button @click="activeTab = 'questionnaire'" type="button"
                    class="px-3 py-2 fs-6 fw-semibold bg-light border-0 no-border-btn"
                    :class="activeTab === 'questionnaire' ? 'text-primary' : 'text-muted'">
              Registration Questions
            </button>
            <button @click="activeTab = 'completers'" type="button"
                    class="px-3 py-2 fs-6 fw-semibold bg-light border-0 no-border-btn"
                    :class="activeTab === 'completers' ? 'text-primary' : 'text-muted'">
              Questionnaire Completers
            </button>
          </div>
        </div>

        <!-- Tabs 内容 -->
        <div class="bg-white rounded shadow-sm p-4">
          <!-- Questionnaire Tab -->
          <div v-if="activeTab === 'questionnaire'" class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h3 class="h6">Registration Questions</h3>
                <p class="small text-muted">
                  Create questions that attendees will answer during registration
                </p>
              </div>
              <button @click="addQuestion" type="button" class="btn btn-primary d-flex align-items-center">
                <i class="pi pi-plus me-2"></i>
                Add Question
              </button>
            </div>
            <div v-if="questions.length === 0" class="alert alert-light text-center">
              <div class="text-muted mb-2">
                <i class="pi pi-list-alt"></i>
              </div>
              <h4 class="h6 mb-2">No questions</h4>
              <p class="small text-muted mb-3">
                Add questions to collect information from your attendees during registration
              </p>
              <button @click="addQuestion" type="button" class="btn btn-primary d-inline-flex align-items-center">
                <i class="pi pi-plus me-2"></i>
                Add First Question
              </button>
            </div>
            <div v-else class="mb-4">
              <div v-for="(question, index) in questions" :key="question.id" class="bg-white border rounded overflow-hidden mb-3">
                <!-- Question header -->
                <div class="bg-light px-3 py-2 d-flex justify-content-between align-items-center border-bottom">
                  <div class="d-flex align-items-center">
                    <i class="pi pi-bars text-muted me-3" style="cursor: move;"></i>
                    <span class="fw-semibold text-dark">Question {{ index + 1 }}</span>
                    <span v-if="question.required" class="small bg-danger text-white px-2 py-1 rounded-pill ms-2">
                      Required
                    </span>
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="small text-muted bg-light px-2 py-1 rounded me-2">
                      {{ question.type }}
                    </span>
                    <button @click="removeQuestion(index)" type="button" class="btn btn-link text-danger p-0">
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>
                </div>
                <!-- Question content -->
                <div class="p-3">
                  <div class="mb-3">
                    <label class="form-label">Question Text</label>
                    <input v-model="question.text" type="text" placeholder="Enter your question" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Question Type</label>
                    <select v-model="question.type" class="form-select">
                      <option value="text">Text Input</option>
                      <option value="textarea">Text Area (long text)</option>
                      <option value="select">Dropdown</option>
                      <option value="radio">Multiple Choice (single selection)</option>
                      <option value="checkbox">Checkboxes (multiple selection)</option>
                      <option value="date">Date</option>
                      <option value="email">Email</option>
                      <option value="number">Number</option>
                    </select>
                  </div>
                </div>
                <!-- Options for select, radio or checkbox types -->
                <div v-if="['select', 'radio', 'checkbox'].includes(question.type)" class="mb-3 p-3">
                  <label class="form-label mb-2">Options</label>
                  <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="d-flex align-items-center mb-2">
                    <input v-model="question.options[optionIndex]" type="text" placeholder="Option text" class="form-control" />
                    <button @click="removeOption(question, optionIndex)" type="button" class="btn btn-link text-danger ms-2" :disabled="question.options.length <= 1">
                      <i class="pi pi-times"></i>
                    </button>
                  </div>
                  <button @click="addOption(question)" type="button" class="btn btn-link text-primary mt-2 small">
                    <i class="pi pi-plus me-1"></i>
                    Add Option
                  </button>
                </div>
                <!-- Additional settings -->
                <div class="d-flex align-items-center gap-3">
                  <label class="d-flex align-items-center mb-0">
                    <input v-model="question.required" type="checkbox" class="form-check-input me-2" />
                    <span class="small text-dark">Required</span>
                  </label>
                  <label v-if="question.type === 'text' || question.type === 'textarea'" class="d-flex align-items-center mb-0">
                    <input v-model="question.hasMaxLength" type="checkbox" class="form-check-input me-2" />
                    <span class="small text-dark">Set max length</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="alert alert-info">
              <h4 class="h6 fw-semibold mb-1">Tips for Creating Questions</h4>
              <ul class="list-disc list-inside small text-info">
                <li>Keep questions clear and concise</li>
                <li>Only make questions required if you absolutely need the information</li>
                <li>Use appropriate question types for the data you're collecting</li>
                <li>Consider the privacy implications of the data you collect</li>
              </ul>
            </div>

          <!-- Form Actions -->
          <div class="mt-4 pt-3 border-top d-flex justify-content-end gap-3">
            <button @click="cancelForm" type="button" class="btn btn-outline-secondary">Cancel</button>
            <!-- 此处修改为 type="button" 并绑定 @click 事件 -->
            <button @click="saveEvent" type="button" class="btn btn-primary d-flex align-items-center" :disabled="saving">
              <span v-if="!saving">{{ isEditMode ? 'Update questionnaire' : 'Create questionnaire' }}</span>
              <span v-else class="d-flex align-items-center">
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </span>
            </button>
          </div>
        </div>

          <!-- Questionnaire Completers Tab -->
          <div v-if="activeTab === 'completers'">
            <h2 class="fs-5 fw-semibold text-dark mb-3">Questionnaire Completers</h2>
            <!-- 搜索控件 -->
            <div class="d-flex justify-content-start align-items-center mb-3">
              <input v-model="completersSearchQuery" type="text" class="form-control" placeholder="Search completers..." style="max-width:300px;" />
            </div>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr class="bg-light border-bottom">
                    <th class="px-3 py-2 text-start fs-6 text-muted">Name</th>
                    <th class="px-3 py-2 text-start fs-6 text-muted">Email</th>
                    <th class="px-3 py-2 text-end fs-6 text-muted">Phone</th>
                    <th class="px-3 py-2 text-center fs-6 text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in questionnaireCompleters" :key="user.id" class="border-bottom">
                    <td class="px-3 py-2 text-dark">{{ user.first_name }} {{ user.last_name }}</td>
                    <td class="px-3 py-2 text-dark">{{ user.email }}</td>
                    <td class="px-3 py-2 text-dark text-end">{{ user.phone_no }}</td>
                    <td class="px-3 py-2 text-center">
                      <div class="d-flex justify-content-center gap-2">
                        <button @click="viewCompletionDetails(user.id)" class="btn btn-link text-primary p-0" title="View Completion Details">
                          <i class="pi pi-eye"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="questionnaireCompleters.length === 0">
                    <td colspan="4" class="px-3 py-4 text-center text-muted">
                      <div class="d-flex flex-column align-items-center">
                        <i class="pi pi-user-minus fs-1 mb-2"></i>
                        <p class="fw-medium">No completers found</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> <!-- End Tabs 内容 -->
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.no-border-btn:hover {
  background-color: #e9ecef;
}
</style>



