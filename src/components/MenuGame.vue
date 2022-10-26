<template>
    <div class="col-lg-5 mt-5 menu">
        <div class="offset-2">
            <h5>Menu</h5>
            <div class="px-2 rounded logs">
                <router-link to="/">
                    <b-button pill variant="primary w-100 mt-1 shadow-none" class="button">Home</b-button>
                </router-link>
                <b-button pill variant="primary w-100 mt-1 shadow-none" class="button"
                    @click="$emit('fetchData', 'new game')">New Game</b-button>
                <b-button pill variant="primary w-100 my-1 shadow-none" class="button"
                    @click="$emit('fetchData', 'new opponent')">New Opponent</b-button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.menu {
    opacity: 100%;
}

.logs {
    width: 220px;
    background-color: #FFF7D6;
    border: 3px solid #FFCC00;
}

.button {
    border: 4px solid #73B9E5;
}
</style>

