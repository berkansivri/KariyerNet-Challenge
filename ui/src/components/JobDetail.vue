<template>
  <i-col span="12">
    <Button icon="md-arrow-round-back" type="primary" @click="$router.go(-1)">Back</Button>
    <Card>
      <p class="text-center" slot="title">Job Details</p>
      <List size="small" border>
        <ListItem v-for="([field, value], index) in Object.entries(details)" :key="index">{{ field }} - {{ value }}</ListItem>
      </List>
    </Card>
  </i-col>
</template>

<script>
export default {
  data() {
    return {
      details: {}
    }
  },
  created() {
    this.getJobDetail(this.$route.params.id)
  },
  methods: {
    async getJobDetail(jobId) {
      const response = await this.$http.get(`jobDetail/${jobId}`)
      this.details = response.data.result
    }
  }
}
</script>

<style>

</style>
