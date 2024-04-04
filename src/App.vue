<template>
  <Toast/>
  <DynamicDialog />
  <ConfirmDialog />
  <router-view></router-view>
</template>

<script setup>
import Toast from 'primevue/toast';
import DynamicDialog from "primevue/dynamicdialog";
import ConfirmDialog from "primevue/confirmdialog";
</script>

<style>
html {
  font-size: 12px;
  font-family: 'Inter Variable', sans-serif;
}
</style>