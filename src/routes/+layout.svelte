<script>
  import "../app.css";
  import Toaster from "$lib/components/Toaster.svelte";
  import { fade } from "svelte/transition";

  let { children } = $props();

</script>

<Toaster />

<main in:fade={{ duration: 400 }} out:fade={{ duration: 200 }}>
  {@render children()}
</main>
