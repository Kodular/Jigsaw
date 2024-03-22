<template>
  <Toast/>
  <DynamicDialog />
  <router-view></router-view>
</template>

<script setup>
import Toast from 'primevue/toast';
import DynamicDialog from "primevue/dynamicdialog";
</script>
