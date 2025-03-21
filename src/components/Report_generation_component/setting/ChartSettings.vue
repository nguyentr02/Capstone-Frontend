<template>
  <main class="settings-container">
    <h1 class="settings-title">Setting</h1>
    <div class="settings-content">

      <!-- 第一行：选择图表类型 -->
      <SelectionField
        label="Select chart type" :value="chartType" @click="handleChartTypeClick" />
      <!-- 下拉列表：仅在 showChartTypeList 为 true 时显示 -->
      <ul v-if="showChartTypeList" class="dropdown-list">
        <li
          v-for="type in chartTypeOptions" :key="type" @click="selectChartType(type)"> {{ type }}
        </li>
      </ul>

      <!-- 第二行：选择 X -->
      <SelectionField label="Select X" :value="xValue" @click="handleXAxisClick" />
      <ul v-if="showXAxisList" class="dropdown-list">
        <li v-for="option in xOptions" :key="option" @click="selectX(option)" > {{ option }}
        </li>
      </ul>

      <!-- 第三行：选择 Y -->
      <SelectionField label="Select Y" :value="yValue" @click="handleYAxisClick" />
      <ul v-if="showYAxisList" class="dropdown-list">
        <li v-for="option in yOptions" :key="option" @click="selectY(option)"> {{ option }}
        </li>
      </ul>

      <!-- chart topic 保持原先输入框 -->
      <section class="chart-topic">
        <label class="topic-label">chart topic</label>
        <input
          type="text"
          class="topic-input"
          v-model="chartTopic"
        />
      </section>
    </div>
  </main>
</template>

<script>
import SelectionField from "./SelectionField.vue";

export default {
  name: "ChartSettings",
  components: {
    SelectionField,
  },
  data() {
    return {
      // 当前选中的文本
      chartType: "Type: Liner chart",
      xValue: "days",
      yValue: "clients views",
      chartTopic: "Clients each days view",

      // 控制下拉列表显示/隐藏的布尔值
      showChartTypeList: false,
      showXAxisList: false,
      showYAxisList: false,

      // 下拉可选项
      chartTypeOptions: ["Liner chart", "Bar chart", "Pie chart"],
      xOptions: ["days", "weeks", "months"],
      yOptions: ["clients views", "unique visitors", "bounce rate"],
    };
  },
  methods: {
    // 点击“+”按钮时，切换对应的下拉列表显示
    handleChartTypeClick() {
      this.showChartTypeList = !this.showChartTypeList;
      // 关闭其他下拉
      this.showXAxisList = false;
      this.showYAxisList = false;
    },
    handleXAxisClick() {
      this.showXAxisList = !this.showXAxisList;
      this.showChartTypeList = false;
      this.showYAxisList = false;
    },
    handleYAxisClick() {
      this.showYAxisList = !this.showYAxisList;
      this.showChartTypeList = false;
      this.showXAxisList = false;
    },

    // 选中某个选项时，更新对应文本，并关闭下拉
    selectChartType(type) {
      this.chartType = `Type: ${type}`;
      this.showChartTypeList = false;
    },
    selectX(option) {
      this.xValue = option;
      this.showXAxisList = false;
    },
    selectY(option) {
      this.yValue = option;
      this.showYAxisList = false;
    },
  },
};
</script>

<style scoped>
.settings-container {
  max-width: none;
  margin-left: auto;
  margin-right: auto;
  width: 509px;
  padding: 25px 43px;
  border-radius: 28px;
  box-shadow: 4px 6px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: rgba(162, 157, 235, 0.3);
}

.settings-title {
  font-family: "Poppins", sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #000;
  text-align: center;
  margin-bottom: 84px;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 27.7px;
}

.chart-topic {
  display: flex;
  flex-direction: column;
  gap: 21.8px;
}

.topic-label {
  width: 215px;
  height: 34px;
  border-radius: 5px;
  border: 1px solid #281dc0;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: #261bc3;
  font-weight: 400;
  background-color: #fff;
}

.topic-input {
  flex: 1;
  padding: 0 27px;
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #302d27;
  height: 57px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  background-color: #f3f3f3;
}

@media (max-width: 991px) {
  .settings-container {
    max-width: 991px;
    width: 90%;
    padding: 20px;
  }

  .settings-title {
    font-size: 30px;
    margin-bottom: 60px;
  }

  .topic-input {
    height: 50px;
  }
}

@media (max-width: 640px) {
  .settings-container {
    max-width: 640px;
    width: 95%;
    padding: 15px;
  }

  .settings-title {
    font-size: 24px;
    margin-bottom: 40px;
  }

  .topic-label {
    width: 100%;
  }

  .topic-input {
    padding: 0 15px;
    font-size: 14px;
    height: 50px;
  }
}
</style>
