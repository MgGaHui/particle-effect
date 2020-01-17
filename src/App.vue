<template>
  <div id="app">
    <particle-effect></particle-effect>
  </div>
</template>

<script>/**/
import ParticleEffect from '@/packages/particle-effect'

export default {
  name: 'app',
  components: {
    'particle-effect': ParticleEffect
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
