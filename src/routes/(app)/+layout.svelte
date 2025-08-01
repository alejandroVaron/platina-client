<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import {
    User,
    Users,
    MessageSquareText,
    MessageSquareMore,
    Minus,
    Search,
    Locate,
    UserSearch,
    Contact,
    Settings,
    UserRoundPen,
    Link,
    HandHelping,
    Flag,
  } from "lucide-svelte";
  import LoadingOverlay from "$lib/components/LoadingOverlay.svelte";
  import { addToast } from "$lib/stores/toast";
  import { deleteAccessTokenCookie } from "$lib/utils/cookies";
  import { goto } from "$app/navigation";
  import { runQuery } from "$lib/graphql/query";
  import type { ProfileFromUserQuery } from "$lib/graphql/generated";
  import { userProfileQuery } from "$lib/graphql/queries/profile";

  // This graphql return all data for home, except the posts feed and the chat
  let user = runQuery<ProfileFromUserQuery>(userProfileQuery);
  let avatarUrl = $derived($user.data?.profileFromUser?.avatarUrl);
  let displayName = $derived($user.data?.profileFromUser?.displayName);

  let { children } = $props();

  let isExpandedChat = $state(false);
  let open = $state(false);
  let isLoading = $state(false);

  let currentTab = $state("home");

  let handleLogout = async (e: Event) => {
    try {
      isLoading = true;
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
          credentials: "include",
        }
      );

      if (!res.ok) {
        addToast({
          data: {
            title: "Error al cerrar sesión.",
            description: "Intente de nuevo.",
            state: "error",
          },
        });
      } else {
        addToast({
          data: {
            title: "Cierre de sesión correcta",
            description: "",
            state: "success",
          },
        });
        deleteAccessTokenCookie("accessToken");
        goto("/login");
      }
    } catch (err) {
      console.error(err);
      addToast({
        data: {
          title: "Error",
          description:
            "Hubo un error al intentar desloguearse. prueba de nuevo en un rato.",
          state: "error",
        },
      });
    } finally {
      isLoading = false;
    }
  };
</script>

<LoadingOverlay loading={isLoading} />
<main
  class="flex flex-1 overflow-y-auto main-app"
  style="height: 100vh !important"
>
  <Drawer.Root direction="right" {open}>
    <div class="header-class backdrop-blur-xs text-white">
      <!-- Logo -->
      <div
        class="item-header justify-end icon-glow-light basis-1/8!"
        class:active-tab={currentTab === "home"}
      >
        <button onclick={() => (currentTab = "home")}
          ><img
            src="images/logo-home.png"
            class="h-12 text-white logo-platina"
            alt="logo-home"
          />
        </button>
      </div>
      <!-- Tracker - Dashboard -->
      <div class="item-header" class:active-tab={currentTab === "tracker"}>
        <button
          class="btn-header text-glow-light"
          onclick={() => (currentTab = "tracker")}><Locate />Tracker</button
        >
      </div>
      <!-- Matchmaking - Search friend -->
      <div class="item-header" class:active-tab={currentTab === "searchFriend"}>
        <button
          class="btn-header text-glow-light"
          onclick={() => (currentTab = "searchFriend")}
          ><UserSearch />Buscar amigo</button
        >
      </div>
      <!-- Searcher -->
      <div class="item-header basis-2/8!">
        <div class="input-group w-full">
          <span class="input-icon">
            <Search />
          </span>
          <input
            type="text"
            placeholder="Publicación, comunidad o usuario..."
            class="custom-input"
          />
        </div>
      </div>
      <!-- Groups - community -->
      <div class="item-header" class:active-tab={currentTab === "community"}>
        <button
          class="btn-header text-glow-light"
          onclick={() => (currentTab = "community")}
          ><Users /> Comunidades
        </button>
      </div>
      <!-- Chats - friends -->
      <div class="item-header" class:active-tab={currentTab === "friend"}>
        <button
          class="btn-header text-glow-light"
          onclick={() => (currentTab = "friend")}
          ><MessageSquareMore />Amigos</button
        >
      </div>
      <!-- Menu - profile -->
      <div class="item-header justify-end basis-1/8!">
        {displayName}
        <Drawer.Trigger class="h-16"
          ><div
            class="w-12 h-12 rounded-full shadow-2xl backdrop-blur-md backdrop-brightness-125 9 flex items-center justify-center icon-glow overflow-hidden"
          >
            {#if avatarUrl}
              <img
                class="object-cover w-full h-full"
                src={avatarUrl}
                alt="avatar-user"
              />
            {:else}
              <User class="h-15 w-15 text-white"></User>
            {/if}
          </div></Drawer.Trigger
        >
      </div>
    </div>
    <Drawer.Content class="glass-blue !w-80 border-none">
      <Drawer.Header class="justify-center items-center gap-5">
        <!-- <Drawer.Title></Drawer.Title>
      <Drawer.Description>This action cannot be undone.</Drawer.Description> -->
        <div
          class="w-30 h-30 rounded-full shadow-2xl backdrop-blur-md backdrop-brightness-125 9 flex items-center justify-center overflow-hidden"
        >
          {#if avatarUrl}
            <img
              class="object-cover w-full h-full"
              src={avatarUrl}
              alt="avatar-user"
            />
          {:else}
            <User class="h-15 w-15 text-white"></User>
          {/if}
        </div>
        <h2 class="text-white font-bold text-2xl">
          {displayName}
        </h2>
      </Drawer.Header>
      <nav class="flex flex-col gap-10 p-6 text-white overflow-auto">
        <div class="sidebar-section">
          <h3
            class="text-sm text-white/50 uppercase tracking-wider mb-2 text-end"
          >
            Usuario
          </h3>
          <button
            class="flex items-center gap-5 px-4 py-2 rounded-lg icon-glow"
          >
            Perfil <Contact class="w-5 h-5" />
          </button>
          <button
            class="flex items-center gap-5 px-4 py-2 rounded-lg icon-glow"
          >
            Configuración <Settings class="w-5 h-5" />
          </button>
          <button
            class="flex items-center gap-5 px-4 py-2 rounded-lg icon-glow"
          >
            Personalizar <UserRoundPen class="w-5 h-5" />
          </button>
          <button
            class="flex items-center gap-5 px-4 py-2 rounded-lg icon-glow"
          >
            Enlazar plataforma <Link class="w-5 h-5" />
          </button>
        </div>
        <div class="sidebar-section">
          <h3
            class="text-sm text-white/50 uppercase tracking-wider mb-2 text-end"
          >
            Ayuda
          </h3>
          <button
            class="flex items-center gap-5 px-4 py-2 rounded-lg icon-glow"
          >
            Ticket <HandHelping class="w-5 h-5" />
          </button>
          <button
            class="flex items-center gap-5 px-4 py-2 rounded-lg icon-glow"
          >
            Reportar <Flag class="w-5 h-5" />
          </button>
        </div>
      </nav>
      <Drawer.Footer>
        <button class="custom-button" onclick={handleLogout}
          >Cerrar sesión</button
        >
        <!-- <Drawer.Close>Cancel</Drawer.Close> -->
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
  <div style="margin-top: 64px;" class="components-container">
    {@render children()}
  </div>
  <!-- Modal para chatear -->
  <div class="chat-container">
    <div class="sidebar-v" class:expanded={isExpandedChat}>
      {#if !isExpandedChat}
        <div class="logo-sidebar">
          <button
            class="w-full icon-glow"
            onclick={() => {
              isExpandedChat = true;
            }}><MessageSquareText class="text-white w-8 h-8 m-auto" /></button
          >
        </div>
      {:else}
        <div class="w-full h-15 flex">
          <button
            class="ml-auto mr-3 icon-glow"
            onclick={() => {
              isExpandedChat = false;
            }}><Minus class="text-white w-8 h-8 m-auto" /></button
          >
        </div>
      {/if}
    </div>
  </div>
</main>

<style scoped>
  .header-class {
    position: fixed;
    transition: background-color 350ms ease-in-out;
    display: flex;
    width: 100%;
    height: 4rem;
    justify-content: center;
    align-items: center;
    z-index: 50;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    overflow: auto;
    background-color: var(--color-primary-blue-dark);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .item-header {
    display: flex;
    align-items: center;
    flex-basis: calc(1 / 8 * 100%);
    height: 100%;
    min-width: 120px;
    overflow: hidden;
    gap: 10px;
    justify-content: center;
    position: relative;
    transition: color 0.3s ease;
  }

  .item-header::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--color-secundary-light-blue);
    border-radius: 10px;
    transition:
      width 0.7s ease,
      left 0.7s ease;
    transform: translateX(-50%);
  }

  .item-header.active-tab::after {
    width: 100%; /* Ajusta este % según tu diseño */
  }

  .header-class:hover {
    background-color: var(--color-primary-blue-dark);
  }

  .main-app {
    background-image: url("images/background-home.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .btn-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: var(--color-primary-white);
    font-weight: 500;
    margin: auto;
    height: 100%;
    width: 100%;
  }

  .components-container {
    height: calc(100vh - 64px);
  }

  .chat-container {
    position: fixed;
    bottom: 0;
    left: 35px;
    width: 23vw;
    height: auto;
    z-index: 25;
    display: flex;
    flex-direction: column;
  }

  .logo-sidebar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    visibility: visible;
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease;
  }

  .sidebar-v {
    width: 100%;
    height: 50px;
    color: var(--color-primary-white);
    transition: width 0.2s ease-in-out;
    background-color: var(--color-primary-white);
    border: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    z-index: 50;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background-color: var(--color-primary-blue-dark);
    margin-top: auto;
    transition: height 0.2s ease-in-out;
  }

  .sidebar-v.expanded {
    height: calc(100vh - 100px) !important;
  }

  .sidebar-section {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 30px;
  }

  @media (max-width: 1000px) {
    .header-class {
      overflow-x: auto;
    }
  }

  @media (max-width: 640px) {
    .chat-container {
      display: none;
    }
  }
</style>
