<script>
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";

  export let editingStudent = null;

  const dispatch = createEventDispatcher();

  let name = "";
  let age = "";
  let gender = "";
  let country = "";
  let state = "";
  let city = "";
  let agreed = false;

  const countryChange = () => {
    state = "";
  };

  $: states = {
    Bangladesh: [
      "Dhaka",
      "Khulna",
      "Rajshahi",
      "Mymensingh",
      "Rangpur",
      "Sylhet",
    ],
    India: ["Delhi", "Karnataka", "Bangalore", "Hyderabad", "Mumbai"],
    USA: ["New York", "California", "Texas", "Chicago"],
  };

  $: if (editingStudent) {
    ({ name, age, gender, country, state, city } = editingStudent);
    agreed = true;
    editingStudent = null;
  }

  function addStudent() {
    if (name && age && gender && country && state && city && agreed) {
      const student = { name, age, gender, country, state, city, agreed };
      dispatch("add", student);
      resetForm();
    } else {
      alert("Please fill in all fields");
    }
  }

  function resetForm() {
    name = "";
    age = "";
    gender = "";
    country = "";
    state = "";
    city = "";
    agreed = false;
  }
</script>

<div class="p-6 rounded-lg shadow-2xl border-2">
  <h2 class="text-xl font-bold mb-4">Student Registration Form</h2>

  <div class="mb-4">
    <label class="block mb-1">Name</label>
    <input
      type="text"
      bind:value={name}
      class="w-full border p-2 rounded {name === ''
        ? 'border-green-200'
        : 'border-gray-300'}"
      placeholder="Type here"
      required
    />
  </div>

  <div class="mb-4">
    <label class="block mb-1">Gender</label>
    <input type="radio" bind:group={gender} value="Male" required /> Male
    <input type="radio" bind:group={gender} value="Female" required /> Female
  </div>

  <div class="mb-4">
    <label class="block mb-1">Age</label>
    <input
      type="number"
      bind:value={age}
      class="w-full border p-2 rounded {age === ''
        ? 'border-green-200'
        : 'border-gray-300'}"
      required
      placeholder="Type here"
    />
  </div>

  <div class="mb-4">
    <label class="block mb-1">Country</label>
    <select
      bind:value={country}
      on:change={countryChange}
      class="w-full border p-2 rounded {country === ''
        ? 'border-green-200'
        : 'border-gray-300'}"
      required
    >
      <option value="">Select Country</option>
      <option value="Bangladesh">Bangladesh</option>
      <option value="India">India</option>
      <option value="USA">USA</option>
    </select>
  </div>

  <div class="mb-4">
    <label class="block mb-1">State</label>
    <select
      bind:value={state}
      class="w-full border p-2 rounded {state === ''
        ? 'border-green-200'
        : 'border-gray-300'}"
      required
    >
      <option value="">Select State</option>
      {#if country === "Bangladesh"}
        {#each states.Bangladesh as bdState}
          <option value={bdState}>{bdState}</option>
        {/each}
      {:else if country === "India"}
        {#each states.India as indiaState}
          <option value={indiaState}>{indiaState}</option>
        {/each}
      {:else if country === "USA"}
        {#each states.USA as usaState}
          <option value={usaState}>{usaState}</option>
        {/each}
      {/if}
    </select>
  </div>

  <div class="mb-4">
    <label class="block mb-1">City</label>
    <input
      type="text"
      bind:value={city}
      class="w-full border p-2 rounded {city === ''
        ? 'border-green-200'
        : 'border-gray-300'}"
      placeholder="Type here"
      required
    />
  </div>

  <div class="mb-4">
    <input type="checkbox" bind:checked={agreed} required /> Agree Terms and Conditions
  </div>

  <button
    on:click={addStudent}
    class="bg-green-500 hover:btn-outline text-white py-2 px-4 rounded"
  >
    Submit
  </button>
</div>
