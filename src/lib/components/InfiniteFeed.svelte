<script lang="ts">
  import { onMount } from "svelte";
  import { fetcher } from "$lib/utils/fetcher";
  import type { Snippet } from "svelte";

  type AnyItem = Record<string, unknown>;

  let {
    data,
    endpoint,
    body = {},
    limit,
    align_items = true,
    total = $bindable(),
  } = $props<{
    data: Snippet<[{ id: number; data?: any }]>;
    endpoint: string;
    body?: any;
    limit: number;
    align_items?: boolean;
    total?: number;
  }>();

  const state = $state({
    items: [] as AnyItem[],
    rBody: {},
    page: 0,
    loading: false,
    finished: false,
  });

  let sentinel: HTMLDivElement;

  async function loadMore() {
    if (state.loading || state.finished) return;
    state.loading = true;

    try {
      const res = await fetcher(endpoint, {
        method: "GET",
        body: { page: state.page, limit: limit, ...body },
      }).then((response: any) => response.data);

      if (res.total) {
        total = res.total;
      }
      const data: any = res.data ? res.data : res;

      if (data.length === 0) {
        state.finished = true;
      } else {
        state.items = [...state.items, ...data];
        state.page++;
      }
    } catch (err) {
      console.error("Error al cargar más:", err);
    }

    state.loading = false;
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  });
</script>

<div class="flex flex-col w-full" class:items-center={align_items}>
  {#each state.items as item (item.id)}
    {#if data}
      {@render data({ id: item.id, data: item.data })}
    {/if}
  {/each}

  {#if state.loading}
    <div class="text-center text-sm text-gray-400">Cargando más...</div>
  {/if}

  {#if state.finished}
    <div class="text-center text-sm text-gray-400">No hay más contenido.</div>
  {/if}

  <div bind:this={sentinel} class="h-1"></div>
</div>

<style scoped>
</style>
