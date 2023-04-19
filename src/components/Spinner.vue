<template>
<div class="loading-bg">
    <div class="loading">
    </div>
    <p class="fw-bolder mt-4">Loading...</p>
</div>
</template>
<script>
export default {
    name: 'Spinner',
}
</script>
<style>

    .loading-bg {
        display: flex;
        background: rgba(255,255,255, 0.1);
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .loading{
        display: flex;
        justify-content: center;
        z-index: 9999;
    }
    .loading::after {
        content: '';
        width: 80px;
        height: 80px;
        border: 5px solid #fff;
        border-top-color: var(--blue-primary-color);
        border-radius: 50%;
        animation: loading 1s ease infinite;
    }
    
    .loading-bg p {
        animation: loadingText 1s ease infinite;
    }
    @keyframes loading {
        to{
            transform: rotate(1turn);
        }
    }

    @keyframes loadingText {
	0% {
		transform: scale(0.95);
	}

	70% {
		transform: scale(1);
	}

	100% {
		transform: scale(0.95);
	}
    }

</style>