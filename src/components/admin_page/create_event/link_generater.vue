<template>
    <section class="link-generator">
      <div class="control-panel">
        <button class="generate-button">generate link here</button>
        <div class="action-buttons">
          <button class="confirm-button">Confirm</button>
          <button class="copy-button">copy</button>
        </div>
      </div>
      <div class="link-display">link</div>
    </section>
  </template>
  
  <style scoped>
  .link-generator {
    display: flex;
    align-items: stretch;
    gap: 40px 46px;
    font-family:
      Poppins,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 16px;
    flex-wrap: wrap;
  }
  
  @media (max-width: 640px) {
    .link-generator {
      margin-bottom: -5px;
    }
  }
  
  .control-panel {
    color: rgba(255, 255, 255, 1);
    font-weight: 500;
    text-align: center;
    line-height: 23.9px;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 0;
    width: fit-content;
    margin-bottom: auto;
  }
  
  @media (max-width: 640px) {
    .control-panel {
      margin-top: auto;
    }
  }
  
  .generate-button {
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background-color: rgba(119, 120, 176, 1);
    padding: 10px 70px;
    color: inherit;
    font: inherit;
  }
  
  @media (max-width: 991px) {
    .generate-button {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  
  .action-buttons {
    display: flex;
    margin-top: 21px;
    align-items: stretch;
    gap: 20px;
    justify-content: space-between;
  }
  
  .confirm-button {
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background-color: rgba(238, 18, 18, 0.84);
    padding: 10px 52px;
    color: inherit;
    font: inherit;
  }
  
  @media (max-width: 991px) {
    .confirm-button {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  
  .copy-button {
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background-color: rgba(119, 120, 176, 0.84);
    padding: 10px 57px;
    white-space: nowrap;
    color: inherit;
    font: inherit;
  }
  
  @media (max-width: 991px) {
    .copy-button {
      padding-left: 20px;
      padding-right: 20px;
      white-space: initial;
    }
  }
  
  .link-display {
    border: 1px solid rgba(121, 121, 121, 1);
    background-color: rgba(246, 246, 246, 1);
    align-self: start;
    padding: 40px 20px;
    color: rgba(0, 0, 0, 1);
    font-weight: 400;
    white-space: nowrap;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
    width: fit-content;
    margin: auto 0;
  }
  
  @media (max-width: 991px) {
    .link-display {
      max-width: 100%;
      padding-right: 20px;
      white-space: initial;
    }
  }
  </style>
  
  <script>
  export default {
    name: "LinkGenerator",
    data() {
      return {
        generatedLink: "",
      };
    },
    methods: {
      generateLink() {
        // Implementation for link generation
      },
      confirmLink() {
        // Implementation for link confirmation
      },
      copyAction() {
        // Implementation for copy
      },
    },
  };
  </script>
  