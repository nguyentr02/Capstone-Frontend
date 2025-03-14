<template>
  <div class="create-questionnaire-view">
    <!-- DashBar 置顶 -->
    <div class="dashbar-container">
      <DashBar />
    </div>

    <!-- 中间区域，左右两部分浮动 -->
    <div class="content-container">
      <div class="left-block">
        <EventQuestionnaireEdit :fields="fields" />
      </div>
      <div class="right-block">
        <QuestionnaireForm @add-field="addFieldToList" />
      </div>
    </div>

    <!-- 底部 LinkGenerator -->
    <div class="bottom-container">
      <LinkGenerator @database-cleared="clearFieldsInMemory" />
    </div>
  </div>
</template>

<script>
import QuestionnaireForm from "@/components/create_event_component/create_questionnaire/QuestionnaireForm.vue";
import EventQuestionnaireEdit from "@/components/create_event_component/questionnaire_list/EventQuestionnaireEdit.vue";
import LinkGenerator from "@/components/create_event_component/link_generater.vue";
import DashBar from "@/components/create_event_component/DashBar.vue";

export default {
  name: "CreateQuestionnaireView",
  components: {
    DashBar,
    QuestionnaireForm,
    EventQuestionnaireEdit,
    LinkGenerator,
  },
  data() {
    return {
      fields: JSON.parse(localStorage.getItem("fields")) || [
        { name: "event code", type: "number" },
        { name: "name", type: "Text" },
        { name: "phone number", type: "Text" },
        { name: "rating", type: "rating bar" },
      ],
    };
  },
  methods: {
    addFieldToList(newField) {
      this.fields.push(newField);
      console.log("新增字段", newField);
      localStorage.setItem("fields", JSON.stringify(this.fields));
    },
    clearFieldsInMemory() {
      this.fields = [];
    },
  },
};
</script>

<style scoped>
/* 父级容器，一些基础样式 */
.create-questionnaire-view {
  width: 50%;
  min-height: 100vh;
  font-family: sans-serif;
  margin: 0 auto;
}

/* 顶部 DashBar 区域 */
.dashbar-container {
  padding: 16px;
  color: #fff;
}

/* content-container 中通过 ::after 清除浮动 */
.content-container {
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  /* 关键：清除浮动 */
  position: relative;
}
.content-container::after {
  content: "";
  display: block;
  clear: both;
}

/* 左侧区域：EventQuestionnaireEdit */
.left-block {
  float: left;         /* 左浮动 */
  width: 60%;          /* 可根据需求调整 */
  box-sizing: border-box;
  border-radius: 8px;
  padding: 20px;
  margin-right: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

/* 右侧区域：QuestionnaireForm */
.right-block {
  float: right;        /* 右浮动 */
  width: 20%;          /* 可根据需求调整 */
  box-sizing: border-box;
  border-radius: 8px;
  padding: 20px;
  margin-left: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

/* 底部区域：LinkGenerator */
.bottom-container {
  padding: 16px;
  text-align: center;
  /* 如果想固定在视窗底部，可使用 position: fixed; bottom: 0; left: 0; 等，
     这里仅示例普通的底部块状区域
  */
  margin-top: 20px;
}
</style>
