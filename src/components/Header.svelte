<script>
  import { authStore } from "$lib/stores/authStore";
  import { get } from "svelte/store";
  import { page } from "$app/stores";
  import {
    ArrowRightCircle,
    BellAlert,
    CheckBadge,
    ChevronRight,
    Cog6Tooth,
    FingerPrint,
    Home,
    Icon,
    MagnifyingGlass,
    Power,
    ShieldCheck,
    Sun,
    UserGroup,
    XCircle,
  } from "svelte-hero-icons";

  let authState;
  let isDarkMode = false;

  $: authState = get(authStore);

  function handleLogout() {
    authStore.logout();
    window.location.href = "/login";
  }

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }

  let tabs = [{ name: "Home", link: "/" }];

  $: {
    tabs = [{ name: "Home", link: "/" }];
    if (authState.isAuthenticated) {
      tabs.push({ name: "Protected", link: "/protected" });
      if (authState.role === "admin") {
        tabs.push({ name: "Dashboard", link: "/dashboard" });
      }
    }
  }

  $: currentPath = $page.url.pathname;
</script>

<div class="mx-auto mb-4 shadow-lg border-b-2">
  <div class="navbar max-w-6xl mx-auto p-4">
    <div class="navbar-start flex items-center">
      <!-- Drawer content (for large screens) -->

      <div class="drawer-content lg:visible">
        <!-- Page content here -->

        <label for="my-drawer" class="btn btn-primary drawer-button btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
      </div>
      <div class="form-control">
        <div class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="input sm:input-bordered w-28 md:w-auto pl-10 focus:border-green-500"
          />
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <Icon src={MagnifyingGlass} size="16" />
          </div>
        </div>
      </div>
    </div>

    <!-- Drawer (sidebar) -->
    <div class="drawer lg:visible">
      <input
        id="my-drawer"
        type="checkbox"
        class="drawer-toggle"
        checked="lg"
      />

      <div class="drawer-side z-50">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"
        ></label>
        <ul class="menu bg-base-200 text-base-content min-h-full w-52 p-4">
          <!-- Sidebar content here -->
          <li>
            <p
              class="md:text-2xl text-lg font-bold text-green-500 hover:cursor-text"
            >
              Student Management
            </p>
          </li>
          <li>
            <a href="/" class="px-4 py-2 hover:text-green-500 inline-flex"
              ><span><Icon src={Home} size="16" /></span> Home</a
            >
          </li>
          <li>
            <a
              href="/students"
              class="px-4 py-2 hover:text-green-500 inline-flex"
              ><span><Icon src={UserGroup} size="16" /></span> Students</a
            >
          </li>
          <li>
            <a
              href="/protected"
              class="px-4 py-2 hover:text-green-500 inline-flex"
              ><span><Icon src={FingerPrint} size="16" /></span> Protected</a
            >
          </li>
          <li>
            <a
              href="/dashboard"
              class="px-4 py-2 hover:text-green-500 inline-flex"
              ><span><Icon src={CheckBadge} size="16" /></span>Dashboard</a
            >
          </li>
          <li class="dropdown dropdown-bottom">
            <div tabindex="0" role="button" class="btn">
              <span><Icon src={ShieldCheck} size="16" /></span>
              <span>Authentication</span>
              <span><Icon class="mt-1" src={ChevronRight} size="16" /></span>
            </div>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <ul tabindex="0" class="dropdown-content bg-transparent">
              {#if authState.isAuthenticated}
                <button
                  on:click={handleLogout}
                  class="px-4 py-2 hover:text-red-500 inline-flex"
                  ><span class="mt-1 mr-2"><Icon src={Power} size="16" /></span
                  >Logout</button
                >
              {:else}
                <a
                  href="/login"
                  class="px-4 py-2 hover:text-green-500 inline-flex"
                  ><span class="mt-1 mr-2"
                    ><Icon src={ArrowRightCircle} size="16" /></span
                  >Login</a
                >
              {/if}
              <li>
                <a href="/" class="px-4 py-2 hover:text-green-500 inline-flex"
                  ><span><Icon src={XCircle} size="16" /></span>Register</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- Center content (for large screens) -->
    <div class="navbar-center lg:flex z-10">
      <ul class="menu menu-horizontal hidden lg:inline-flex px-1">
        <li>
          <button
            class="btn btn-ghost hover:text-green-500 cursor-pointer hover:rotate-180 duration-1000 border-none rounded-full !bg-transparent"
            on:click={toggleTheme}
          >
            <Icon src={Sun} size="26" />
          </button>
        </li>
        <li>
          <span class="hover:text-green-500"
            ><Icon src={BellAlert} size="26" /></span
          >
        </li>
        <li>
          <span class="hover:text-green-500"
            ><Icon src={Cog6Tooth} size="26" /></span
          >
        </li>
      </ul>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow"
        >
          <li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <!-- svelte-ignore a11y-missing-attribute -->
          <li><a>Settings</a></li>
          <li>
            {#if authState.isAuthenticated}
              <p class="inline-block">Welcome, {authState.user}</p>
              <button
                on:click={handleLogout}
                class=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded my-2"
                >Logout</button
              >
            {:else}
              <a
                href="/login"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded my-2"
                >Login</a
              >
            {/if}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<style>
  .active {
    @apply text-green-500 font-bold;
  }

  :global(.dark .navbar) {
    @apply bg-gray-900 text-white;
  }

  :global(.dark .menu) {
    @apply bg-gray-800 text-white;
  }

  :global(.dark .input) {
    @apply bg-gray-700 text-white;
  }
</style>
