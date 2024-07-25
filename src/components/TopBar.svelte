<script>
  import {
    ArrowLeftStartOnRectangle,
    ArrowRight,
    Bars3BottomLeft,
    BellAlert,
    ChevronDoubleLeft,
    ChevronDoubleRight,
    Cog6Tooth,
    Icon,
    MagnifyingGlass,
    Sun,
    XMark,
  } from "svelte-hero-icons";
  import { authStore } from "$lib/stores/authStore";
  import { get } from "svelte/store";
  import { page } from "$app/stores";
  import { mStore } from "$lib/stores/menuStore";
  let authState;
  let isDarkMode = false;
  let isDrawerOpen = true;

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

  console.log("Before", $mStore);
  function handleMenuText() {
    mStore.update((mStore) => !mStore);
    console.log("After", $mStore);
  }
</script>

<nav
  class=" max-w-[1550px] border-b border-gray-200 p-4 items-center justify-between z-50 hidden md:flex fixed inset-x-0 mx-auto shadow-lg bg-base-200 bg-opacity-80"
>
  <div class="flex items-center space-x-4">
    {#if $mStore === true}
      <span class=" hover:text-green-500">
        <button on:click={handleMenuText}>
          <Icon class="mt-3" src={ChevronDoubleRight} size="24" />
        </button>
      </span>
    {:else if $mStore === false}
      <span class=" hover:text-red-500">
        <button on:click={handleMenuText}>
          <Icon class="mt-3" src={ChevronDoubleLeft} size="24" />
        </button>
      </span>
    {/if}

    <p
      class="hidden md:block teext-lg md:text-2xl font-bold text-green-500 hover:cursor-text"
    >
      Student Management
    </p>
  </div>
  <div class="flex items-center space-x-4">
    <div class="form-control max-w-6xl">
      <div class="relative">
        <input
          type="text"
          placeholder="Search..."
          class="input sm:input-bordered w-28 md:w-auto pl-10 focus:border-green-500"
        />
        <div
          class="absolute inset-y-0 flex items-center pl-3 pointer-events-none"
        >
          <Icon src={MagnifyingGlass} size="16" />
        </div>
      </div>
    </div>
    <div class="navbar-center lg:flex z-10">
      <ul class="menu menu-horizontal px-1">
        <li>
          <button
            class="btn btn-ghost hover:text-green-500 cursor-pointer hover:rotate-180 duration-1000 border-none rounded-full !bg-transparent"
            on:click={toggleTheme}
          >
            <Icon src={Sun} size="26" />
          </button>
        </li>
        <li>
          <button
            class="btn btn-ghost hover:text-green-500 cursor-pointer border-none rounded-full !bg-transparent hover:animate-rotate-lr-3 hidden lg:inline-flex"
          >
            <Icon src={BellAlert} size="26" />
          </button>
        </li>
        <li>
          <button
            class="btn btn-ghost hover:text-green-500 cursor-pointer hover:rotate-180 duration-1000 border-none rounded-full !bg-transparent hidden lg:inline-flex"
            ><Icon src={Cog6Tooth} size="26" /></button
          >
        </li>
      </ul>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full mt-3">
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
</nav>
