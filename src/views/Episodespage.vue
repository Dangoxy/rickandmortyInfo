<template>
    <div class="w-full h-full flex flex-col">

        
        <Navbar hideShadow="true" activePage="episodes"></Navbar>
        
        <div class="
        from-[rgb(23,128,64,0.24)] from-[20%] to-[rgb(23,128,64,0.24)] to-[80%]
        via-[rgb(186,213,79,0.24)] bg-gradient-to-r 

        shadow-[0px_4px_4px_0px] shadow-[rgb(3,28,26,50%)] z-20

        p-2 px-4 justify-between border-t-[1px] border-[rgb(3,28,26,0.25)] flex items-center gap-4
        ">
            <h1 class="text-[40px] text-[#031C1A]">Episodes</h1>

            <div class="flex flex-col items-center justify-center gap-2 text-center">
                <p v-if="dataAPI.info" class="text-[16px] text-[rgb(3,28,26,0.75)]">Total number of episodes: <span class="text-[#031C1A]">{{ dataAPI.info.count }}</span></p>

                <select 
                class="p-4 py-2 bg-transparent border-2 border-[#031C1A] text-[#031C1A] font-medium rounded-[8px]" 
                @change="switchSeason($event.target.value)">
                    <option value="All">All seasons</option>
                    <option v-for="season in sortedSeasons.seasons">{{season}}</option>
                </select>
            </div>
        </div>
        
        

        <div 
        ref="ScrollableAreaForCharacterCards" 
        class="bg-[#F0F9E3] w-full h-full overflow-y-scroll p-4">

            <div class="flex justify-center items-start w-full ">
                <div 
                v-if="dataAPI.data"
                class="flex flex-wrap w-full gap-4 justify-center items-stretch">
                    <div 
                    class="flex flex-col justify-center items-center gap-2 border-2 border-[#031C1A] py-2 px-4 rounded-[8px] text-[#031C1A] text-[20px] w-full md:w-[48%] xl:w-[24%]"
                    v-for="episode,index in currentSeasonSelected.episodes">
                        <div class="flex justify-center items-center gap-2 w-full">
                            <h1 class="text-[rgb(3,28,26,75%)] text-[16px]">Name</h1>
                            <router-link 
                            :to="('/episodes/'+episode.url.split('episode/')[1])"
                            class="underline underline-offset-2">{{ episode.name }}</router-link>
                        </div>
                        <div class="flex justify-center items-center gap-2 w-full">
                            <h1 class="text-[rgb(3,28,26,75%)] text-[16px]">Air date</h1>
                            <h1 class="">{{ episode.air_date }}</h1>
                        </div>
                        <div class="flex justify-center items-center gap-2 w-full">
                            <h1 class="text-[rgb(3,28,26,75%)] text-[16px]">Episode</h1>
                            <h1 class="">{{ episode.episode }}</h1>
                        </div>
                        
                    </div>
                </div>
            </div>

            

        </div>


    </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue"
import CharacterCard from "../components/CharacterCard.vue"
import CharacterCardVert from "../components/CharacterCardVert.vue"
import axios from 'axios';
import {ref, reactive, watch} from "vue"

    
    

    let dataAPI = reactive({data: [],info: null})
    let sortedSeasons = reactive({seasons:[]})
    let currentSeasonSelected = reactive({episodes: []})

    const ScrollableAreaForCharacterCards = ref()
    
    async function getDataEpisode(){
        await axios.get("https://rickandmortyapi.com/api/episode")
        .then((response) => {
            /* console.log(response) */
            dataAPI.info = response.data.info
            for (let i=0; i<response.data.info.pages; i++){
                axios.get(`https://rickandmortyapi.com/api/episode?page=${i+1}`)
                .then((response) => {
                    dataAPI.data = [...dataAPI.data,...response.data.results]
                    console.log(response.data.results)
                })
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }
    getDataEpisode();

    function sortSeasonsFunction(){
        let temp = []
        for (let i =0; i<dataAPI.data.length; i++){
            let seasonCode = dataAPI.data[i].episode.split("E")[0]
            if(!temp.includes(seasonCode)){
                temp.push(seasonCode)
            }
        }
        console.log(temp)
        sortedSeasons.seasons = temp
    }

    function switchSeason(seasonNumber){
        let temp = []
        for (let i =0; i<dataAPI.data.length; i++){
            if(seasonNumber === "All"){
                console.log(dataAPI.data[i].episode)
                temp.push(dataAPI.data[i])
            }
            if(dataAPI.data[i].episode.includes(seasonNumber)){
                console.log(dataAPI.data[i].episode)
                temp.push(dataAPI.data[i])
            }
        }
        currentSeasonSelected.episodes = temp
    }



    watch(dataAPI, (oldDataAPI, newDataAPI)=>{
        sortSeasonsFunction()
        switchSeason("All")
    })
    

    
</script>

<style>
</style>