<script lang="ts" module>
  import { toaster, addToast } from "$lib/stores/toast";
  import { fly } from "svelte/transition";
  import { clsx } from "clsx";
</script>

<script lang="ts">
  $effect(() => {
    toaster.toasts;

    if (toaster.toasts.length === 1 && toaster.toasts[0].id !== "0") {
      setTimeout(() => {
        addToast({
          id: "0",
          data: {
            title: "",
            description: "",
            state: "info",
          },
        });
      }, 100);
    }
  });
</script>

<div
  {...toaster.root}
  class="fixed bottom-6 right-6 z-50 flex flex-col w-screen bg-transparent overflow-hidden"
>
  {#each toaster.toasts as toast, i (toast.id)}
    <div
      {...toast.content}
      in:fly={{ x: 50, duration: 250 }}
      out:fly={{ x: 50, duration: 250 }}
      role="alert"
      tabindex="-1"
      style="--i: {i}; z-index: {100 - i};"
      class={clsx(
        "toast",
        toast.id === "0"
          ? "opacity-0 scale-95 pointer-events-none h-0 overflow-hidden px-0.5 py-2"
          : "scale-100 ml-3 mt-3 px-4 py-3 backdrop-blur-lg linear-gr bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
        "gradient-bg-" + toast.data.state
      )}
    >
      {#if toast.id != "0"}
        <div class="flex gap-3 items-center">
          <div class="flex-1">
            <h3
              {...toast.title}
              class="text-base text-gray-900 dark:text-white font-extrabold"
            >
              {toast.data.title}
            </h3>
            <div
              {...toast.description}
              class="text-xs text-gray-700 dark:text-gray-200 font-semibold"
            >
              {toast.data.description}
            </div>
          </div>
          <button
            {...toast.close}
            aria-label="dismiss toast"
            class="mt-0.5 bg-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-100"
          >
            ✕
          </button>
        </div>
      {:else}
        <div class="h-[68px] opacity-0"></div>
      {/if}
    </div>
  {/each}
</div>

<style scoped>
  .toast {
    position: relative;
    display: flex;
    width: 25%;
    flex-direction: column;
    justify-content: center;
    gap: 0.25rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    color: black;
    text-align: left;
    transform: translateZ(0);
  }

  .toast:hover,
  .toast:focus-within {
    transform: scale(1.02);
  }
</style>
