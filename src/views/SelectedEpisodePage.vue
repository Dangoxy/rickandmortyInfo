<template>
    <Navbar></Navbar>
    <div class="flex flex-col w-full h-full bg-[#F0F9E3] items-center justify-between gap-4 text-center">
        <div class="flex flex-col w-full h-full justify-center items-center p-4">
            <div v-if="episodeData.data" class="w-fit p-4 flex flex-col h-fit gap-4 border-2 border-[#D9D9D9] rounded-[8px] text-[#031C1A]">
                <div class="flex gap-2 justify-center items-center">
                    <img src="../../public/episodesIcon.png" class="size-12" />
                    <h1 class="md:text-[32px] text-[24px]">{{episodeData.data.name}}</h1>
                </div>

                <div class="h-1 w-full bg-[#D9D9D9] rounded-full"></div>
                
                <div class="flex  justify-around items-center gap-4  w-full h-full">
                    
                    <div class="flex flex-col justify-center items-center gap-0">
                        <h1 class="md:text-[24px] text-[16px] text-[rgba(3,28,26,0.6)]">Episode</h1>
                        <h1 class="md:text-[32px] text-[24px]">{{episodeData.data.episode}}</h1>
                    </div>
                    <div class="h-full w-0.5 bg-[#D9D9D9] rounded-full"></div>
                    <div class="flex flex-col justify-center items-center gap-0">
                        <h1 class="md:text-[24px] text-[16px] text-[rgba(3,28,26,0.6)]">Air date</h1>
                        <h1 class="md:text-[32px] text-[24px]">{{episodeData.data.air_date}}</h1>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="flex flex-col w-full gap-0 justify-center items-center"> 
            <h1 class="md:text-[32px] text-[24px] text-[#031c1a] flex justify-center items-center gap-2">Characters in episode <span class="md:text-[20px] text-[12px]">({{ charactersData.data.length }})</span></h1>
            
            <div class="w-full">
                <swiper
                :modules="modules"
                :slides-per-view="'auto'"
                :space-between="16"
                :scrollbar="{draggable: true}"
                class="p-4"
                style="padding: 16px;"
                >
                <swiper-slide
                class="min-w-[200px] max-w-[200px] min-h-[400px] max-h-[400px]"
                v-if="charactersData.data.length !== 0"
                v-for="char in charactersData.data">
                    <CharacterCardVert :character="char"></CharacterCardVert>
                </swiper-slide>

                <swiper-slide
                class="min-w-[200px] max-w-[200px] min-h-[400px] max-h-[400px]"
                v-else v-for="index in 20" >
                    <CharacterCardVertShimmer/>
                </swiper-slide>
                </swiper>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import {useRoute} from "vue-router"
import {ref, reactive, watch} from "vue"
import Navbar from "../components/Navbar.vue"
import axios from 'axios';
import CharacterCardVert from "../components/CharacterCardVert.vue";
import CharacterCardVertShimmer from "../components/CharacterCardVertShimmer.vue";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const modules = [Pagination, Navigation, Scrollbar, A11y]

      
let route = useRoute()
console.log(route.params.id)

let episodeData = reactive({data: []})
let charactersData = reactive({data: []})

async function getEpisodeData(){
    await axios.get("https://rickandmortyapi.com/api/episode/"+route.params.id)
    .then((response) => {
        /* dataAPI.data = response.data.results;
        dataAPI.info = response.data.info; */
        console.log(response.data)
        episodeData.data = response.data
        
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}

getEpisodeData()

async function getEpisodesCharacters(){
    let characters = episodeData.data.characters
    let temp = []
    for(let i = 0; i < characters.length; i++){
        console.log(characters[i])

        await axios.get(characters[i])
        .then((response) => {
            console.log(response.data)
            temp.push(response.data)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }
    charactersData.data = temp
    
}


watch(() => route.params.id,(newId, oldId) => {
    getEpisodeData()
    console.log(newId)
})

watch(()=> episodeData.data, (newEpisodeData, oldEpisodeData)=>{
    getEpisodesCharacters()
})

</script>

<style scoped>

</style>