<template>
  <router-link :to="{ path: `/jobdetail/${row.jobId}` }">
    Detail
  </router-link>
</template>

<script>
  export default {
    props: ['row']
  }
</script>
