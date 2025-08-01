<script lang="ts">
  let props = $props();
</script>

{#if props.loading}
  <div
    class="fixed inset-0 flex flex-col items-center justify-center glass-black backdrop-blur-lg z-50"
    style="--loader-color: var(--color-primary-white);"
  >
    <div class="relative w-[132px] h-6">
      <!-- Línea base -->
      <div
        class="absolute top-1/2 left-0 w-full h-0.5 blur-sm"
        style="background-color: var(--loader-color); opacity: 0.1;"
      ></div>

      <!-- Línea animada con gradiente dinámico -->
      <div
        class="absolute top-1/2 left-0 w-full h-0.5 animate-gradient-flow"
        style="
          background: linear-gradient(
            to right,
            transparent,
            var(--loader-color),
            transparent
          );
        "
      ></div>

      <!-- Puntos -->
      <div
        class="absolute top-1/2 left-0 flex w-full justify-between -translate-y-1/2"
      >
        {#each Array.from({ length: 5 }) as _, i}
          <div
            class="relative w-4 h-4 rounded-full animate-loader-glow"
            style="background-color: color-mix(in srgb, var(--loader-color) 30%, transparent); animation-delay: {i * 300}ms"
          >
            <div
              class="absolute inset-0 rounded-full blur-md"
              style="background-color: var(--loader-color); opacity: 0.3;"
            ></div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Texto -->
    <p
      class="mt-8 font-mono text-lg tracking-widest flex"
      style="color: var(--loader-color);"
    >
      {#each Array.from('Cargando...') as char, i}
        <span class="animate-letter-glow" style="animation-delay: {i * 120}ms">
          {char}
        </span>
      {/each}
    </p>
  </div>
{/if}

<style>
  @keyframes loader-glow {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.4);
    }
  }

  .animate-loader-glow {
    animation: loader-glow 1.5s ease-in-out infinite;
  }

  @keyframes gradient-flow {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  .animate-gradient-flow {
    background-size: 200% auto;
    animation: gradient-flow 2.5s linear infinite;
  }

  @keyframes letter-glow {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  .animate-letter-glow {
    animation: letter-glow 1.8s ease-in-out infinite;
    display: inline-block;
  }
</style>
