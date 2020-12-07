<template>
	<div id="app">
		<router-view v-if="$route.meta && $route.meta.noKeepAlive"></router-view>
		<keep-alive>
			<router-view v-if="!$route.meta || !$route.meta.noKeepAlive"></router-view>
		</keep-alive>
	</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
