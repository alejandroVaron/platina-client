<script lang="ts">
  import { onMount } from "svelte";
  import { prueba1 } from "$lib/services/auth";

  let labelEmail = "";

  let email = "";
  let password = "";

  export let data: { msg?: string };

  onMount(async () => {
    if (data.msg) {
      alert(data.msg);
    }

    labelEmail = await prueba1();
  });

  function handleLogin() {
    alert(`Login`);
  }
</script>

<form on:submit|preventDefault={handleLogin}>
  <label>
    Email:
    <input type="email" bind:value={email} required />
  </label>
  <br />
  <label>
    Contraseña:
    <input type="password" bind:value={password} required />
  </label>
  <br />
  <button type="submit">Ingresar</button>
</form>
