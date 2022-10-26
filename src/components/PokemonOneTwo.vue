<template>
    <div class="col-lg-4" :style="{opacity: endGameOpacity}">
        <div class="text-center">
            <small class="fw-bold" :style="{color: pokemonBorderColor}">{{pokemonHelth}}%</small>
            <p v-if="!canRun && (attackOpacity == '100%')"
                class="attack_message text-danger fw-bold d-inline-block ms-5 position-absolute">
                <small v-if="this.dmg != 'Miss'">{{this.dmg}} dmg !</small>
                <small v-else>{{this.dmg}} !</small>
            </p>
            <div class="rounded-pill w-50 offset-3" :style="{boxShadow: '0 0 5px' + pokemonBorderColor}">
                <div class="health rounded-pill" :style="{ width: pokemonHelth + '%', backgroundColor: pokemonColor}">
                </div>
            </div>
            <div v-if="arrow == 0" class="row">
                <div class="col" :style="{opacity: attackOpacity}">
                    <p class="fw-bold my-1">{{endPoint.name}}</p>
                    <img :src="endPoint.sprites.front_shiny">
                </div>
                <div class="col" :style="{display: attackPokemonDisplay, opacity: attackOpacity}">
                    <p class="fw-bold my-1">{{arrow == 0 ? pokemonTwo.name : pokemonOne.name}}</p>
                    <img :src="arrow == 0 ? pokemonTwo.sprites.front_shiny : pokemonOne.sprites.front_shiny">
                </div>
            </div>
            <div v-else class="row">
                <div class="col" :style="{display: attackPokemonDisplay, opacity: attackOpacity}">
                    <p class="fw-bold my-1">{{arrow == 0 ? pokemonTwo.name : pokemonOne.name}}</p>
                    <img :src="arrow == 0 ? pokemonTwo.sprites.front_shiny : pokemonOne.sprites.front_shiny">
                </div>
                <div class="col" :style="{opacity: attackOpacity}">
                    <p class="fw-bold my-1">{{endPoint.name}}</p>
                    <img :src="endPoint.sprites.front_shiny">
                </div>
            </div>
            <h5 class="text-start offset-3">Stats</h5>
        </div>
        <div class="d-flex justify-content-center align-items-center">
            <div class="p-2 rounded w-50 stats">
                <p class="my-0">HP: {{endPoint.stats[0].base_stat}}</p>
                <p class="my-0">Attack: {{endPoint.stats[1].base_stat}}</p>
                <p class="my-0">Defense: {{endPoint.stats[2].base_stat > 90 ? 90 : endPoint.stats[2].base_stat}}</p>
                <p class="my-0">Speed: {{endPoint.stats[5].base_stat}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['endPoint', 'endGameOpacity', 'pokemonBorderColor', 'pokemonHelth', 'canRun', 'arrow',
        'dmg', 'pokemonColor', 'attackPokemonDisplay', 'attackOpacity', 'pokemonTwo', 'pokemonOne']
}
</script>
<style scoped>
.attack_message {
    transform: rotate(-25deg);
    margin-top: -24px;
}

.health {
    height: 10px;
}

.stats {
    background-color: #FFF7D6;
    border: 3px solid #FFCC00;
}
img{
    width: 120px;
    height: 120px;
}
</style>