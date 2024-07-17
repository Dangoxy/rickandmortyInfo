import {createRouter, createWebHashHistory} from "vue-router"
import App from "./App.vue"
import Homepage from "./views/Homepage.vue"
import Episodespage from "./views/Episodespage.vue"
import Characterspage from "./views/Characterspage.vue"
import Locationspage from "./views/Locationspage.vue"
import SelectedEpisodePage from "./views/SelectedEpisodePage.vue"
import SelectedLocationPage from "./views/SelectedLocationPage.vue"

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path:"/", component: Homepage},
        {path:"/episodes", component: Episodespage},
        {path:"/characters", component: Characterspage},
        {path:"/locations", component: Locationspage},
        {path:"/locations/:id", component: SelectedLocationPage},
        {path:"/episodes/:id", component: SelectedEpisodePage},
    ]
})
export default router