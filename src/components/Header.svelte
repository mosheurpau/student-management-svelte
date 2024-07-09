<script>
  import { authStore } from "$lib/stores/authStore";
  import { get } from "svelte/store";
  import { page } from "$app/stores";

  let authState;

  $: authState = get(authStore);

  function handleLogout() {
    authStore.logout();
    window.location.href = "/login";
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
    </div>

    <!-- Drawer (sidebar) -->
    <div class="drawer lg:visible">
      <input
        id="my-drawer"
        type="checkbox"
        class="drawer-toggle"
        checked="lg"
      />

      <div class="drawer-side">
        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"
        ></label>
        <ul class="menu bg-base-200 text-base-content min-h-full w-52 p-4">
          <!-- Sidebar content here -->
          <li>
            <p class="md:text-2xl text-sm font-bold text-green-500">
              Student Management
            </p>
          </li>
          <li>
            <a href="/" class="block px-4 py-2 hover:text-green-500">Home</a>
          </li>
          <li>
            <a href="/protected" class="block px-4 py-2 hover:text-green-500"
              >Protected</a
            >
          </li>
          <li>
            <a href="/dashboard" class="block px-4 py-2 hover:text-green-500"
              >Dashboard</a
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- Center content (for large screens) -->
    <div class="navbar-center hidden lg:flex">
      <p class="md:text-2xl text-sm font-bold text-green-500 mr-96">
        Student Management
      </p>
      <ul class="menu menu-horizontal px-1">
        {#each tabs as tab}
          <li>
            <a
              href={tab.link}
              class={` hover:text-green-500 ${currentPath === tab.link ? "active" : ""} px-4 py-2`}
              >{tab.name}</a
            >
          </li>
        {/each}
      </ul>
    </div>

    <!-- Right content (authentication) -->
    <div class="navbar-end flex items-center space-x-4">
      {#if authState.isAuthenticated}
        <p class="inline-block">Welcome, {authState.user}</p>
        <button
          on:click={handleLogout}
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >Logout</button
        >
      {:else}
        <a
          href="/login"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >Login</a
        >
      {/if}
    </div>
  </div>
</div>

<style>
  .active {
    @apply text-green-500 font-bold;
  }
</style>
