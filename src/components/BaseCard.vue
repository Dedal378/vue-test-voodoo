<script lang="ts" setup>
import { BCardText } from 'bootstrap-vue-3'

defineProps({
  post: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <b-card
    :header="title"
    header-bg-variant="white"
    header-text-variant="primary"
    style="max-width: 18rem"
    class="d-flex align-items-around justify-content-between"
  >
    <b-card-text>{{ post }}</b-card-text>
    <b-card-text class="text-secondary fw-lighter">{{ author }}</b-card-text>
  </b-card>
</template>
