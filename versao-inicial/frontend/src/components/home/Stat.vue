<template>
    <div class="stat">
        <div class="stat-icon">
            <i :class="icon" :style="style"></i>
        </div>
        <div class="stat-info">
            <span class="stat-tittle">{{ title }}</span>
            <span class="stat-tittle">{{ value }}</span>
        </div>
    </div>
</template>

<script>
export default {
	name: "Stat",
    props: ['title', 'value', 'icon', 'color'],
    computed: {
        style() {
            return "color: " + (this.color || "#000")
        }
    }
}
</script>

<style>
    .stat {
        flex: 1;  
        display: flex;
        border-radius: 8px;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: #fff;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .stat-icon {
        display: flex;
        align-items: center;
    }

    .stat-icon i {
        font-size: 5rem;
    }

    .stat-info { /* Quando eu coloco Flex = 1 significa que esse componente ele vai crescer dentro de um flex container (nesse caso a DIV de class STAT)*/
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .stat-tittle {
        font-size: 1.2rem;
    }
    
    .stat-value {
        font-size: 3rem;
    }
</style>