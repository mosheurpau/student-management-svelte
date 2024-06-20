<script>
  import { createEventDispatcher } from "svelte";

  let name = "";
  let age = "";
  let studentClass = "";
  let roll = "";
  const dispatch = createEventDispatcher();

  // Reactive statements to check if fields are empty
  $: nameEmpty = !name;
  $: ageEmpty = !age;
  $: studentClassEmpty = !studentClass;
  $: rollEmpty = !roll;

  function addStudent() {
    if (name && age && studentClass && roll) {
      const id = Date.now(); // Generate a unique id based on the current timestamp
      dispatch("add", { id, name, age, studentClass, roll });
      name = "";
      age = "";
      studentClass = "";
      roll = "";
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
  <input
    bind:value={studentClass}
    type="number"
    placeholder="Student Class"
    required
    class="border py-2 px-3 w-full md:w-auto {studentClassEmpty
      ? 'border-red-500'
      : 'border-gray-300'}"
  />
  <input
    bind:value={roll}
    type="number"
    placeholder="Roll Number"
    required
    class="border py-2 px-3 w-full md:w-auto {rollEmpty
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
