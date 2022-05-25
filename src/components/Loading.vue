<template>
  <div class="ademilter">
    <div class="netflix"></div>
    <div class="race-by"></div>
  </div>
</template>

<style scoped>
.race-by {
  --uib-size: 200px;
  --uib-speed: 1.4s;
  --uib-color: #b1060e;
  --uib-line-weight: 10px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--uib-line-weight);
  width: var(--uib-size);
  border-radius: calc(var(--uib-line-weight) / 2);
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}

.race-by::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--uib-color);
  opacity: 0.1;
}

.race-by::after {
  content: '';
  height: 100%;
  width: 100%;
  border-radius: calc(var(--uib-line-weight) / 2);
  animation: raceBy var(--uib-speed) ease-in-out infinite;
  transform: translateX(-100%);
  background-color: var(--uib-color);
}

@keyframes raceBy {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.ademilter {
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  gap: 3em;
  align-items: center;
  justify-content: center;
}
.netflix {
  width: 140px;
  height: 250px;
  position: relative;
  background: linear-gradient(
    90deg,
    #b1060e 0,
    #b1060e 50px,
    transparent 50px,
    transparent 90px,
    #b1060e 90px,
    #b1060e 140px
  );
}

.netflix::before,
.netflix::after {
  content: '';
  display: block;
  position: absolute;
}

.netflix::before {
  width: 50px;
  height: 250px;
  top: 0;
  left: 45px;
  background-color: #e50914;
  transform: skewX(19.6deg);
  box-shadow: 0 0 30px black;
}

.netflix::after {
  width: 190px;
  height: 25px;
  top: 245px;
  left: -25px;
  border-radius: 50%;
  background-color: black;
}
</style>
