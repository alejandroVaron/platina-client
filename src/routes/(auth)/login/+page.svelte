<script lang="ts">
  import { createLabel } from "@melt-ui/svelte";
  import { addToast } from "$lib/stores/toast";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { setAccessTokenCookie } from "$lib/utils/cookies";
  import { Eye, EyeOff } from "lucide-svelte";
  import LoadingOverlay from "$lib/components/LoadingOverlay.svelte";
  import { particlesInit } from "@tsparticles/svelte";
  import { loadSlim } from "@tsparticles/slim";
  const propsServer = page;

  let isLoading = $state(false);
  let ParticlesComponent: any = $state(null);

  let formMessage = $state("");

  // Email vars
  const emailLabel = createLabel();
  let email = $state("");

  // Password vars
  const passwordLabel = createLabel();
  let password = $state("");
  let showPassword = $state(false);

  onMount(async () => {
    // Initial load particles effects
    const module = await import("@tsparticles/svelte");
    ParticlesComponent = module.default;

    if (propsServer?.data?.message) {
      addToast({
        data: {
          title: propsServer.data.message,
          description: "",
          state: "info",
        },
      });
    }

    const container = document.getElementById("tsparticles");
    if (!container) return;
  });

  let particlesUrl = "/particles.json";

  let onParticlesLoaded = (event: any) => {
    const particlesContainer = event.detail.particles;
  };
  void particlesInit(async (engine) => {
    await loadSlim(engine);
  });

  $effect(() => {
    if (email && password) {
      formMessage = "";
    }
  });

  let handleLogin = async (e: Event) => {
    e.preventDefault();
    if (!email || !password) {
      formMessage = "Debe llenar todos los campos.";
      return;
    }

    if (password.length < 6) {
      formMessage = "La contraseña debe contener al menos 6 caracteres.";
      return;
    }

    try {
      isLoading = true;
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const body = await res.json();

      if (!res.ok) {
        addToast({
          data: {
            title: "Credenciales inválidas",
            description: body.message,
            state: "error",
          },
        });
      } else {
        addToast({
          data: { title: "Login exitoso", description: "", state: "success" },
        });

        // Agregar token temporal
        if (body?.data?.accesstoken) {
          setAccessTokenCookie(
            "accessToken",
            body.data.accesstoken,
            body.data.timeout ?? 3600
          );
        }

        goto("/home");
      }
    } catch (err) {
      console.error(err);
      addToast({
        data: {
          title: "Error",
          description:
            "Hubo un error al intentar loguearse. prueba de nuevo en un rato.",
          state: "error",
        },
      });
    } finally {
      isLoading = false;
    }
  };
</script>

<LoadingOverlay loading={isLoading} />
<main class="page">
  <div class="login-left bg-custom-gradient">
    <div
      class="glass-card w-full max-w-md p-10 background-color: var(--color-primary-blue-dark)"
    >
      <div class="form-container">
        <h2 class="title">Inicia sesión</h2>
        <form method="POST" class="form" onsubmit={handleLogin}>
          <div class="inline-grid">
            <label
              {...emailLabel}
              for="email"
              class="mb-0.5 text-magnum-900 w-max text-white"
              data-melt-part="emailLabel"
            >
              <span>Correo electrónico</span>
            </label>
            <div class="input-group">
              <input
                type="email"
                id="email"
                name="email"
                bind:value={email}
                class="custom-input"
                placeholder="prueba@abc.com"
              />
            </div>
          </div>
          <div class="inline-grid">
            <label
              {...passwordLabel}
              for="password"
              class="mb-0.5 text-magnum-900 w-max text-white"
              data-melt-part="passwordLabel"
            >
              <span>Contraseña</span>
            </label>
            <div class="flex items-center gap-2 min-w-35">
              <div class="input-group">
                <input
                  id="password"
                  name="password"
                  bind:value={password}
                  class="custom-input"
                  type={showPassword ? "text" : "password"}
                  placeholder={showPassword ? "ABC123*" : "XXXXXXX"}
                />
              </div>
              <button
                type="button"
                onclick={() => (showPassword = !showPassword)}
                aria-label={showPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"}
                class="custom-button"
                tabindex="-1"
              >
                {#if showPassword}
                  <EyeOff size="20" />
                {:else}
                  <Eye size="20" />
                {/if}
              </button>
            </div>

            {#if formMessage}
              <p class="w-max text-[color:var(--color-accent-error)]">
                {formMessage}
              </p>
            {/if}
          </div>
          <button type="submit" class="custom-button">Entrar</button>
        </form>

        <p class="toggle">
          ¿No tienes cuenta?
          <a href="register"> Regístrate </a>
        </p>
      </div>
    </div>
  </div>
  <div class="login-right relative">
    <div
      class="backdrop-blur-xs rounded-xl shadow-lg h-full w-full flex justify-center items-center"
    >
      <div class="logo-placeholder">
        <img
          src="/images/platina-icon.png"
          alt="Logo"
          class="logo-platina glow-hover text-white"
        />
      </div>
    </div>
    {#if ParticlesComponent}
      <ParticlesComponent
        id="tsparticles"
        class="w-full h-full top-0 fixed"
        style=""
        url={particlesUrl}
        on:particlesLoaded={onParticlesLoaded}
      ></ParticlesComponent>
    {/if}
  </div>
</main>

<style scoped>
  .page {
    align-items: center;
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: var(--color-primary-white);
  }

  .login-right {
    background-image: url("/images/background-login.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    width: 65%;
    height: 100%;
  }

  .logo-placeholder {
    width: 350px;
    height: 350px;
  }

  .login-left {
    padding: 2rem;
    width: 35%;
    height: 100%;
    text-align: center;
    gap: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    width: 100%;
    height: 100%;
    padding: 2rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .title {
    font-size: 3rem;
    font-weight: 300;
    text-align: center;
    color: var(--color-primary-white);
  }

  .toggle {
    font-size: 0.85rem;
    margin-top: 1.5rem;
    color: var(--color-primary-white);
  }

  .toggle a {
    color: var(--color-primary-white);
    font-weight: bolder;
    cursor: pointer;
    text-decoration: none;
  }

  .glass-card {
    background-color: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
    border-radius: 20px;
  }

  @keyframes logoGlow {
    0%,
    100% {
      opacity: 0.9;
      transform: scale(1);
      filter: brightness(0%) invert(100%);
    }
    50% {
      opacity: 1;
      transform: scale(1.08);
      filter: brightness(0%) invert(100%);
    }
  }

  .glow-hover:hover {
    animation: glowPulse 0s ease-in-out infinite;
    filter: brightness(0%) invert(100%);
  }

  @media (max-width: 768px) {
    .login-left {
      width: 100%;
      padding: 1rem;
    }

    .login-right {
      display: none;
    }
  }

  @media (max-width: 1000px) {
    .glass-card {
      padding: 0;
    }
  }
</style>
