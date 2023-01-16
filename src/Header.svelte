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
	<h1>{heading}</h1>
	<h2>{subheading}</h2>
	<p>{completedDate}</p>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Toto:wght@400;700&display=swap');

	:global(body) {
		font-family: 'Noto Serif Toto', serif;
	}

	:global(h1) {
		font-weight: 700;
		font-size: 20px;
		line-height: 17px;
		font-style: italic;
		color: #525252;
	}

	:global(h2) {
		font-weight: 400;
		font-size: 14px;
		line-height: 12px;
		color: #525252;
	}

	:global(p) {
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
