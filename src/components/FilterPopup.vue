<template>
  <transition name="fade">
    
    <div v-if="showFilter" class="filter-overlay">
      <div class="filter-popup">
        <button
          class="close-button"
          @click="closeFilter"
          aria-label="Close Filter Popup"
        >
          &times;
        </button>
        <h2>Filter Options</h2>

        <!-- Activity Type Section -->
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
              <img
                :src="activity.image"
                :alt="activity.name"
              />
              <span>{{ activity.name }}</span>
            </div>
          </div>
          <div v-if="errors.selectedActivity" class="error-message">
            {{ errors.selectedActivity }}
          </div>
        </div>

        <!-- Location Selection Section -->
        <div class="filter-section">
          <h3>Location</h3>
          <div class="location-container">
            <input
              type="text"
              class="location-input"
              v-model="location"
              @blur="handleManualInput"
              placeholder="Enter location or select from map"
              :disabled="isGeocoding"
            />
            <button
              class="map-button"
              @click="toggleMap"
              :disabled="isGeocoding"
            >
              Map
            </button>
          </div>
          <div v-if="errors.location" class="error-message">
            {{ errors.location }}
          </div>
          <div v-if="isGeocoding" class="loading-spinner">
            <!-- Simple text-based loader; replace with a spinner if desired -->
            Loading...
          </div>
          <!-- Leaflet Map for Selecting Location -->
          <div v-if="showMap" ref="map" class="map-popup"></div>
        </div>

        <!-- Price Range Section -->
        <div class="filter-section">
          <h3>Price Range</h3>
          <div class="price-inputs">
            <div class="price-input-wrapper">
              <input type="number" v-model="minPrice" placeholder="Min Price" />
              <div v-if="errors.minPrice" class="error-message">
                {{ errors.minPrice }}
              </div>
            </div>
            <div class="price-input-wrapper">
              <input type="number" v-model="maxPrice" placeholder="Max Price" />
              <div v-if="errors.maxPrice" class="error-message">
                {{ errors.maxPrice }}
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons Section -->
        <div class="filter-actions">
          <button class="clear-button" @click="clearFilter">Clear</button>
          <button class="apply-button" @click="applyFilter">Apply</button>
        </div>
      </div>
    </div>
 
  </transition>
</template>

<script setup>
import { ref, onBeforeUnmount, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Props
const props = defineProps({
  showFilter: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(["closeFilter", "applyFilter"]);

// Reactive State
const activities = ref([
  { name: "Sport", image: new URL("@/assets/images/Sport.png", import.meta.url).href },
  { name: "Music", image: new URL("@/assets/images/Music.png", import.meta.url).href },
  { name: "Art", image: new URL("@/assets/images/Art.png", import.meta.url).href },
  { name: "Food", image: new URL("@/assets/images/Food.png", import.meta.url).href },
]);

const selectedActivity = ref("");
const location = ref("");
const minPrice = ref("");
const maxPrice = ref("");
const showMap = ref(false);
const map = ref(null);
const marker = ref(null);
const isGeocoding = ref(false);

const errors = ref({
  selectedActivity: "",
  location: "",
  minPrice: "",
  maxPrice: "",
});

// Methods
const selectActivity = (activityName) => {
  selectedActivity.value = activityName;
  errors.value.selectedActivity = ""; // Clear error
};

const clearFilter = () => {
  selectedActivity.value = "";
  location.value = "";
  minPrice.value = "";
  maxPrice.value = "";
  errors.value = {
    selectedActivity: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  };
  if (marker.value) {
    map.value.removeLayer(marker.value);
    marker.value = null;
  }
};

const validateInputs = () => {
  let isValid = true;

  // Validate Activity Type
  if (!selectedActivity.value) {
    errors.value.selectedActivity = "Please select at least one activity type.";
    isValid = false;
  } else {
    errors.value.selectedActivity = "";
  }

  // Validate Location
  if (!location.value.trim()) {
    errors.value.location = "Please enter or select a location.";
    isValid = false;
  }

  // Validate Price Range
  if (minPrice.value === "" || maxPrice.value === "") {
    errors.value.minPrice = "Please enter a price range.";
    errors.value.maxPrice = "Please enter a price range.";
    isValid = false;
  } else {
    if (isNaN(minPrice.value) || minPrice.value < 0) {
      errors.value.minPrice = "Min price must be a non-negative number.";
      isValid = false;
    } else {
      errors.value.minPrice = "";
    }

    if (isNaN(maxPrice.value) || maxPrice.value < 0) {
      errors.value.maxPrice = "Max price must be a non-negative number.";
      isValid = false;
    } else {
      errors.value.maxPrice = "";
    }

    if (Number(minPrice.value) > Number(maxPrice.value)) {
      errors.value.minPrice = "Min price cannot be greater than max price.";
      errors.value.maxPrice = "Max price cannot be less than min price.";
      isValid = false;
    }
  }

  return isValid;
};

const applyFilter = async () => {
  if (validateInputs()) {
    emit("applyFilter", {
      selectedActivity: selectedActivity.value,
      location: location.value,
      minPrice: minPrice.value,
      maxPrice: maxPrice.value,
    });
    closeFilter();
  }
};

const closeFilter = () => {
  emit("closeFilter");
};

const toggleMap = () => {
  showMap.value = !showMap.value;
  if (showMap.value) {
    nextTick(() => {
      initMap();
    });
  }
};

const initMap = () => {
  if (!map.value) {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    map.value = L.map(mapElement).setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value);

    map.value.on("click", onMapClick);
  } else {
    map.value.invalidateSize();
  }
};

const onMapClick = async (e) => {
  const { lat, lng } = e.latlng;

  if (marker.value) {
    marker.value.setLatLng(e.latlng);
  } else {
    marker.value = L.marker(e.latlng).addTo(map.value);
  }

  try {
    const address = await reverseGeocode(lat, lng);
    location.value = address;
    errors.value.location = "";
  } catch (error) {
    console.error("Reverse Geocoding Error:", error);
    errors.value.location =
      "Unable to retrieve the address for the selected location.";
  }

  showMap.value = false;
};

const reverseGeocode = async (lat, lng) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data.display_name;
};

const geocodeAddress = async (address) => {
  const encodedAddress = encodeURIComponent(address);
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodedAddress}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (data.length === 0) {
    throw new Error("No results found for the entered address.");
  }
  return {
    address: data[0].display_name,
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
};

const handleManualInput = async () => {
  if (!location.value.trim()) {
    errors.value.location = "Please enter or select a location.";
    return;
  }

  isGeocoding.value = true;
  try {
    const result = await geocodeAddress(location.value);
    location.value = result.address;
    errors.value.location = "";

    if (map.value) {
      map.value.setView([result.lat, result.lng], 13);
      if (marker.value) {
        marker.value.setLatLng([result.lat, result.lng]);
      } else {
        marker.value = L.marker([result.lat, result.lng]).addTo(map.value);
      }
    } else {
      showMap.value = true;
      await nextTick();
      initMap();
      map.value.setView([result.lat, result.lng], 13);
      if (marker.value) {
        marker.value.setLatLng([result.lat, result.lng]);
      } else {
        marker.value = L.marker([result.lat, result.lng]).addTo(map.value);
      }
    }
  } catch (error) {
    console.error("Geocoding Error:", error);
    errors.value.location =
      "Unable to find the entered address. Please try again.";
  } finally {
    isGeocoding.value = false;
  }
};

// Lifecycle hooks
onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove();
  }
});
</script>

<style scoped>
/* Animation Effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Overlay Styles */
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

/* Popup Styles */
.filter-popup {
  background-color: white;
  width: 90%;
  max-width: 800px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 80vh;
  text-align: center;
  position: relative;
}

/* Close Button */
.close-button {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #aaa;
  transition: color 0.3s;
}

.close-button:hover {
  color: #333;
}

/* Activity Type Section */
.activity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.activity-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s, border 0.2s;
}

.activity-icon.selected {
  transform: scale(1.15);
  border: 3px solid #42b983;
  border-radius: 50%;
}

.activity-icon img {
  width: 100%;
  max-width: 100px;
  height: auto;
  border-radius: 50%;
  margin-bottom: 10px;
}

/* Location Selection Section */
.location-container {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.location-input {
  flex-grow: 1;
  padding: 15px;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 10px;
}

/* Map Button */
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

/* Loading Spinner (Simple Text-based) */
.loading-spinner {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}

/* Map Popup */
.map-popup {
  width: 100%;
  height: 400px;
  margin-top: 20px;
}

/* Price Range Section */
.price-inputs {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.price-inputs input {
  flex: 1;
  padding: 15px;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 10px;
}

/* Error Message Styles */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
  text-align: left;
}

/* Price Input Wrapper for Alignment */
.price-input-wrapper {
  position: relative;
  flex: 1;
}

/* Ensure Proper Spacing Between Input and Error Message */
.price-input-wrapper input {
  width: 100%;
  box-sizing: border-box;
}

/* Action Buttons Section */
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

/* Responsive Design */
@media (max-width: 768px) {
  .filter-popup {
    width: 95%;
    max-width: 100%;
    padding: 30px;
  }

  .activity-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .location-input {
    font-size: 16px;
  }

  .map-button {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .activity-grid {
    grid-template-columns: 1fr;
  }

  .map-button {
    width: 100%;
  }
}
</style>
