<template>
    <div>
        <div class="row mx-0">
            <div>
                <div>
                    <div class="float-end me-4 my-2">
                        <img src="@/assets/Kodi-logo.jpg" class="kodi position-absolute ms-5">
                        <img src="@/assets/kodimon-1.png" class="kodimon position-relative mt-2">
                    </div>
                </div>
            </div>
        </div>
        <div v-if="pokemonOne && pokemonTwo" class="container my-0">
            <div class="row">
                <PokemonOneTwo :endPoint="pokemonOne" :endGameOpacity="endGameOpacity"
                    :pokemonBorderColor="pokemonOneBorderColor" :pokemonHelth="pokemonOneHelth" :canRun="canRun"
                    :arrow="arrow" :dmg="dmg" :pokemonColor="pokemonOneColor"
                    :attackPokemonDisplay="attackPokemonDisplay" :attackOpacity="attackFirstOpacity"
                    :pokemonOne="pokemonOne" :pokemonTwo="pokemonTwo" />
                <div class="col-lg-4">
                    <div v-if="endGameMenu" class="winner">
                        <h2 v-if="pokemonTwoHelth == 0" class="d-inline offset-3">{{pokemonOne.name}} won!</h2>
                        <h2 v-else class="d-inline offset-3">{{pokemonTwo.name}} won!</h2>
                    </div>
                    <div v-if="!endGameMenu" class="row h-50" :style="{opacity: endGameOpacity}">
                        <div class="col text-center"
                            :style="{display: attackPokemonDisplay, opacity: opacityAfterPressingButton}">
                            <p class="fw-bold my-1">{{arrow == 0 ? pokemonTwo.name : pokemonOne.name}}
                            </p>
                            <img :src="arrow == 0 ? pokemonTwo.sprites.front_shiny : pokemonOne.sprites.front_shiny"
                                class="pokemon_img">
                        </div>
                        <div class="col text-center"
                            :style="{display: attackPokemonDisplay, opacity: opacityAfterPressingButton}">
                            <p class="fw-bold my-1">{{arrow == 0 ? pokemonTwo.name : pokemonOne.name}}
                            </p>
                            <img :src="arrow == 0 ? pokemonTwo.sprites.front_shiny : pokemonOne.sprites.front_shiny"
                                class="pokemon_img">
                        </div>
                    </div>
                    <MenuGame class="offset-2" v-if="endGameMenu" @fetchData="this.fetchData" />
                    <div v-if="!endGameMenu" class="d-flex justify-content-center align-items-end  h-50">
                        <div>
                            <img src="@/assets/arrow.png" class="mx-5 mb-3 arrow_img"
                                :style="{transform: 'rotate(' + arrow + 'deg)'}">
                            <b-button pill variant="primary px-5 d-block shadow-none" class="attack_button"
                                :style="{opacity: opacityAfterPressingButton}" @click="atack">
                                Attack!</b-button>
                        </div>
                    </div>
                </div>
                <PokemonOneTwo :endPoint="pokemonTwo" :endGameOpacity="endGameOpacity"
                    :pokemonBorderColor="pokemonTwoBorderColor" :pokemonHelth="pokemonTwoHelth" :canRun="canRun"
                    :arrow="arrow" :dmg="dmg" :pokemonColor="pokemonTwoColor"
                    :attackPokemonDisplay="attackPokemonDisplay" :attackOpacity="attackSecondOpacity"
                    :pokemonOne="pokemonOne" :pokemonTwo="pokemonTwo" />
            </div>
            <div class="row d-flex justify-content-around  mt-4" :style="{opacity: endGameOpacity}">
                <MenuGame v-if="!endGameMenu" @fetchData="this.fetchData" />
                <div class="col-lg-6  me-4">
                    <div class="me-5">
                        <h5 class="offset-3">Logs</h5>
                        <div class="rounded w-75 float-end my-0 d-flex logs">
                            <p class="ms-3 mb-0 mt-2 fw-bold d-flex" v-for="log in logs" :key="log.count">{{log.text}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AnimationLoader :loadingSpinner="loadingSpinner" :failQuery="failQuery" />
    </div>
</template>
<script>
import axios from "axios"
import MenuGame from "./MenuGame.vue"
import PokemonOneTwo from "./PokemonOneTwo.vue"
import AnimationLoader from "./AnimationLoader.vue"
export default {
    components: {
        MenuGame,
        PokemonOneTwo,
        AnimationLoader
    },
    data() {
        return {
            loadingSpinner: false,
            canRun: true,
            pokemonOne: null,
            pokemonOneHelth: 100,
            pokemonOneColor: '#62FF84',
            pokemonOneBorderColor: '#079325',
            pokemonTwo: null,
            pokemonTwoHelth: 100,
            pokemonTwoColor: '#62FF84',
            pokemonTwoBorderColor: '#079325',
            opacityAfterPressingButton: 100 + '%',
            attackPokemonDisplay: 'none',
            attackFirstOpacity: 100 + '%',
            attackSecondOpacity: 100 + '%',
            endGameOpacity: 100 + '%',
            endGameMenu: false,
            failQuery: false,
            dmg: null,
            counter: 0,
            arrow: 0,
            logs: []
        }
    },
    methods: {
        async fetchData(status) {
            if (this.canRun) {
                if (status == 'new game' || status == 'first game') {
                    this.loadingSpinner = true
                    const random = Array.from({ length: 2 }, () => Math.floor(Math.random() * 100 | 1));
                    if (random[0] == random[1]) {
                        random[0] = random[0] + 1
                    }
                    try {
                        const POKEMON_ONE = await axios.get(`https://pokeapi.co/api/v2/pokemon/${localStorage.length == 0 || status == 'new game' ? random[0] : this.$route.query.fighter_one.toLowerCase()}/`);
                        const POKEMON_TWO = await axios.get(`https://pokeapi.co/api/v2/pokemon/${localStorage.length == 0 || status == 'new game' ? random[1] : this.$route.query.fighter_two.toLowerCase()}/`);
                        this.pokemonOne = POKEMON_ONE.data
                        this.pokemonTwo = POKEMON_TWO.data
                    } catch (err) {
                        this.failQuery = true
                        let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
                        console.warn("error", message); 
                    }
                    this.pokemonOne.name = this.pokemonOne.name.charAt(0).toUpperCase() + this.pokemonOne.name.slice(1)
                    this.pokemonTwo.name = this.pokemonTwo.name.charAt(0).toUpperCase() + this.pokemonTwo.name.slice(1)
                    this.pokemonOne.stats[5].base_stat > this.pokemonTwo.stats[5].base_stat ? this.arrow = 180 :
                        this.pokemonOne.stats[5].base_stat == this.pokemonTwo.stats[5].base_stat ? this.arrow = 180 : 0
                    this.logs = []
                    setTimeout(() => {
                        this.loadingSpinner = false
                    }, 1999)
                }
                if (status == 'new opponent') {
                    this.loadingSpinner = true
                    const random = Math.floor(Math.random() * 100 | 1)
                    const NEW_POKEMON = await axios.get(`https://pokeapi.co/api/v2/pokemon/${(random == this.pokemonOne.id) || (random == this.pokemonTwo.id) ? random + 1 : random}/`);
                    if (this.pokemonOneHelth == 0) {
                        this.pokemonOne = NEW_POKEMON.data
                        this.pokemonOne.name = this.pokemonOne.name.charAt(0).toUpperCase() + this.pokemonOne.name.slice(1)
                    } else {
                        this.pokemonTwo = NEW_POKEMON.data
                        this.pokemonTwo.name = this.pokemonTwo.name.charAt(0).toUpperCase() + this.pokemonTwo.name.slice(1)
                    }
                    setTimeout(() => {
                        this.loadingSpinner = false
                    }, 1999)
                }


                
                this.pokemonOneHelth = 100
                this.pokemonTwoHelth = 100
                this.pokemonOneColor = '#62FF84'
                this.pokemonOneBorderColor = '#079325'
                this.pokemonTwoColor = '#62FF84'
                this.pokemonTwoBorderColor = '#079325'
                this.endGameOpacity = 100 + '%'
                this.endGameMenu = false
                if (this.pokemonOne.stats[5].base_stat > this.pokemonTwo.stats[5].base_stat) {
                    this.arrow = 180
                } else if (this.pokemonOne.stats[5].base_stat == this.pokemonTwo.stats[5].base_stat) {
                    this.arrow = 180
                } else {
                    this.arrow = 0
                }
            } else {
                this.$toastr.defaultPosition = "toast-top-left";
                this.$toastr.e("The fight is on !" + '<br>' + 'Wait for the fight to end !');
            }
            this.$router.push({ query: { fighter_one: this.pokemonOne.name, fighter_two: this.pokemonTwo.name } }).catch(error => {
                if (error.name != "NavigationDuplicated") {
                    throw error;
                }
            });
            localStorage.setItem("fighter_one", this.pokemonOne.name)
            localStorage.setItem("fighter_two", this.pokemonTwo.name)
        },
        atack() {
            const possibilityOfAttackPokemon = []
            if (this.pokemonOneHelth <= 0 || this.pokemonTwoHelth <= 0) {
                this.endGameOpacity = 30 + '%'
                this.endGameMenu = true
            } else {
                if (this.canRun) {
                    this.canRun = false
                    this.opacityAfterPressingButton = 30 + '%'
                    this.attackPokemonDisplay = 'block'
                    this.arrow == 0 ? this.attackSecondOpacity = 30 + '%' : this.attackFirstOpacity = 30 + '%'
                    for (let i = 0; i <= 4; i++) {
                        if (possibilityOfAttackPokemon.length == 0) {
                            possibilityOfAttackPokemon.push('Miss')
                        } else if (this.arrow == 180) {
                            possibilityOfAttackPokemon.push(((this.pokemonOne.stats[1].base_stat / 2) - ((this.pokemonOne.stats[1].base_stat / 2) * (this.pokemonTwo.stats[2].base_stat > 90 ? 90 / 100 : this.pokemonTwo.stats[2].base_stat / 100))).toFixed(2))
                        } else {
                            possibilityOfAttackPokemon.push(((this.pokemonTwo.stats[1].base_stat / 2) - ((this.pokemonTwo.stats[1].base_stat / 2) * (this.pokemonOne.stats[2].base_stat > 90 ? 90 / 100 : this.pokemonOne.stats[2].base_stat / 100))).toFixed(2))
                        }
                    }
                    this.dmg = possibilityOfAttackPokemon[Math.floor(Math.random() * possibilityOfAttackPokemon.length)]
                    setTimeout(() => {
                        if (this.dmg == 'Miss') {
                            this.counter += 1
                            this.logs.unshift({ count: this.counter, text: `${this.arrow == 0 ? this.pokemonTwo.name : this.pokemonOne.name} missed ${this.arrow == 0 ? this.pokemonOne.name : this.pokemonTwo.name}` })
                        } else if (this.dmg != 'Miss') {
                            if (this.arrow == 0 && this.pokemonOneHelth - this.dmg <= 0) {
                                this.counter += 1
                                this.logs.unshift({ count: this.counter, text: `${this.pokemonTwo.name} attacked ${this.pokemonOne.name} for ${this.dmg} dmg` })
                                this.pokemonOneHelth -= this.dmg
                                this.pokemonOneHelth = Number(this.pokemonOneHelth.toFixed(2))
                                this.counter += 1
                                this.logs.unshift({ count: this.counter, text: `${this.pokemonOne.name} died` })
                                this.pokemonOneHelth = 0
                            } else if (this.arrow == 180 && this.pokemonTwoHelth - this.dmg <= 0) {
                                this.counter += 1
                                this.logs.unshift({ count: this.counter, text: `${this.pokemonOne.name} attacked ${this.pokemonTwo.name} for ${this.dmg} dmg` })
                                this.pokemonTwoHelth -= this.dmg
                                this.pokemonTwoHelth = Number(this.pokemonTwoHelth.toFixed(2))
                                this.counter += 1
                                this.logs.unshift({ count: this.counter, text: `${this.pokemonTwo.name} died` })
                                this.pokemonTwoHelth = 0
                            } else {
                                this.counter += 1
                                this.logs.unshift({ count: this.counter, text: `${this.arrow == 0 ? this.pokemonTwo.name : this.pokemonOne.name} attacked ${this.arrow == 0 ? this.pokemonOne.name : this.pokemonTwo.name} for ${this.dmg} dmg` })
                                this.arrow == 0 ? this.pokemonOneHelth -= this.dmg : this.pokemonTwoHelth -= this.dmg
                                this.arrow == 0 ? this.pokemonOneHelth = Number(this.pokemonOneHelth.toFixed(2)) : this.pokemonTwoHelth = Number(this.pokemonTwoHelth.toFixed(2))
                            }
                        }
                        if (this.pokemonOneHelth < 50) {
                            this.pokemonOneColor = '#FFCC00'
                            this.pokemonOneBorderColor = '#FFCC00'
                        }
                        if (this.pokemonTwoHelth < 50) {
                            this.pokemonTwoColor = '#FFCC00'
                            this.pokemonTwoBorderColor = '#FFCC00'
                        }
                        if (this.pokemonOneHelth < 30) {
                            this.pokemonOneColor = '#ff0000'
                            this.pokemonOneBorderColor = '#ff0000'
                        }
                        if (this.pokemonTwoHelth < 30) {
                            this.pokemonTwoColor = '#ff0000'
                            this.pokemonTwoBorderColor = '#ff0000'
                        }
                        this.arrow == 0 ? this.arrow = 180 : this.arrow = 0; this.attackFirstOpacity = 30 + '%'
                        this.opacityAfterPressingButton = 100 + '%'
                        this.attackPokemonDisplay = 'none'
                        this.attackFirstOpacity = 100 + '%'
                        this.attackSecondOpacity = 100 + '%'
                        this.canRun = true
                    }, 2999)
                }
            }
        },
    },
    created() {
        this.loadingSpinner = true
        this.fetchData('first game')
        setTimeout(() => {
            this.loadingSpinner = false
        }, 1999)
    }
}
</script>
<style scoped>
.kodi {
    transform: rotate(-25deg);
    width: 35px;
    height: 35px;
}

.kodimon {
    width: 140px;
    height: 80px;
}

.winner {
    opacity: 100%;
}

.attack_button {
    border: 4px solid #73B9E5;
}

.logs {
    height: 205px;
    background-color: #FFF7D6;
    border: 3px solid #FFCC00;
    overflow: auto;
    flex-direction: column-reverse;
}

.pokemon_img {
    width: 120px;
    height: 120px;
}

.arrow_img {
    width: 50px;
    height: 25px;
}
</style>