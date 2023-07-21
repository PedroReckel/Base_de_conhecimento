<template>
    <div class="article-item">
        <router-link :to="{ name: 'articleById', params: { id: article.id } }">
            <div class="article-item-image d-none d-sm-block">
                <img v-if="article.imageUrl" :src="article.imageUrl" height="150" width="150" alt="Article">
                <img v-else src="@/assets/article.png" height="150" width="150" alt="Article">
            </div>
            <div class="article-item-info">
                <h2>{{ article.name }}</h2>
                <p>{{ article.description }}</p>
                <span class="article-item-author">
                    <strong>Autor: </strong>{{ article.author }}
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>

import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
 
export default {
    name: 'ArticleItem',
    props: ['article']
}

</script>

<style>

</style>