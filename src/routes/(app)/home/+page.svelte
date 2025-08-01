<script lang="ts">
  import InfiniteFeed from "$lib/components/InfiniteFeed.svelte";
  import imagenPrueba from "./prueba_123.jpg";
  import { Heart, MessageSquareText, UserRound } from "lucide-svelte";
  import PostComments from "$lib/components/PostComments.svelte";

  let expandedPost = $state<number | 0>(0);
  let expandedPostComments = $state<number | 0>(0);
  let currentPostId = $state<number | 0>(0);

  let observeVisibility = (node: HTMLElement, postId: number) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentPostId = postId;
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  };

  let selectPost = async (id: number) => {
    expandedPost = id;
    setTimeout(() => {
      if (currentPostId === id) {
        expandedPostComments = id;
      }
    }, 200);
  };

  $effect(() => {
    if (expandedPost && currentPostId !== expandedPost) {
      expandedPost = 0;
      expandedPostComments = 0;
    }
  });
</script>

<!-- The home page will be divided into three spaces: chats, posts, and recommendations. -->
<main class="main vertical-snap">
  <div class="feed-container">
    <InfiniteFeed endpoint="api/feed" limit={15}>
      {#snippet data({ id, data })}
        <div
          class="post-container transition-all duration-300 ease-in-out"
          use:observeVisibility={id}
          class:expanded={expandedPost === id}
          class:pointer-events-none={currentPostId !== id}
          class:active={currentPostId === id}
          id={"post-container-" + id}
        >
          <div
            class="post transition-transform duration-300 ease-in-out"
            class:!translate-x-[-5%]={expandedPost === id}
            class:expanded={expandedPost === id}
            class:active={currentPostId === id}
          >
            <div class="author-info">
              <UserRound class="text-white w-8 h-8" />
            </div>
            <button
              ><img
                src={imagenPrueba}
                class="h-full w-full object-fit absolute inset-0"
                alt="publication"
                loading="lazy"
              /></button
            >
            <div class="overlay-img">
              <button class="icon-glow"
                ><Heart class="text-white w-8 h-8" /></button
              >
              <div
                class="mx-auto grid place-items-center font-semibold select-none description-overlay"
              >
                {data.title}
              </div>
              {#if expandedPost !== id}
                <button class="icon-glow" onclick={() => selectPost(id)}
                  ><MessageSquareText class="text-white w-8 h-8" /></button
                >
              {/if}
            </div>
          </div>
          <!-- Comments panel -->
          {#if expandedPostComments === id}
            <PostComments {id}></PostComments>
          {/if}
        </div>
      {/snippet}
    </InfiniteFeed>
  </div>
</main>

<style scoped>
  .main {
    min-height: 100%;
    width: 100vw;
    display: flex;
    align-items: flex-start;
    padding-top: 26px;
  }
  .feed-container {
    width: 100%;
    padding: 15px;
    padding-top: 0px !important;
  }
  .overlay-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 55px;
    padding: 0.75rem;
    background-color: var(--color-primary-blue-dark);
    color: var(--color-primary-white);
    text-align: center;
    backdrop-filter: blur(7px);
    display: flex;
    gap: 25px;
    z-index: 25;
    overflow-x: auto;
  }
  .author-info {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--color-primary-blue-dark);
    padding: 0.25rem 0.5rem;
    border-radius: 100%;
    backdrop-filter: blur(7px);
    z-index: 15;
    height: 70px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .post-container {
    scroll-snap-align: center;
    width: 40vw;
    height: 70vh;
    display: flex;
    transform-origin: center center;
  }
  .post-container:not(.active) {
    opacity: 0.2;
    transform: scale(0.9);
    transform-origin: center center;
    will-change: transform, opacity;
  }
  .post {
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 50vw;
    display: flex;
  }
  .post-container.active {
    will-change: transform, opacity;
  }
  .post.active {
    will-change: transform, opacity;
  }
  .post-container.expanded {
    width: 80vw !important;
  }
  .post.expanded {
    width: 40vw !important;
  }
  .vertical-snap {
    margin: 0 auto;
    gap: 0.75rem;
    overflow: auto;
    overscroll-behavior-y: contain;
    scroll-snap-type: y mandatory;
    height: 100%;
  }
  @media (max-width: 1000px) {
    .overlay-img .description-overlay {
      font-size: 13px;
    }
    .post-container {
      height: 50vh;
    }
    .post {
      height: 50vh;
    }
  }
  @media (max-width: 700px) {
    .post-container {
      height: 40vh;
    }
    .post {
      height: 40vh;
    }
  }
  @media (max-width: 500px) {
    .post-container {
      height: 30vh;
    }
    .post {
      height: 30vh;
    }
  }
</style>
