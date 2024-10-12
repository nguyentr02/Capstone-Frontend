<template> 
  <transition name="fade">
    <div v-if="showFilter" class="filter-overlay">
      <div class="filter-popup">
        <h2>Filter Options</h2>

        <!-- 活动类型部分 -->
        <div class="filter-section">
          <h3>Choose Activity</h3>
          <div class="activity-grid">
            <div
              class="activity-icon"
              v-for="activity in activities"
              :key="activity.name"
              :class="{ selected: selectedActivity === activity.name }"
              @click="selectActivity(activity.name)"
            >
              <img :src="require(`@/assets/${activity.image}`)" :alt="activity.name" />
              <span>{{ activity.name }}</span>
            </div>
          </div>
        </div>

        <!-- 地点选择 -->
        <div class="filter-section">
          <h3>Location</h3>
          <div class="location-container">
            <input
              type="text"
              class="location-input"
              v-model="location"
              placeholder="Enter your location or select from map"
            />
            <button class="map-button" @click="openMap">Map</button>
          </div>
          <div ref="map" class="map-popup" v-if="showMap"></div>
        </div>

        <!-- 价格区间 -->
        <div class="filter-section">
          <h3>Price Range</h3>
          <div class="price-inputs">
            <input type="number" v-model="minPrice" placeholder="Min Price" />
            <input type="number" v-model="maxPrice" placeholder="Max Price" />
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="filter-actions">
          <button class="clear-button" @click="clearFilter">Clear</button>
          <button class="apply-button" @click="applyFilter">Apply</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import L from "leaflet";

export default {
  name: "FilterPopup",
  props: ["showFilter"],
  data() {
    return {
      activities: [
        { name: "Sport", image: "Sport.png" },
        { name: "Music", image: "Music.png" },
        { name: "Art", image: "Art.png" },
        { name: "Food", image: "Food.png" },
      ],
      selectedActivity: "",
      location: "",
      minPrice: "",
      maxPrice: "",
      showMap: false,
      map: null,
      marker: null,
    };
  },
  methods: {
    selectActivity(activityName) {
      this.selectedActivity = activityName;
    },
    clearFilter() {
      this.selectedActivity = "";
      this.location = "";
      this.minPrice = "";
      this.maxPrice = "";
    },
    applyFilter() {
      this.$emit("applyFilter", {
        selectedActivity: this.selectedActivity,
        location: this.location,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
      });
      this.$emit("closeFilter");
    },
    openMap() {
      this.showMap = true;
      this.$nextTick(() => {
        this.initMap();
      });
    },
    initMap() {
      if (!this.map) {
        this.map = L.map(this.$refs.map).setView([51.505, -0.09], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);

        this.map.on("click", this.onMapClick);
      }
    },
    onMapClick(e) {
      const { lat, lng } = e.latlng;

      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else {
        this.marker = L.marker(e.latlng).addTo(this.map);
      }

      this.location = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      this.showMap = false;
    },
  },
};
</script>

<style scoped>
/* 动画效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* 弹出框覆盖层 */
.filter-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* 弹出框样式 */
.filter-popup {
  background-color: white;
  width: 90%;
  max-width: 800px;  /* 放大整体尺寸 */
  padding: 40px;     /* 放大内容的内边距 */
  border-radius: 20px;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 80vh;
  text-align: center;
  transform: scale(1.1);  /* 放大整个弹出框 */
}

/* 活动类型部分 */
.activity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* 放大每个图标 */
  gap: 20px;
  margin-bottom: 30px;
}

/* 活动图标 */
.activity-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.activity-icon.selected {
  transform: scale(1.15); /* 增加放大效果 */
  border: 3px solid #42b983;
  border-radius: 50%;
}

.activity-icon img {
  width: 100%;
  max-width: 100px; /* 放大图标 */
  height: auto;
  border-radius: 50%;
  margin-bottom: 10px;
}

/* 地点选择部分 */
.location-container {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.location-input {
  flex-grow: 1;
  padding: 15px; /* 放大输入框的内边距 */
  font-size: 18px; /* 增加字体大小 */
  border: 2px solid #ccc;
  border-radius: 10px;
}

/* 地图按钮 */
.map-button {
  padding: 15px;
  font-size: 18px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.map-button:hover {
  background-color: #369e6f;
}

/* 地图弹出框 */
.map-popup {
  width: 100%;
  height: 400px;
  margin-top: 20px;
}

/* 价格输入框 */
.price-inputs {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.price-inputs input {
  flex: 1;
  padding: 15px;
  font-size: 18px; /* 增加字体大小 */
  border: 2px solid #ccc;
  border-radius: 10px;
}

/* 操作按钮 */
.filter-actions {
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
}

.clear-button,
.apply-button {
  flex: 1;
  padding: 15px;
  margin: 0 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.clear-button {
  background-color: #f5f5f5;
  color: #333;
}

.clear-button:hover {
  background-color: #e0e0e0;
}

.apply-button {
  background-color: #42b983;
  color: white;
}

.apply-button:hover {
  background-color: #369e6f;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .filter-popup {
    width: 95%;
    max-width: 100%;
    padding: 30px;
    transform: scale(1);  /* 在小屏幕上保持较小的放大倍数 */
  }

  .activity-grid {
    grid-template-columns: repeat(2, 1fr); /* 在中小屏幕上显示两列 */
  }

  .location-input {
    font-size: 16px; /* 减小小屏幕的字体大小 */
  }

  .map-button {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .activity-grid {
    grid-template-columns: 1fr; /* 在小屏幕上显示一列 */
  }

  .map-button {
    width: 100%; /* 在小屏幕上按钮也全宽 */
  }
}
</style>
