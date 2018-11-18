<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ampLogin/>
  </div>
</template>

<script>
import ampLogin from './components/ampLogin'

export default {
  name: 'App',
  components: {
    ampLogin
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
