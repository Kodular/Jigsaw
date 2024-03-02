<script setup lang="ts">
import Card from 'primevue/card';
</script>

<template>
    <p>Your Projects</p>
    <div v-for="n in 3">
        <RouterLink to="/project">
            <Card>
                <template #title>Simple Card</template>
                <template #content>
                    <p class="m-0">
                        Project {{ n }}
                    </p>
                </template>
            </Card>
        </RouterLink>
    </div>
</template>
