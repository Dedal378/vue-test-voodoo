<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import axios from 'axios'
import BaseSearch from './components/BaseSearch.vue'
import BaseCard from './components/BaseCard.vue'

const link = import.meta.env.VITE_APP_LINK_API
const postsLimit = 30
let posts = ref([])
let users = ref([])
const userName = ref('')

const filteredUserByName = computed(() => {
  return posts.value.filter(user => {
    if (userName.value) {
      return user.author.toLowerCase().includes(userName.value.toLowerCase())
    }
    return posts.value
  })
})
const totalPostsNumber = computed(() => {
  return filteredUserByName.value.length
})

const getData = async(apiName = 'posts', limit = postsLimit) => {
  let { data } = await axios.get(`${ link }/${ apiName }?_limit=${ limit }`)

  if (apiName === 'posts') {
    posts.value = data
  } else if (apiName === 'users') {
    users.value = data
  }
}

const mergeArraysByName = () => {
  posts.value.filter(i1 =>
    users.value.find(i2 => {
      if (i2.id === i1.userId) {
        i1.author = i2.name
      }
    })
  )
}

onBeforeMount(async () => {
  await getData()
  await getData('users', 3)
  await mergeArraysByName()
})
</script>

<template>
  <b-container class="mt-5 mb-5">
    <b-row class="mb-5">
      <b-col class="d-flex justify-content-center">
        <BaseSearch v-model="userName" search />
      </b-col>
    </b-row>

    <b-row class="mb-2 justify-content-center text-uppercase fw-light">
      Total number of posts is
      <strong class="px-2 text-uppercase w-auto fw-bold">{{ posts.length }}</strong> by
      <strong class="px-2 text-uppercase w-auto fw-bold">{{ users.length }}</strong>
      authors.
    </b-row>
    <b-row
      v-if="userName && filteredUserByName.length > 0"
      class="px-1 justify-content-center text-center fw-light"
    >
      <small>
        Total number of posts
        <i class="px-2 text-uppercase w-auto">{{ userName }}</i>
        is<i class="px-2 text-uppercase w-auto">{{ totalPostsNumber }}</i>.
      </small>
    </b-row>
    <b-row
      v-if="filteredUserByName.length === 0"
      class="px-1 justify-content-center text-center fst-italic"
    >
      Nothing found. There are no posts to show.
    </b-row>

    <b-row
      class="mb-3 mt-5 d-flex flex-wrap container-fluid justify-content-center align-items-start"
    >
      <BaseCard
        v-for="(post, idx) in filteredUserByName"
        :key="idx"
        :author="post.author"
        :post="post.body"
        :title="post.title"
        class="m-2"
      />
    </b-row>
  </b-container>
</template>
