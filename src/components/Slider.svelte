<script>
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';

	dayjs.extend(duration);

	export let value = 0;
	export let max = 100;

	function convertSecondsWithDecimalsToMinutesAndSeconds(totalSeconds) {
		const duration = dayjs.duration(totalSeconds, 'seconds');
		const minutes = duration.minutes();
		const seconds = duration.seconds();

		return { minutes, seconds };
	}

	let convertedValue = convertSecondsWithDecimalsToMinutesAndSeconds(value);
	let convertedMax = convertSecondsWithDecimalsToMinutesAndSeconds(max);

	$: convertedValue = convertSecondsWithDecimalsToMinutesAndSeconds(value);
	$: convertedMax = convertSecondsWithDecimalsToMinutesAndSeconds(max);
</script>

<RangeSlider name="range-slider" class="w-[80vw]" bind:value {max} step={1}>
	<div class="flex justify-between items-center">
		<div class="font-bold">Video Time</div>
		{#if typeof convertedValue === 'object' && typeof convertedMax === 'object'}
			<div class="text-xs">
				{convertedValue.minutes}m {convertedValue.seconds}s / {convertedMax.minutes}m {convertedMax.seconds}s
			</div>
		{:else}
			<div class="text-xs">{value} / {max}</div>
		{/if}
	</div>
</RangeSlider>
