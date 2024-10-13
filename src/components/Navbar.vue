<template>
  <header class="navbar">
    <div class="navbar-content">
      <div class="logo-container">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4027fc65c55fffb9f43cceb3406695d584651c46e7bde313c0dce25056ccacd?placeholderIfAbsent=true&apiKey=d15d64ea902e41f8849cd1404c808385" class="logo-image" alt="Site Logo" />
        <h1 class="site-title">Site Name</h1>
      </div>
      <nav class="navigation">
        <ul class="nav-list">
          <li><a href="#schedule" class="nav-item">Schedule</a></li>
          <li><a href="#speakers" class="nav-item">Speakers</a></li>
          <li><a href="#ticket" class="nav-item">Ticket</a></li>
          <li><a href="#setting" class="nav-item">Setting</a></li>
          <li><a href="#login" class="nav-item login-button">Login</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: #7000ff;
  display: flex;
  width: 100%;
  height: 5%;
  justify-content: center;
  padding: 28px 70px;
}

.navbar-content {
  display: flex;
  width: 100%;
  max-width: 1704px;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.logo-container {
  display: flex;
  gap: 8px;
  font: 400 30px/1 'Jockey One', sans-serif;
}

.logo-image {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 45px;
}

.site-title {
  align-self: start;
  margin-top: 10px;
  color: #fff;
}

.navigation {
  margin: auto 0;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 40px 77px;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0;
  font: 500 16px 'DM Sans', sans-serif;
  color: #fff;
}

.nav-item {
  color: inherit;
  text-decoration: none;
}

.login-button {
  border-radius: 50px;
  padding: 10px 20px;
  border: 2px solid #fff;
}

@media (max-width: 991px) {
  .navbar {
    padding: 28px 20px;
  }

  .navbar-content,
  .nav-list {
    max-width: 100%;
  }

  .login-button {
    white-space: normal;
  }
}
</style>