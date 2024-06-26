<script>
  import { createEventDispatcher } from "svelte";

  let name = "";
  let age = "";
  let gender = "";
  let country = "";
  let state = "";
  let city = "";
  let agreed = false;

  const dispatch = createEventDispatcher();

  function addStudent() {
    if (name && age && gender && country && state && city && agreed) {
      const id = Date.now();
      dispatch("add", { id, name, age, gender, country, state, city });
      name = "";
      age = "";
      gender = "";
      country = "";
      state = "";
      city = "";
      agreed = false;
    } else {
      alert("Please fill in all fields");
    }
  }
</script>

<div class="bg-pink-100 p-6 rounded-lg shadow-md">
  <h2 class="text-xl font-bold mb-4">Student Registration Form</h2>
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
    <select bind:value={country} class="w-full border p-2" required>
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
      <option value="Dhaka">Dhaka</option>
      <option value="Khulna">Khulna</option>
      <option value="Rajshahi">Rajshahi</option>
      <option value="Mymensingh">Mymensingh</option>
      <option value="Rangpur">Rangpur</option>
      <option value="Sylhet">Sylhet</option>

      <option value="Delhi">Delhi</option>
      <option value="Delhi2">Delhi2</option>
      <option value="Delhi2">Delhi2</option>
      <option value="New York">New York</option>
      <option value="New York2">New York2</option>
      <option value="New York3">New York3</option>
      <option value="New York4">New York4</option>
      <!-- Add more states as needed -->
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
    Submit
  </button>
</div>
