<script lang="ts">
  import { createLabel } from "@melt-ui/svelte";
  import { addToast } from "$lib/stores/toast";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { setAccessTokenCookie } from "$lib/utils/cookies";
  import { Eye, EyeOff } from "lucide-svelte";
  import LoadingOverlay from '$lib/components/LoadingOverlay.svelte';

  const propsServer = page;

  let isLoading = $state(false);

  onMount(() => {
    if (propsServer?.data?.message) {
      addToast({
        data: {
          title: propsServer.data.message,
          description: "",
          state: "info",
        },
      });
    }
  });

  let formMessage = $state("");

  // Email vars
  const emailLabel = createLabel();
  let email = $state("");

  // Password vars
  const passwordLabel = createLabel();
  let password = $state("");
  let showPassword = $state(false);

  $effect(() => {
    if (email && password) {
      formMessage = "";
    }
  });

  async function handleLogin(e: Event) {
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
    } finally{
      isLoading = false;
    }
  }

</script>
<LoadingOverlay loading={isLoading} />
<main class="page">
  <div class="login-left">
    <div class="form-container">
      <h2 class="title">Inicia sesión</h2>
      <form method="POST" class="form" onsubmit={handleLogin}>
        <div class="inline-grid">
          <label
            {...emailLabel}
            for="email"
            class="mb-0.5 text-magnum-900 w-max"
            data-melt-part="emailLabel"
          >
            <span>Correo electrónico</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            bind:value={email}
            class="rounded-md px-3 py-2 text-magnum-700"
            placeholder="prueba@abc.com"
          />
        </div>
        <div class="inline-grid">
          <label
            {...passwordLabel}
            for="password"
            class="mb-0.5 text-magnum-900 w-max"
            data-melt-part="passwordLabel"
          >
            <span>Contraseña</span>
          </label>
          <div class="flex items-center gap-2">
            <input
              id="password"
              name="password"
              bind:value={password}
              class="rounded-md px-3 py-2 text-magnum-700 flex-1"
              type={showPassword ? "text" : "password"}
              placeholder={showPassword ? "ABC123*" : "XXXXXXX"}
            />
            <button
              type="button"
              onclick={() => (showPassword = !showPassword)}
              class="right-3 text-magnum-700 focus:outline-none mt-0!"
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
        <button type="submit">Entrar</button>
      </form>

      <p class="toggle">
        ¿No tienes cuenta?
        <a href="registrar"> Regístrate </a>
      </p>
    </div>
  </div>
  <div class="login-right">
    <div class="logo-placeholder">
      <img src="/images/platina-icon.png" alt="Logo" />
    </div>
  </div>
</main>

<style scoped>
  .page {
    align-items: center;
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: #f2f2f2;
  }

  .login-right {
    background-image: url("/images/wallpaper-login.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-placeholder {
    width: 350px;
    height: 350px;
  }

  .login-left {
    padding: 2rem;
    width: 40%;
    height: 100%;
    text-align: center;
    gap: 30px;
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
    font-size: 4rem;
    font-weight: lighter;
    text-align: center;
    color: black;
  }

  input {
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  input:focus {
    background: linear-gradient(to right, #9d55fc, #390083);

    background: rgba(255, 255, 255, 0.15);
  }

  button {
    margin-top: 1rem;
    padding: 0.75rem;
    background: linear-gradient(to right, #6a00f4, #4500a0);

    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background: linear-gradient(to right, #6a00f4, #4500a0);
    filter: brightness(1.2);
    box-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
  }

  .toggle {
    font-size: 0.85rem;
    margin-top: 1.5rem;
    color: black;
  }

  .toggle a {
    color: #4500a0;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
  }
</style>
