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
	<div>
		<h1 class="heading">{heading}</h1>
		<h2 class="subheading">{subheading}</h2>
	</div>
	<div>
		<p class="metadata">
			<span class="metadata-label">Completed at:</span><span>{completedDate}</span>
		</p>
		<p class="metadata">
			<span class="metadata-label">Prompt by:</span>
			<a href="https://www.adventofcss.com/" class="external-link" target="_blank" rel="noreferrer"
				>Advent of CSS</a
			>
		</p>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Toto:wght@400;700&display=swap');

	:global(body) {
		font-family: 'Noto Serif Toto', serif;
	}

	.header {
		margin-top: 60px;

		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 24px;
	}

	.header > div {
		flex: 1;
		height: 72px;

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.header > div > * {
		margin: 4px 0;
	}

	.header > div:first-child {
		text-align: right;
		border-right: 1px solid #dedede;
		padding: 0 24px;
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
		color: #525252;
	}

	.metadata {
		font-weight: 400;
		font-size: 12px;
		line-height: 10px;
		color: #525252;

		display: flex;
	}

	.metadata > *:first-child {
		flex: 1;
		font-weight: 700;
	}

	.metadata > *:last-child {
		flex: 1;
	}

	.external-link::after {
		content: '';
		background-image: url('$lib/assets/external-link.png');
		display: inline-block;
		height: 1em;
		width: 1em;
		vertical-align: bottom;
		background-size: 1em;
		background-repeat: no-repeat;
		margin-left: 0.25em;
	}

	@media screen and (min-width: 480px) {
		.metadata > *:last-child {
			flex: 2;
		}
	}

	@media screen and (min-width: 768px) {
		.metadata > *:last-child {
			flex: 3;
		}
	}

	@media screen and (min-width: 1024px) {
		.metadata > *:last-child {
			flex: 5;
		}
	}
</style>
