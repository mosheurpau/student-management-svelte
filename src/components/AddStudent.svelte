<script>
  import { createEventDispatcher } from "svelte";

  let name = "";
  let age = "";
  const dispatch = createEventDispatcher();

  // Reactive statements to check if fields are empty
  $: nameEmpty = !name;
  $: ageEmpty = !age;

  function addStudent() {
    if (name && age) {
      const id = Date.now(); // Generate a unique id based on the current timestamp
      dispatch("add", { id, name, age });
      name = "";
      age = "";
    } else {
      // Add some visual indication that the fields are required
      alert("Please fill in all fields");
    }
  }
</script>

<div
  class="my-4 text-center flex flex-col md:flex-row md:items-center justify-center space-y-2 md:space-y-0 md:space-x-2 mx-5"
>
  <input
    bind:value={name}
    type="text"
    placeholder="Name"
    required
    class="border py-2 px-3 w-full md:w-auto {nameEmpty
      ? 'border-red-500'
      : 'border-gray-300'}"
  />
  <input
    bind:value={age}
    type="number"
    placeholder="Age"
    required
    class="border py-2 px-3 w-full md:w-auto {ageEmpty
      ? 'border-red-500'
      : 'border-gray-300'}"
  />
  <button
    on:click={addStudent}
    class="bg-green-500 text-white py-2 px-4 rounded w-full md:w-auto"
  >
    Add Student
  </button>
</div>
