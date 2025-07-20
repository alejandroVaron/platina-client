<script lang="ts">
  let props = $props();
</script>

{#if props.loading}
  <!-- <div class="fixed flex justify-center items-center h-screen w-screen bg-transparent" > -->
  <div
    class="fixed inset-0 bg-white/20 backdrop-blur-xs flex justify-center items-center"
  >
    <div>
      <video
        src="/videos/loading-icon.webm"
        autoplay
        loop
        muted
        playsinline
        class="w-75 h-75 drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] opacity-80"
      ></video>
      <h2 class="m-auto w-max -translate-y-15 text-3xl text-gray-400 font-bold">Cargando...</h2>
    </div>
    <!-- </div> -->
  </div>
{/if}
