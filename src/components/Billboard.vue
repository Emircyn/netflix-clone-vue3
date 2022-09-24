<script setup></script>
<template>
  <div class="billboard">
    <div class="billboard-content">
      <h1>mainStore.tv.name</h1>
      <h2>mainStore.tv.tagline</h2>
      <p>mainStore.tv.overview.slice(0, 200)</p>

      <h1>mainStore.tv.name</h1>

      <div class="billboard-buttons">
        <button class="button button-white margin-r-05">
          <span> <i class="bx bxs-right-arrow"></i>&nbsp;Oynat</span>
        </button>
        <RouterLink :to="`/tv/11`">
          <button class="button button-gray margin-r-05">
            <i class="bx bx-info-circle"></i>&nbsp;Daha fazlası
          </button></RouterLink
        >
        <button class="button button-gray margin-r-05">
          <i class="bx bx-volume-mute"></i>
        </button>
        <button class="button button-gray">
          <i class="bx bx-refresh"></i>
        </button>
      </div>
    </div>
    <div class="billboard-overlay"></div>
  </div>
</template>
<style scoped>
.tooltip {
  opacity: 0;
  transform: translateY(-30px) scale(0.96);
  transition: transform 0.35s, opacity 0.25s;
}

.tooltip-show {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition: transform 0.35s, opacity 1s;
}
.line-wobble {
  --uib-size: 80px;
  --uib-speed: 1.75s;
  --uib-color: black;
  --uib-line-weight: 5px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--uib-line-weight);
  width: 100%;
  border-radius: calc(var(--uib-line-weight) / 2);
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.line-wobble::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--uib-color);
  opacity: 0.1;
}

.line-wobble::after {
  content: '';
  height: 100%;
  width: 100%;
  border-radius: calc(var(--uib-line-weight) / 2);
  animation: wobble var(--uib-speed) ease-in-out infinite;
  transform: translateX(-95%);
  background-color: var(--uib-color);
}

@keyframes wobble {
  0%,
  100% {
    transform: translateX(-95%);
  }
  50% {
    transform: translateX(95%);
  }
}
</style>
