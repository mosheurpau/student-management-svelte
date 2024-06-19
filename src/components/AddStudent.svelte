<script>
  import { createEventDispatcher } from "svelte";

  let name = "";
  let age = "";
  const dispatch = createEventDispatcher();

  function addStudent() {
    if (name && age) {
      const id = Date.now(); // Generate a unique id based on the current timestamp
      dispatch("add", { id, name, age });
      name = "";
      age = "";
    }
  }
</script>

<div class="my-4 text-center">
  <input
    bind:value={name}
    type="text"
    placeholder="Name"
    class="border py-2 px-3 mr-2"
  />
  <input
    bind:value={age}
    type="number"
    placeholder="Age"
    class="border py-2 px-3 mr-2"
  />
  <button
    on:click={addStudent}
    class="bg-green-500 text-white py-2 px-4 rounded"
  >
    Add Student
  </button>
</div>
