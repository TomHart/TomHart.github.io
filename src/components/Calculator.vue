<template>
	<div class="container">

		<h1>{{name}}</h1>

		<b-container class="bv-example-row">
		</b-container>
		<b-container class="bv-example-row">
			<b-row>
				<b-col>
					<b-input-group>
						<b-input-group-text slot="prepend">Currently Have</b-input-group-text>
						<b-form-input type="number" v-model="fromVal"></b-form-input>
						<b-form-select style="width:auto;flex-grow:0" v-model="fromUnit" :options="levels">

						</b-form-select>
					</b-input-group>
				</b-col>
				<b-col>

					<b-input-group>
						<b-input-group-text slot="prepend">Need</b-input-group-text>
						<b-form-input type="number" v-model="toVal"></b-form-input>
						<b-form-select style="width:auto;flex-grow:0" v-model="toUnit" :options="levels">

						</b-form-select>
					</b-input-group>
				</b-col>
				<b-col>
					<b-input-group>
						<b-input-group-text slot="prepend">Per second</b-input-group-text>
						<b-form-input type="number" v-model="perSecVal"></b-form-input>
						<b-form-select style="width:auto;flex-grow:0" v-model="perSecUnit" :options="levels">

						</b-form-select>
					</b-input-group>
				</b-col>
			</b-row>
			<br/>
			<b-row>

				<b-col>

					<b-input-group>
						<b-input-group-text slot="prepend">Crit Chance</b-input-group-text>
						<b-form-input type="number" v-model="critChance"></b-form-input>
						<b-input-group-text slot="append">%</b-input-group-text>
					</b-input-group>
				</b-col>

				<b-col>
					<b-input-group>
						<b-input-group-text slot="prepend">Crit Bonus</b-input-group-text>
						<b-form-input type="number" v-model="critBonus"></b-form-input>
					</b-input-group>
				</b-col>

			</b-row>
		</b-container>

		<p v-if="seconds > 0">It will take {{secondsToStr}} to reach your goal</p>
		<p v-else-if="seconds <= 0">
			Target reached!
		</p>
		<p v-else>
			Unable to determine how long your goal will take.
		</p>
	</div>
</template>

<script>
	import moment from 'moment'

	export default {
		name: "Calculator",

		data() {
			return {
				fromVal: 1,
				fromUnit: '.00',
				toVal: 1,
				toUnit: '.00',
				perSecVal: 1,
				perSecUnit: '.00',
				critChance: 0,
				critBonus: 1
			}
		},

		computed: {
			name() {
				return this.$router.currentRoute.meta.name;
			},

			levels() {
				return this.$router.currentRoute.meta.levels;
			},

			seconds() {

				// How many do we currently have?
				let currNum = Math.pow(1000, this.$router.currentRoute.meta.levels.indexOf(this.fromUnit)) * this.fromVal;

				// How much does the number we have increase per second?
				const secNum = Math.pow(1000, this.$router.currentRoute.meta.levels.indexOf(this.perSecUnit)) * this.perSecVal;

				// What's the raw number we need to get to?
				const toNum = Math.pow(1000, this.$router.currentRoute.meta.levels.indexOf(this.toUnit)) * this.toVal;


				let tmpRequired = toNum - currNum;
				let seconds = 0;

				while (tmpRequired > 0) {
					seconds++;
					let perSec = secNum;

					const rand = Math.floor(Math.random() * 100) + 1;

					if (rand <= this.critChance) {
						perSec *= this.critBonus;
					}

					tmpRequired -= perSec;
				}

				return seconds * 1000;
			},

			secondsToStr() {
				const duration = moment.duration(this.seconds);
				let years = duration.years(),
					days = duration.days(),
					hrs = duration.hours(),
					mins = duration.minutes(),
					secs = duration.seconds();

				let str = [];
				if (years) {
					str.push(years + ' years');
				}

				if (days) {
					str.push(days + ' days');
				}

				if (hrs) {
					str.push(hrs + ' hours');
				}

				if (mins) {
					str.push(mins + ' minutes');
				}

				if (secs) {
					str.push(secs + ' seconds');
				}

				return str.join(', ');
			}
		},

		methods: {
			recompute() {

			}
		}
	}
</script>

<style scoped>

</style>