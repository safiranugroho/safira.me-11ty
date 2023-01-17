<script>
	/**
	 * @type {string}
	 */
	export let heading;
	/**
	 * @type {string}
	 */
	export let subheading;
	/**
	 * @type {string}
	 */
	export let completedDate;
</script>

<div class="header">
	<h1 class="heading">{heading}</h1>
	<h2 class="subheading">{subheading}</h2>
	<p class="date">{completedDate}</p>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Toto:wght@400;700&display=swap');

	:global(body) {
		font-family: 'Noto Serif Toto', serif;
	}

	.heading {
		font-weight: 700;
		font-size: 20px;
		line-height: 17px;
		font-style: italic;
		color: #242629;
	}

	.subheading {
		font-weight: 400;
		font-size: 14px;
		line-height: 12px;
		color: #525252;
	}

	.date {
		font-weight: 400;
		font-size: 12px;
		line-height: 10px;
		color: #525252;
	}

	.header {
		margin-top: 60px;
		text-align: center;
	}
</style>
