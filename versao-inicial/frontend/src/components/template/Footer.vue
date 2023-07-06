<template>
	<footer class="footer">
        <span>Copyright <strong>Pedro Reckel Roberte</strong> © 2023</span>
    </footer>
</template>

<script>
export default {
	name: "Footer",
}
</script>

<style>
    .footer {
        grid-area: footer;
        background: #DDD;
        
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 10px;
    }
</style>