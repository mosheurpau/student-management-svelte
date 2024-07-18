<script context="module">
  import "../app.css";
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";
  import TopBar from "../components/TopBar.svelte";
  import SideBar from "../components/SideBar.svelte";
</script>

<!-- <Header /> -->
<TopBar />
<Header />
<div class="flex flex-wrap min-h-screen max-w-8xl mx-auto">
  <div class="w-full md:w-2/12">
    <SideBar />
  </div>
  <div class="w-full md:w-10/12 mx-auto">
    <main class="flex-1 p-4 mt-2 md:mt-28">
      <slot />
    </main>
  </div>
  <Footer />
</div>
