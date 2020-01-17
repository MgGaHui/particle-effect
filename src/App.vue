<template>
  <div id="app">
    <particle-effect></particle-effect>
  </div>
</template>

<script>
  // import ParticleEffect from '@/packages/index.js'
  export default {
    name: 'app',
    components: {
      // 'particle-effect': ParticleEffect.ParticleEffect
    },
    mounted() {
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
