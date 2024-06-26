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
    // Reset state selection when country changes
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

  onMount(() => {
    if (editingStudent) {
      name = editingStudent.name;
      age = editingStudent.age;
      gender = editingStudent.gender;
      country = editingStudent.country;
      state = editingStudent.state;
      city = editingStudent.city;
      agreed = true;
    }
  });

  function addStudent() {
    if (name && age && gender && country && state && city && agreed) {
      const id = editingStudent ? editingStudent.id : Date.now();
      dispatch("add", { id, name, age, gender, country, state, city });
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
    dispatch("cancel");
  }
</script>

<div class="bg-pink-100 p-6 rounded-lg shadow-md">
  <h2 class="text-xl font-bold mb-4">
    {editingStudent ? "Edit Student Details" : "Student Registration Form"}
  </h2>
  <div class="mb-4">
    <label class="block mb-1">Name</label>
    <input
      type="text"
      bind:value={name}
      class="w-full border p-2 {name === ''
        ? 'border-red-500'
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
      class="w-full border p-2 {age === ''
        ? 'border-red-500'
        : 'border-gray-300'}"
      required
    />
  </div>
  <div class="mb-4">
    <label class="block mb-1">Country</label>
    <select
      bind:value={country}
      on:change={countryChange}
      class="w-full border p-2"
      required
    >
      <option value="">Select Country</option>
      <option value="Bangladesh">Bangladesh</option>
      <option value="India">India</option>
      <option value="USA">USA</option>
      <!-- Add more countries as needed -->
    </select>
  </div>
  <div class="mb-4">
    <label class="block mb-1">State</label>
    <select bind:value={state} class="w-full border p-2" required>
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
      class="w-full border p-2 {city === ''
        ? 'border-red-500'
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
    class="bg-green-500 text-white py-2 px-4 rounded"
  >
    {editingStudent ? "Update" : "Submit"}
  </button>
</div>
