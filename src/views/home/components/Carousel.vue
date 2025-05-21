<template>
  <div class="carousel">
    <div class="carousel-inner">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="carousel-slide"
        :class="{ active: currentSlide === index }"
      >
        <img :src="slide.image" :alt="slide.alt" />
      </div>
    </div>
    <div class="carousel-indicators">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="carousel-indicator"
        :class="{ active: currentSlide === index }"
        @click="setSlide(index)"
      ></div>
    </div>
    <div class="carousel-controls">
      <button class="carousel-control prev" @click="prevSlide">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="carousel-control next" @click="nextSlide">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";

// 轮播图数据
const slides = reactive([
  { image: "/image/swiper1.jpg", alt: "轮播图1" },
  { image: "/image/swiper2.jpg", alt: "轮播图2" },
  { image: "/image/swiper3.jpg", alt: "轮播图3" },
]);

const currentSlide = ref(0);
let slideInterval = null;

// 轮播图控制函数
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const setSlide = (index) => {
  currentSlide.value = index;
};

// 自动轮播
const startSlideShow = () => {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 3000);
};

onMounted(() => {
  startSlideShow();
});

onBeforeUnmount(() => {
  clearInterval(slideInterval);
});
</script>

<style scoped>
/* 轮播图 */
.carousel {
  position: relative;
  height: 300px;
  margin: 20px 0;
  overflow: hidden;
  border-radius: 8px;
}

.carousel-inner {
  height: 100%;
  position: relative;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.carousel-indicator {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
}

.carousel-indicator.active {
  background: white;
}

.carousel-controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.carousel-control {
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s;
}

.carousel-control:hover {
  background: rgba(0, 0, 0, 0.5);
}
</style>
