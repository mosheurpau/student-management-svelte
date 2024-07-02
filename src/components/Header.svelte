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
  <div class="navbar max-w-7xl mx-auto p-4">
    <div class="navbar-start flex items-center">
      <div class="dropdown lg:hidden">
        <button tabindex="0" class="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
        >
          {#each tabs as tab}
            <li>
              <a
                href={tab.link}
                class={`${currentPath === tab.link ? "active" : ""} block px-4 py-2 text-gray-700 hover:text-green-500`}
              >
                {tab.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      <a href="/" class="md:text-2xl text-sm font-bold text-green-500 ml-4"
        >Student Management</a
      >
    </div>
    <div class="navbar-center hidden lg:flex">
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
