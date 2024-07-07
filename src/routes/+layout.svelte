<script context="module">
  import "../app.css";
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";
  import { createClient, setContextClient } from "@urql/svelte";

  export const load = async () => {
    const client = createClient({
      url: "https://student-management-server-side.onrender.com", // Ensure the correct URL endpoint
    });

    setContextClient(client);
  };
</script>

<Header />
<slot />
<Footer />
