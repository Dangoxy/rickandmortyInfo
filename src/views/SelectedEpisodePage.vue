<template>
    <Navbar></Navbar>
    <div v-if="episodeData.data">
        <h1>{{episodeData.data.name}}</h1>
        <h1>{{episodeData.data.air_date}}</h1>
        <h1>{{episodeData.data.episode}}</h1>
    </div>
    <div >
        <h1>Characters</h1>
        <h1 v-for="char in charactersData.data">{{char.name}}</h1>
    </div>
</template>

<script setup>
import {useRoute} from "vue-router"
import {ref, reactive, watch} from "vue"
import Navbar from "../components/Navbar.vue"
import axios from 'axios';

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