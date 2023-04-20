import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import "@/assets/css/styles.css"
import store from "./store/index"
import Table from "./components/Table/Table.vue";
import LineChart from "./components/Charts/LineChart.vue";
import BarChart from "./components/Charts/BarChart.vue";
import PieChart from "./components/Charts/PieChart.vue";
import AreaChart from "./components/Charts/AreaChart.vue";
import SetupedValue from "./components/DashboardComponents/SetupedValue.vue"
import setGoogleApi from './google.js'


const app = createApp(App);
app.use(store)
app.use(i18n)
app.use(router)
app.component('Table',Table)
app.component('LineChart', LineChart)
app.component('BarChart', BarChart)
app.component('PieChart', PieChart)
app.component('AreaChart', AreaChart)
app.component('SetupedValue', SetupedValue)
//app.use(VueApexCharts)
setGoogleApi(app)
app.mount('#app')
