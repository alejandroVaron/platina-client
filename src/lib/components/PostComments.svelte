<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import InfiniteFeed from "$lib/components/InfiniteFeed.svelte";
  import { ThumbsUp, ThumbsDown, User, SendHorizontal } from "lucide-svelte";

  let { id } = $props<{ id: number }>();
  let totalComments = $state<number>(0);

  let message = $state();

  onMount(() => {
  });
</script>

<div
  in:fade={{ duration: 200 }}
  class="post-comments overflow-y-auto transition-all duration-200 ease-in-out"
>
  <div class="header-comments-container">
    <h2 class="ml-5 text-white font-bold text-xl">Comentarios</h2>
    <p class="text-[var(--color-secundary-label)]">({totalComments})</p>
  </div>
  <div class="body-comments-container">
    <InfiniteFeed
      endpoint="api/feed/comments"
      body={{ id: id }}
      limit={15}
      align_items={false}
      bind:total={totalComments}
    >
      {#snippet data({ id, data })}
        <div class="comment">
          <div class="comment-avatar h-10 w-10">
            <User class="h-5 w-5 text-white"></User>
          </div>
          <div class="comment-body">
            <div class="comment-meta">
              <span class="author">Alejandro adawdawd</span>
              <span class="time">14 minutes ago</span>
            </div>
            <p class="comment-text">
              {data.title}
            </p>
            <div class="comment-actions">
              <button
                class="flex gap-2 justify-center items-center text-green-600 icon-glow"
                ><ThumbsUp class="h-4 text-green-600" /> 33</button
              >
              <button
                class="flex gap-2 justify-center items-center text-red-600 icon-glow"
                ><ThumbsDown class="h-4 text-red-500 " /> 33</button
              >
            </div>
          </div>
        </div>
      {/snippet}
    </InfiniteFeed>
    <!-- Response Temporaly will be disabled-->
    <!-- <div class="comment reply">
      <div class="avatar">
        <img src="brand.jpg" alt="User-reply" />
      </div>
      <div class="comment-body">
        <div class="comment-meta">
          <span class="author brand">Binar Academy</span>
          <span class="time">10 minutes ago</span>
        </div>
        <p class="comment-text">
          Thanks you...
        </p>
        <div class="actions">
          <button>2</button>
          <button>0</button>
          <button>Reply</button>
        </div>
      </div>
    </div> -->
  </div>
  <div class="footer-comments-container pl-5 pr-5">
    <textarea
      class="custom-textarea"
      placeholder="Escribe tu comentario..."
      bind:value={message}
    ></textarea>
    <button class="icon-glow"><SendHorizontal class="text-white" /></button>
  </div>
</div>

<style scoped>
  .post-comments {
    width: 40vw;
    height: 100%;
    background-color: var(--color-primary-blue-dark);
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .header-comments-container {
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 15px;
  }
  .body-comments-container {
    width: 100%;
    height: max-content;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
  }
  .footer-comments-container {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  /* .comment-thread {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    margin: 1rem auto;
    font-family: sans-serif;
  }

  .comment.reply {
    margin-left: 2.5rem;
    position: relative;
  }

  .comment.reply::before {
    content: "";
    position: absolute;
    left: -1.25rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #ccc;
  } */

  .comment {
    display: flex;
    gap: 1rem;
    padding: 20px;
  }

  .comment-avatar {
    border-radius: 9999px;
    backdrop-filter: blur(12px) brightness(1.25);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .comment-body {
    flex: 1;
    padding-top: 6px;
  }

  .comment-meta {
    font-size: 0.9rem;
    color: var(--color-secundary-medium-gray);
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 0.5px;
  }

  .comment-meta .author {
    color: var(--color-primary-white);
    font-weight: bold;
    font-size: medium;
  }

  .comment-text {
    margin: 0.5rem 0;
    color: var(--color-primary-white);
  }

  .comment-actions {
    display: flex;
    gap: 1rem;
    font-size: 0.85rem;
    color: var(--color-secundary-light-gray);
  }

  .comment-actions button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-secundary-light-gray);
  }
</style>
