let vm = new Vue({
	el: '#app',
	data: {
		greeting: 'Hello '
	},
	mounted() {
		this.greeting += 'Gulp'
	}
})