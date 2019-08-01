import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Calculator from './components/Calculator'
import games from './games';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	}
];


for (let gameIndex in games) {
	const game = games[gameIndex];

	routes.push({
		path: '/calculator',
		name: game.routeName,
		component: Calculator,
		meta: {
			name: game.name,
			levels: game.levels
		}
	});
}

export default new VueRouter({
	routes
});


