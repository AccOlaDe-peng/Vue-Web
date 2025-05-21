<template>
  <div class="home-page">
    <Header />

    <!-- 轮播图 -->
    <Carousel />

    <!-- 分类导航 -->
    <CategoryNav />

    <!-- 促销区域 -->
    <PromoSection />

    <!-- 热门商品 -->
    <ProductSection
      title="热门商品"
      moreLink="/category?sort=popular"
      :products="hotProducts"
    />

    <!-- 新品上市 -->
    <ProductSection
      title="新品上市"
      moreLink="/category?sort=new"
      :products="newProducts"
    />

    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Carousel from "./components/Carousel.vue";
import CategoryNav from "./components/CategoryNav.vue";
import PromoSection from "./components/PromoSection.vue";
import ProductSection from "./components/ProductSection.vue";
import { hotProducts, newProducts } from "./data/homeData";
</script>

<style scoped>
.home-page {
  width: 100%;
}
</style>
