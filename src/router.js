import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: require('./components/Home').default
	}
];


const games = require('./games').default;

for (let gameIndex in games) {
	const game = games[gameIndex];

	routes.push({
		path: '/calculator',
		name: game.routeName,
		component: require('./components/Calculator').default,
		meta: {
			name: game.name,
			levels: game.levels
		}
	});
}

export default new VueRouter({
	routes
});


