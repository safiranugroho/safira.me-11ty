<script>
	import Header from '$lib/Header.svelte';
	import dollarIcon from '$lib/assets/dollar.svg';
	import peopleIcon from '$lib/assets/people.svg';

	let billAmount = 0;
	let numberOfPeople = 0;
	$: totalPerPerson =
		billAmount > 0 && numberOfPeople > 0 ? (billAmount / numberOfPeople).toFixed(2) : 0.0;
</script>

<Header
	heading="Tip calculator"
	subheading="Input the bill amount and number of people, and select a tip percentage."
	completedDate="16 January 2023"
/>

<div class="content">
	<div class="bill">
		<div class="output">
			<span class="label">Tip amount</span>
			<p class="value"><span class="currency">$</span>4.02</p>
		</div>
		<div class="output">
			<span class="label">Total per person</span>
			<p class="value"><span class="currency">$</span>{totalPerPerson}</p>
		</div>
		<div class="inputs">
			<div class="bill-amount input">
				<div>
					<img alt="Dollar sign icon" src={dollarIcon} />
					<input type="number" id="bill-amount" maxlength="10" bind:value={billAmount} />
				</div>
				<label for="bill-amount">Bill amount</label>
			</div>
			<div class="number-of-people input">
				<div>
					<img alt="People icon" src={peopleIcon} />
					<input type="number" id="number-of-people" maxlength="10" bind:value={numberOfPeople} />
				</div>
				<label for="number-of-people">Number of people</label>
			</div>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;700&display=swap');

	:global(body) {
		display: grid;
		grid-template-rows: 1fr 3fr;
		background: #f6f6f3;
	}

	.content {
		font-family: 'Inter', sans-serif;
		padding: 16px;
		color: #333333;
	}

	.bill {
		background: #fff;
		border-radius: 20px;
		max-width: 768px;
		margin: auto;
	}

	.output {
		display: flex;
		padding: 40px 0;
	}

	.output:first-child {
		border-bottom: 1px solid #dedede;
		margin: 0 8px;
	}

	.label {
		flex: 1;

		font-family: 'Roboto Mono', sans-serif;
		font-weight: 700;
		line-height: 90px;

		text-align: right;
		padding-right: 34px;
	}

	.currency {
		font-size: 54px;
		vertical-align: text-top;
	}

	.value {
		flex: 2;

		font-weight: 700;
		font-size: 82px;
		line-height: 82px;

		margin: 0;
	}

	.inputs {
		background: #f7f7f7;
		border-radius: 20px;

		display: flex;

		max-width: inherit;
	}

	.input {
		display: flex;
		flex-direction: column;
		padding: 56px 48px;

		text-align: center;
	}

	.input > div {
		display: flex;
		align-items: center;
		border-bottom: 3px dotted #b3b3b3;
	}

	.input > div > img {
		height: 42px;
	}

	.input > div > input {
		all: unset;
		font-size: 60px;
		font-weight: 700;
		width: 100%;
		line-height: 56px;
	}

	.input > label {
		font-family: 'Roboto Mono', sans-serif;
		font-weight: 700;
		font-size: 14px;
		line-height: 18px;

		margin-top: 12px;
	}

	.bill-amount {
		flex: 2;
		border-right: 1px solid #dedede;
	}

	.number-of-people {
		flex: 1.5;
	}
</style>
