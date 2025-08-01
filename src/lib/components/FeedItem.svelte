<script lang="ts">
  const { item } = $props<{ item: { id: number; title: string } }>();
</script>

<div class="bg-white p-4 rounded-xl shadow border">
  <h2 class="text-lg font-semibold">{item.title}</h2>
  <p class="text-sm text-gray-500">ID: {item.id}</p>
</div>
