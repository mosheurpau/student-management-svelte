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

  let authState;
  $: authState = get(authStore);
  function handleLogout() {
    authStore.logout();
    window.location.href = "/login";
  }

  $: currentPath = $page.url.pathname;

  // Add any required imports or scripts here
</script>

<aside
  class="hidden md:block fixed inset-y-0 mt-24 border-gray-200 flex-col p-4 space-y-4 z-10 border-r-2 shadow-lg"
>
  <a
    href="/"
    class="flex items-center space-x-4 p-2 rounded-md hover:text-green-500 {currentPath ===
    '/'
      ? 'active'
      : ''}"
  >
    <Icon src={Home} size="16" />
    <span class="hidden lg:block thover:text-green-500">Home</span>
  </a>

  <a
    href="/students"
    class="flex items-center space-x-4 p-2 rounded-md hover:text-green-500 {currentPath ===
    '/students'
      ? 'active'
      : ''}"
  >
    <Icon src={UserGroup} size="16" />
    <span class="hidden lg:block hover:text-green-500">Students</span>
  </a>

  <a
    href="/protected"
    class="flex items-center space-x-4 p-2 rounded-md hover:text-green-500 {currentPath ===
    '/protected'
      ? 'active'
      : ''}"
  >
    <Icon src={FingerPrint} size="16" />
    <span class="hidden lg:block hover:text-green-500"> Protected</span>
  </a>

  <a
    href="/dashboard"
    class="flex items-center space-x-4 p-2 rounded-md hover:text-green-500 {currentPath ===
    '/dashboard'
      ? 'active'
      : ''}"
  >
    <Icon src={CheckBadge} size="16" />
    <span class="hidden lg:block hover:text-green-500">Dashboard</span>
  </a>
  <li class="dropdown dropdown-bottom">
    <div
      tabindex="0"
      role="button"
      class="btn btn-sm btn-outline !border-0 !border-b-2 !bg-transparent hover:text-green-500 !py-0"
    >
      <span><Icon src={ShieldCheck} size="16" /></span>
      <span class="hidden lg:block">Authentication</span>
      <span><Icon src={ChevronRight} size="16" /></span>
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="dropdown-content bg-transparent">
      {#if authState.isAuthenticated}
        <button
          on:click={handleLogout}
          class="px-4 py-2 text-red-500 hover:text-red-700 inline-flex"
          ><span class="mt-1 mr-2"><Icon src={Power} size="16" /></span><span
            class="hidden lg:block">Logout</span
          ></button
        >
      {:else}
        <a href="/login" class="px-4 py-2 hover:text-green-500 inline-flex"
          ><span class="mt-1 mr-2"
            ><Icon src={ArrowRightCircle} size="16" /></span
          ><span class="hidden lg:block">Login</span></a
        >
      {/if}
      <li>
        <a href="/" class="px-4 py-2 hover:text-green-500 flex"
          ><span class="mt-1 mr-2"><Icon src={XCircle} size="16" /></span><span
            class="hidden lg:block">Register</span
          ></a
        >
      </li>
    </ul>
  </li>
  <!-- Add more links as needed -->
</aside>

<style>
  :global(.active) {
    @apply text-green-500 bg-slate-900 font-bold;
  }

  :global(.dark .menu) {
    @apply bg-gray-800 text-green-500;
  }

  :global(.dark .input) {
    @apply bg-gray-700 text-green-500;
  }
</style>
