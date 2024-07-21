<template>
    <div class="w-full flex z-10 p-2 px-4 justify-between
    from-[rgb(23,128,64,0.24)] from-[20%] to-[rgb(23,128,64,0.24)] to-[80%]
    via-[rgb(186,213,79,0.24)] bg-gradient-to-r"
    :class="hideShadow? '' : 'shadow-[0px_0px_3px_3px] shadow-[rgb(3,28,26,50%)]'"
    >
        <router-link to="/">
            <img 
            class="min-w-16 min-h-16 max-w-16 max-h-16 -mt-1 -ml-1 animatedClass" 
            :class="activePage === 'home' ? 'animatedClass' : ''"
            src="../../public/portal-rick-and-morty.gif"></img>
        </router-link>
        
        <div class="flex justify-center items-center gap-4 font-merrisans sm:text-[16px] text-[14px] text-[rgba(3,28,26,0.50)] font-medium">
            <router-link 
            class="hover:text-[rgba(3,28,26,0.75)]"
            :class="activePage === 'episodes' ? 'text-[rgba(3,28,26,1)] hover:text-[rgba(3,28,26,1)]' : ''"
            to="/episodes">Episodes</router-link>
            <router-link 
            class="hover:text-[rgba(3,28,26,0.75)]"
            :class="activePage === 'characters' ? 'text-[rgba(3,28,26,1)] hover:text-[rgba(3,28,26,1)]' : ''"
            to="/characters">Characters</router-link>
            <router-link 
            class="hover:text-[rgba(3,28,26,0.75)]"
            :class="activePage === 'locations' ? 'text-[rgba(3,28,26,1)] hover:text-[rgba(3,28,26,1)]' : ''"
            to="/locations">Locations</router-link>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(["activePage","hideShadow"])
    console.log(props)

</script>

<style scoped>
.animatedClass{
    animation: none;
}
.animatedClass:hover{
    animation: 1s ease-in-out infinite weirdZooms;
}
@keyframes weirdZooms {
    0%{scale: 1;}
    50%{scale: 0.85;}
    100%{scale: 1;}
}
</style>