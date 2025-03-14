<template>
  <article class="event-description">
    <EventSection 
      v-for="(section, index) in sections" 
      :key="index" 
      :title="section.title"  
      :content="section.content" 
    />
    <div class="button-container">
      <button class="add-description-btn" @click="addSection">Add more description</button>
    </div>
  </article>
</template>

<script>
import EventSection from "./EventSection.vue";

export default {
  name: "EventDescription",
  components: {
    EventSection,
  },
  data() {
    return {
      // 用一个数组来存储所有的 section 信息
      sections: [
        {
          title: "Descript of the Event In Here",
          content: `Chocolate Starfish marks 30 years with a spectacular Australian tour
            that celebrates the best of everything – the albums, the songs, and
            the exhilarating shows for which the band is widely renowned.
            Featuring the hits of their self-titled debut album and favourites
            from Box, Spide(editable text)`,
        },
        {
          title: "Descript the Notice in Here",
          content: {
            description: `This project supports conditional refunds. The specific refund
              period, refund handling fees, and other refund conditions that can be
              applied for are subject to the refund policy provided by the project
              organizer. Please refer to the refund policy published in the service
              description or project details page for details(editable text)`
          },
        }
      ],
    };
  },
  methods: {
    // 每点击一次按钮，在 sections 数组中添加一个新的 section 对象
    addSection() {
      this.sections.push({
        title: "New Event Section",
        subtitle: "",
        content: "Enter content here",
        type: "event"
      });
    }
  },
};
</script>

<style scoped>
.event-description {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: 1306px;
  height: 481px;
  padding: 20px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.add-description-btn {
  font-size: 20px;
  font-family: Poppins;
  color: #ffffff;
  width: 252px;
  height: 35px;
  border-radius: 5px;
  background-color: #7778b0;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-description-btn:hover {
  opacity: 0.9;
}
</style>
