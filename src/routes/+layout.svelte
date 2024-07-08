<script context="module">
  import "../app.css";
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";
  import { createClient, setContextClient } from "@urql/svelte";

  export const load = async () => {
    const client = createClient({
      url: "hhttp://localhost:4000", // Ensure the correct URL endpoint
    });

    setContextClient(client);
  };
</script>

<Header />
<slot />
<Footer />
