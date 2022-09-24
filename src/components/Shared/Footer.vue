<script setup>
import { ref } from 'vue';

const content = ref([
  'Seslendirme ve Alt Yazı',
  'Medya Merkezi',
  'Gizlilik',
  'Bize Ulaşın',
]);
const socialMedia = ref([
  'bxl-facebook',
  'bxl-instagram',
  'bxl-twitter',
  'bxl-youtube',
]);
</script>
<template>
  <div class="footer">
    <div class="footer-grid">
      <div class="footer-column" v-for="footer in 4" :key="footer">
        <ul>
          <li v-for="contents in content" :key="contents">
            <a href="#">{{ contents }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="social-media">
      <ul>
        <li v-for="socialMedias in socialMedia" :key="socialMedias">
          <a href="#"><i :class="`bx ${socialMedias}`"></i></a>
        </li>
      </ul>
    </div>
  </div>
</template>
