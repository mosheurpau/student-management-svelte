<script>
  import {
    ArrowRightCircle,
    CheckBadge,
    ChevronRight,
    FingerPrint,
    Home,
    Icon,
    Power,
    ShieldCheck,
    UserGroup,
    XCircle,
  } from "svelte-hero-icons";
  import { page } from "$app/stores";
  import { authStore } from "$lib/stores/authStore";
  import { get } from "svelte/store";
  import { mStore } from "$lib/stores/menuStore";

  let authState;
  $: authState = get(authStore);
  function handleLogout() {
    authStore.logout();
    window.location.href = "/login";
  }

  let menuText;
  $: menuText = $mStore;

  $: console.log("menu", menuText);

  $: currentPath = $page.url.pathname;
</script>

<aside
  class="hidden md:block fixed inset-y-0 mt-24 border-gray-200 flex-col p-4 space-y-4 z-10 border-r-2 shadow-lg bg-base-200 bg-opacity-80"
>
  <a
    href="/"
    class="flex items-center space-x-4 p-2 rounded-md hover:text-green-500 {currentPath ===
    '/'
      ? 'active'
      : ''}"
  >
    <Icon src={Home} size="16" />
    {#if menuText === true}
      <span class="hidden lg:block hover:text-green-500">Home</span>
    {:else if menuText === false}
      <span class="hidden md:block lg:hidden hover:text-green-500">Home</span>
    {/if}
  </a>

  <a
    href="/students"
    class="flex items-center space-x-4 p-2 rounded-md hover:text-green-500 {currentPath ===
    '/students'
      ? 'active'
      : ''}"
  >
    <Icon src={UserGroup} size="16" />
    {#if menuText === true}
      <span class="hidden lg:block hover:text-green-500">Students</span>
    {:else if menuText === false}
      <span class="hidden md:block lg:hidden hover:text-green-500"
        >Students</span
      >
    {/if}
  </a>

  <a
    href="/protected"
    class="flex items-center space-x-4 p-2 rounded-md hover:text-green-500 {currentPath ===
    '/protected'
      ? 'active'
      : ''}"
  >
    <Icon src={FingerPrint} size="16" />
    {#if menuText === true}
      <span class="hidden lg:block hover:text-green-500">Protected</span>
    {:else if menuText === false}
      <span class="hidden md:block lg:hidden hover:text-green-500"
        >Protected</span
      >
    {/if}
  </a>

  <a
    href="/dashboard"
    class="flex items-center space-x-4 p-2 rounded-md hover:text-green-500 {currentPath ===
    '/dashboard'
      ? 'active'
      : ''}"
  >
    <Icon src={CheckBadge} size="16" />
    {#if menuText === true}
      <span class="hidden lg:block hover:text-green-500">Dashboard</span>
    {:else if menuText === false}
      <span class="hidden md:block lg:hidden hover:text-green-500"
        >Dashboard</span
      >
    {/if}
  </a>
  <li class="dropdown dropdown-bottom">
    <div
      tabindex="0"
      role="button"
      class="btn btn-sm !px-2 btn-outline !border-0 !bg-transparent hover:text-green-500 !py-0"
    >
      <span><Icon src={ShieldCheck} size="16" /></span>
      {#if menuText === true}
        <span class="hidden lg:block hover:text-green-500">Authentication</span>
      {:else if menuText === false}
        <span class="hidden md:block lg:hidden hover:text-green-500"
          >Authentication</span
        >
      {/if}

      <span
        ><Icon
          class="block {menuText === true ? 'block' : 'hidden'}"
          src={ChevronRight}
          size="16"
        /></span
      >
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="dropdown-content bg-transparent">
      {#if authState.isAuthenticated}
        <button
          on:click={handleLogout}
          class=" py-2 text-red-500 hover:text-red-700 inline-flex {menuText ===
          true
            ? 'px-8'
            : 'px-2'}"
          ><span class="mt-1 mr-2"><Icon src={Power} size="16" /></span>
          {#if menuText === true}
            <span class="hidden lg:block">Logout</span>
          {:else if menuText === false}
            <span class="hidden md:block lg:hidden">Logout</span>
          {/if}
        </button>
      {:else}
        <a
          href="/login"
          class="py-2 hover:text-green-500 inline-flex {menuText === true
            ? 'px-8'
            : 'px-2'}"
          ><span class="mt-1 mr-2"
            ><Icon src={ArrowRightCircle} size="16" /></span
          >

          {#if menuText === true}
            <span class="hidden lg:block">Login</span>
          {:else if menuText === false}
            <span class="hidden md:block lg:hidden">Login</span>
          {/if}</a
        >
      {/if}
      <li>
        <a
          href="/"
          class="py-2 hover:text-green-500 flex {menuText === true
            ? 'px-8'
            : 'px-2'}"
          ><span class="mt-1 mr-2"><Icon src={XCircle} size="16" /></span>
          {#if menuText === true}
            <span class="hidden lg:block hover:text-green-500">Register</span>
          {:else if menuText === false}
            <span class="hidden md:block lg:hidden hover:text-green-500"
              >Register</span
            >
          {/if}</a
        >
      </li>
    </ul>
  </li>
  <!-- Add more links as needed -->
</aside>

<style>
  :global(.active) {
    @apply text-green-500 bg-slate-200 font-bold;
  }

  :global(.dark .menu) {
    @apply bg-gray-800 text-green-500;
  }

  :global(.dark .input) {
    @apply bg-gray-700 text-green-500;
  }
</style>
