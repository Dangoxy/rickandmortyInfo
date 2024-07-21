<template>
    <div class="w-full h-full flex flex-col">

        
        <Navbar hideShadow="true" activePage="characters"></Navbar>
        
        <div class="
        from-[rgb(23,128,64,0.24)] from-[20%] to-[rgb(23,128,64,0.24)] to-[80%]
        via-[rgb(186,213,79,0.24)] bg-gradient-to-r 

        shadow-[0px_4px_4px_0px] shadow-[rgb(3,28,26,50%)] z-20

        p-2 px-4 justify-between border-t-[1px] border-[rgb(3,28,26,0.25)] flex items-center gap-4
        ">
            <h1 class="text-[40px] text-[#031C1A]">Characters</h1>
            
            <!-- pagination up -->
            <div class="justify-center items-center gap-2 md:flex hidden">
                <img src="../../public/rightArrowIcon.png" @click="getPrevPage" class="size-8"/>
                <div class="flex justify-center items-center gap-2">
                    <div
                    v-for="pagination in paginationForCharacters.pagination"
                    
                    class="flex justify-center items-center border-2 p-2 aspect-square size-8  rounded-[4px]"
                    :class="pagination.page === '...' ? 'border-none size-fit -m-2 bg-transparent' : pagination.active ? 'border-[#031C1A] text-[#F0F9E3] bg-[#031C1A]':'border-[#031C1A] text-[#031C1A] bg-transparent'"
                    
                    @click="pagination.page !=='...' && getPageWithIndex(pagination.page)"
                    >
                        <h1>{{ pagination.page }}</h1>
                    </div>
                </div>
                <img src="../../public/leftArrowIcon.png" @click="getNextPage" class="size-8"/>
            </div>
            <!-- pagination up -->

            <p v-if="dataAPI.info" class="text-[16px] text-[rgb(3,28,26,0.75)]">Total number of characters: <span class="text-[#031C1A]">{{ dataAPI.info.count }}</span></p>
        </div>
        
        

        <div 
        ref="ScrollableAreaForCharacterCards" 
        class="bg-[#F0F9E3] w-full h-full overflow-y-scroll p-4">

            <div class="hidden justify-center items-start w-full md:flex">
                <div 
                v-if="dataAPI.data"
                class="flex flex-wrap w-full gap-4 justify-center items-start">
                    <CharacterCard 
                    v-for="character in dataAPI.data"
                    :character="character"></CharacterCard>
                </div>
            </div>

            <div class="md:hidden justify-center items-start w-full flex">
                <div 
                v-if="dataAPI.data"
                class="flex flex-wrap w-full gap-4 justify-center items-start">
                    <CharacterCardVert 
                    v-for="character in dataAPI.data"
                    :character="character"></CharacterCardVert>
                </div>
            </div>

        </div>

        <!-- pagination down -->
        <div class="bg-[#F0F9E3] border-t-[2px] border-[#031C1A] border-opacity-25 flex justify-center items-center p-4 gap-2 md:hidden">
            <img src="../../public/rightArrowIcon.png" @click="getPrevPage" class="size-8"/>
            <div class="flex justify-center items-center gap-2">
                <div
                v-for="pagination in paginationForCharacters.pagination"
                
                class="flex justify-center items-center border-2 p-2 aspect-square size-8 rounded-[4px]"
                :class="pagination.page === '...' ? 'border-none size-fit -m-2' : pagination.active ? 'border-[#031C1A] text-[#F0F9E3] bg-[#031C1A]':'border-[#031C1A] text-[#031C1A] bg-[#F0F9E3]'"
                
                @click="pagination.page !=='...' && getPageWithIndex(pagination.page)"
                >
                    <h1>{{ pagination.page }}</h1>
                </div>
            </div>
            <img src="../../public/leftArrowIcon.png" @click="getNextPage" class="size-8"/>
        </div>
        <!-- pagination down -->

    </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue"
import CharacterCard from "../components/CharacterCard.vue"
import CharacterCardVert from "../components/CharacterCardVert.vue"
import axios from 'axios';
import {ref, reactive, watch} from "vue"

    let currentPage = ref(1)
    let apiUrl = `https://rickandmortyapi.com/api/character?page=${currentPage.value}`; // Replace with your API endpoint URL

    let dataAPI = reactive({data: null,info: null})
    let paginationForCharacters = reactive({pagination: []})

    const ScrollableAreaForCharacterCards = ref()
    

    /* console.log(dataAPI) */
    async function getData(){
        await axios.get(apiUrl)
        .then((response) => {
            dataAPI.data = response.data.results;
            dataAPI.info = response.data.info;
            /* console.log(response.data.results)
            console.log(response.data.info) */
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }
    
    function getNextPage(){
        
        if(currentPage.value < dataAPI.info.pages){
            
            console.log(dataAPI.info)
            apiUrl = dataAPI.info.next

            let currentPageTemp = Number(apiUrl.split("page=")[1])
            console.log(currentPage)
            currentPage.value = currentPageTemp

            getData()
        }
        
        
        ScrollableAreaForCharacterCards.value.scrollTop = 0
        
        
        
    }
    function getPrevPage(){
        if(currentPage.value > 1){
        
            console.log(dataAPI.info)
            apiUrl = dataAPI.info.prev

            let currentPageTemp = Number(apiUrl.split("page=")[1])
            console.log(currentPage-1)
            currentPage.value = currentPageTemp

            getData()
        }

        ScrollableAreaForCharacterCards.value.scrollTop = 0
    }
    function getPageWithIndex(index){
        currentPage.value = index
        apiUrl = `https://rickandmortyapi.com/api/character?page=${index}`
        console.log(apiUrl)
        getData()

        ScrollableAreaForCharacterCards.value.scrollTop = 0
    }

    getData();

    /* async function getDataLocation(){
        await axios.get("https://rickandmortyapi.com/api/location")
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }
    getDataLocation(); */

    function paginationForCharacterPagesFunction(){
        let tempArray = []

        if (currentPage.value === 1 && dataAPI.info){
            tempArray.push({page:1,active:true})
            tempArray.push({page:2,active:false})
            tempArray.push({page:3,active:false})
            tempArray.push({page:4,active:false})
            tempArray.push({page:5,active:false})
            tempArray.push({page:"...",active:false})
            tempArray.push({page:Number(dataAPI.info.pages),active:false})
        }
        else if (currentPage.value === 2 && dataAPI.info){
            tempArray.push({page:1,active:false})
            tempArray.push({page:2,active:true})
            tempArray.push({page:3,active:false})
            tempArray.push({page:4,active:false})
            tempArray.push({page:5,active:false})
            tempArray.push({page:"...",active:false})
            tempArray.push({page:Number(dataAPI.info.pages),active:false})
        }
        else if (currentPage.value === 3 && dataAPI.info){
            tempArray.push({page:1,active:false})
            tempArray.push({page:2,active:false})
            tempArray.push({page:3,active:true})
            tempArray.push({page:4,active:false})
            tempArray.push({page:5,active:false})
            tempArray.push({page:"...",active:false})
            tempArray.push({page:Number(dataAPI.info.pages),active:false})
        }

        else if (currentPage.value === dataAPI.info.pages-2 && dataAPI.info){
            tempArray.push({page:1,active:false})
            tempArray.push({page:"...",active:false})
            tempArray.push({page:Number(dataAPI.info.pages)-4,active:false})
            tempArray.push({page:Number(dataAPI.info.pages)-3,active:false})
            tempArray.push({page:Number(dataAPI.info.pages)-2,active:true})
            tempArray.push({page:Number(dataAPI.info.pages)-1,active:false})
            tempArray.push({page:Number(dataAPI.info.pages),active:false})
        }
        else if (currentPage.value === dataAPI.info.pages-1 && dataAPI.info){
            tempArray.push({page:1,active:false})
            tempArray.push({page:"...",active:false})
            tempArray.push({page:Number(dataAPI.info.pages)-4,active:false})
            tempArray.push({page:Number(dataAPI.info.pages)-3,active:false})
            tempArray.push({page:Number(dataAPI.info.pages)-2,active:false})
            tempArray.push({page:Number(dataAPI.info.pages)-1,active:true})
            tempArray.push({page:Number(dataAPI.info.pages),active:false})
        }
        else if (currentPage.value === dataAPI.info.pages && dataAPI.info){
            tempArray.push({page:1,active:false})
            tempArray.push({page:"...",active:false})
            tempArray.push({page:Number(dataAPI.info.pages)-4,active:false})
            tempArray.push({page:Number(dataAPI.info.pages)-3,active:false})
            tempArray.push({page:Number(dataAPI.info.pages)-2,active:false})
            tempArray.push({page:Number(dataAPI.info.pages)-1,active:false})
            tempArray.push({page:Number(dataAPI.info.pages),active:true})
        }

        else {
            tempArray.push({page:1,active:false})
            tempArray.push({page:"...",active:false})
            tempArray.push({page:currentPage.value-1,active:false})
            
            tempArray.push({page:currentPage.value,active:true})
            
            tempArray.push({page:currentPage.value+1,active:false})
            tempArray.push({page:"...",active:false})
            tempArray.push({page:Number(dataAPI.info.pages),active:false})
        }

        paginationForCharacters.pagination = tempArray
    }
    
    watch(dataAPI, async (newDataAPI, oldDataAPI) =>{
        if(oldDataAPI.data !== newDataAPI.data){
            paginationForCharacterPagesFunction()
            console.log(paginationForCharacters) 
        }
        paginationForCharacterPagesFunction()
        console.log(paginationForCharacters) 
        /* console.log(newDataAPI)
        console.log(oldDataAPI) */

    })

       
    
    

</script>

<style>
</style>