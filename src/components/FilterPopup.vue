<template>
  <transition name="fade">
    <div v-if="showFilter" class="filter-overlay">
      <div class="filter-popup">
        <button class="close-button" @click="closeFilter" aria-label="Close Filter Popup">&times;</button>
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
              <img :src="require(`@/assets/${activity.image}`)" :alt="activity.name" />
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
            <button class="map-button" @click="toggleMap" :disabled="isGeocoding">Map</button>
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
      errors: {
        selectedActivity: "",
        location: "",
        minPrice: "",
        maxPrice: "",
      },
      isGeocoding: false, // Indicates if a geocoding request is in progress
    };
  },
  methods: {
    selectActivity(activityName) {
      this.selectedActivity = activityName;
      this.errors.selectedActivity = ""; // Clear error
    },
    clearFilter() {
      this.selectedActivity = "";
      this.location = "";
      this.minPrice = "";
      this.maxPrice = "";
      this.errors = {
        selectedActivity: "",
        location: "",
        minPrice: "",
        maxPrice: "",
      };
      if (this.marker) {
        this.map.removeLayer(this.marker);
        this.marker = null;
      }
    },
    async applyFilter() {
      if (this.validateInputs()) {
        this.$emit("applyFilter", {
          selectedActivity: this.selectedActivity,
          location: this.location,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
        });
        this.closeFilter(); // Close the filter popup after applying
      }
    },
    closeFilter() {
      this.$emit("closeFilter");
    },
    toggleMap() {
      this.showMap = !this.showMap;
      if (this.showMap) {
        this.$nextTick(() => {
          this.initMap();
        });
      }
    },
    initMap() {
      if (!this.map) {
        // Initialize the map
        this.map = L.map(this.$refs.map).setView([51.505, -0.09], 13);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);

        // Add click event listener
        this.map.on("click", this.onMapClick);
      } else {
        // If the map is already initialized, refresh its size
        this.map.invalidateSize();
      }
    },
    async onMapClick(e) {
      const { lat, lng } = e.latlng;

      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else {
        this.marker = L.marker(e.latlng).addTo(this.map);
      }

      try {
        const address = await this.reverseGeocode(lat, lng);
        this.location = address;
        this.errors.location = ""; // Clear location error
      } catch (error) {
        console.error("Reverse Geocoding Error:", error);
        this.errors.location = "Unable to retrieve the address for the selected location.";
      }

      this.showMap = false;
    },
    async reverseGeocode(lat, lng) {
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
    },
    async geocodeAddress(address) {
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
      // Return the first result's display_name and coordinates
      return {
        address: data[0].display_name,
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    },
    async handleManualInput() {
      if (!this.location.trim()) {
        this.errors.location = "Please enter or select a location.";
        return;
      }

      this.isGeocoding = true;
      try {
        const result = await this.geocodeAddress(this.location);
        this.location = result.address;
        this.errors.location = "";

        // Update the map view and marker
        if (this.map) {
          this.map.setView([result.lat, result.lng], 13);
          if (this.marker) {
            this.marker.setLatLng([result.lat, result.lng]);
          } else {
            this.marker = L.marker([result.lat, result.lng]).addTo(this.map);
          }
        } else {
          // Initialize the map centered at the geocoded location
          this.showMap = true;
          this.$nextTick(() => {
            this.initMap();
            this.map.setView([result.lat, result.lng], 13);
            if (this.marker) {
              this.marker.setLatLng([result.lat, result.lng]);
            } else {
              this.marker = L.marker([result.lat, result.lng]).addTo(this.map);
            }
          });
        }
      } catch (error) {
        console.error("Geocoding Error:", error);
        this.errors.location = "Unable to find the entered address. Please try again.";
      } finally {
        this.isGeocoding = false;
      }
    },
    validateInputs() {
      let isValid = true;

      // Validate Activity Type
      if (!this.selectedActivity) {
        this.errors.selectedActivity = "Please select at least one activity type.";
        isValid = false;
      } else {
        this.errors.selectedActivity = "";
      }

      // Validate Location
      if (!this.location.trim()) {
        this.errors.location = "Please enter or select a location.";
        isValid = false;
      }

      // Validate Price Range
      if (this.minPrice === "" || this.maxPrice === "") {
        this.errors.minPrice = "Please enter a price range.";
        this.errors.maxPrice = "Please enter a price range.";
        isValid = false;
      } else {
        if (isNaN(this.minPrice) || this.minPrice < 0) {
          this.errors.minPrice = "Min price must be a non-negative number.";
          isValid = false;
        } else {
          this.errors.minPrice = "";
        }

        if (isNaN(this.maxPrice) || this.maxPrice < 0) {
          this.errors.maxPrice = "Max price must be a non-negative number.";
          isValid = false;
        } else {
          this.errors.maxPrice = "";
        }

        if (Number(this.minPrice) > Number(this.maxPrice)) {
          this.errors.minPrice = "Min price cannot be greater than max price.";
          this.errors.maxPrice = "Max price cannot be less than min price.";
          isValid = false;
        }
      }

      return isValid;
    },
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
};
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
