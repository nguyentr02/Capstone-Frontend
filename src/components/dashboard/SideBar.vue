<script setup>

</script>

<template>
    <aside id="sidebar" class="app-sidebar">
        <div class="aside-head">
            <span class="image image-cover profile-img"><img src="@/assets/cat.jpeg" alt="admin avatar"></span>
       
            <div class="name"> John Doe </div>
            <div class="role"> Administrator </div>
        </div>

        <div class="aside-body">
            <ul class = "task-list">
                <li class="task-item">
                    <span class="task-name"> Main</span>
                </li>
                <li>
                    <a href="">
                        <!-- Change class name later on -->
                        <div class="flex-link"> 
                            <span> </span>
                            <span class="nav-label"> Dashboard </span>
                            <span> </span>
                        </div>
                    </a>
                </li>

                <li>
                    <a href="">
                        <div class="flex-link"> 
                            <span> </span>
                            <span class="nav-label"> Event management </span>
                            <span> </span>
                        </div>
                    </a>
                </li>


            </ul>
        </div>
    </aside>
</template>

<style scoped>
    .app-sidebar {
        height: 100%;
        width: 240px;
        background: #562ee4;
    }

    .profile-img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: inline-block;
    }

    .profile-img img {
        border-radius: 50%;
    }

    .aside-head .name {
        font-weight: 500;
        color: white;
        margin-bottom: 7px;
    }

    .aside-head .role {
        font-size: 13px;
        color: white
    }

    .app-sidebar .aside-body {
        padding: 0 10px;
    }

    .flex-link {
        display: flex;
        flex-direction: column;
    }
    .app-sidebar .task-list li > a{
        padding: 12px;
        position: relative;
        text-decoration: none;
        font-size: 14px;
        border-radius: 8px;
    }
</style>