<template>
  <div id="app" class="mt-5">
    <Row>
      <i-col span="20" offset="2">
        <router-view></router-view>
      </i-col>
    </Row>
  </div>
</template>

<script>

export default {
  name: 'app',
  created() {
    this.$router.replace('joblist')
  }
}
</script>
