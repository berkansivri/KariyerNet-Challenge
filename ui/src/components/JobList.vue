<template>
  <Card shadow>
    <Select prefix="ios-search" filterable multiple placeholder="Search by location" style="width:300px" @on-change="citySelected">
      <Option v-for="item in cityList" :value="item" :key="item">{{ item }}</Option>
    </Select>
    <Input class="float-right" placeholder="Search for all fields" prefix="ios-search" @on-change="onSearch($event.target.value.trim())" style="width:300px"/>
    <!-- RGrid is 'our' open source datatable for Vue.js (https://github.com/Sarpilhan/RGrid/graphs/contributors) -->
    <RGrid :columns="tableColumns" :tableClass="tableClass" :isResponsive="true" 
           :dataset="filteredList" :total="total" showToolbar clientside/>
  </Card>
</template>

<script>

import DetailLink from './grid/DetailLink'

export default {
  data() {
    return {
      tableColumns: [
        { title: "Id", field: "jobId", visible: false },
        { title: "Position", field: "positionName", filter:"String", visible: true, sortable: true },
        { title: "Company", field: "companyName", visible: true, sortable: true },
        { title: "Duration", field: "durationDay", visible: true, sortable: true },
        { title: "DayText", field: "durationDayText", visible: true },
        { title: "Logo", field: "imageUrl", visible: false },
        { title: "Distance", field: "distance", visible: true, sortable: true },
        { title: "Latitude", field: "latitude", visible: false },
        { title: "Longitude", field: "longitude", visible: false },
        { title: "City", field: "cityName", visible: true, sortable: true },
        { title: "Town", field: "townName", visible: true, sortable: true },
        { title: "#", comp: DetailLink, visible: true },
      ],
      tableClass: "table-striped table-bordered table-sm",
      jobList: [],
      total: 0,
      filteredList: [],
      cityList: []
    }
  },
  computed: {
    visibleFields() {
      return this.tableColumns.filter(c => c.visible).map(c => c.field)
    }
  },
  created() {
    this.getJobList()
  },
  methods: {
    async getJobList() {
      const response = await this.$http.get('jobList')
      this.jobList = response.data.result.items
      this.total = response.data.result.total
      this.filteredList = this.jobList
      this.cityList = [...new Set(this.jobList.map(x => x.cityName))]
    },
    citySelected(cities) {
      if(cities.length) {
        this.filteredList = this.jobList.filter(j => cities.some(c => c.toLocaleLowerCase() === j.cityName.toLocaleLowerCase()))
      } else {
        this.filteredList = this.jobList
      }
    },
    onSearch(text) {
      if(text) {
        this.filteredList = this.jobList.filter(job => 
          Object.entries(job).some(([field, value]) => 
            this.visibleFields.includes(field) && value && value.toLocaleLowerCase().includes(text.toLocaleLowerCase())
          )
        )
      } else {
        this.filteredList = this.jobList 
      }
    }
  }
}
</script>

<style>

</style>
