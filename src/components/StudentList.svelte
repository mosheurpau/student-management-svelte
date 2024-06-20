<script>
  import { createEventDispatcher } from "svelte";

  export let students = [];
  const dispatch = createEventDispatcher();

  let editingId = null;
  let editingName = "";
  let editingAge = "";
  let editingStudentClass = "";
  let editingRoll = "";

  function startEditing(student) {
    editingId = student.id;
    editingName = student.name;
    editingAge = student.age;
    editingStudentClass = student.studentClass;
    editingRoll = student.roll;
  }

  function saveEdit() {
    dispatch("update", {
      id: editingId,
      name: editingName,
      age: editingAge,
      studentClass: editingStudentClass,
      roll: editingRoll,
    });
    editingId = null;
    editingName = "";
    editingAge = "";
    editingStudentClass = "";
    editingRoll = "";
  }

  function cancelEdit() {
    editingId = null;
    editingName = "";
    editingAge = "";
    editingStudentClass = "";
    editingRoll = "";
  }
</script>

<div class="overflow-x-auto">
  <table
    class="min-w-full bg-white table table-xs table-pin-rows table-pin-cols"
  >
    <thead>
      <tr>
        <th class="py-2 px-4 bg-gray-800 text-left">Index</th>
        <th class="py-2 px-4 bg-gray-800 text-left">Name</th>
        <th class="py-2 px-4 bg-gray-800 text-left">Age</th>
        <th class="py-2 px-4 bg-gray-800 text-left">Student Class</th>
        <th class="py-2 px-4 bg-gray-800 text-left">Roll</th>
        <th class="py-2 px-4 bg-gray-800 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each students as student, index}
        {#if editingId === student.id}
          <tr>
            <td class="py-2 px-4 border-b">
              <input
                type="text"
                bind:value={editingName}
                class="border py-1 px-2 w-full"
              />
            </td>
            <td class="py-2 px-4 border-b">
              <input
                type="number"
                bind:value={editingAge}
                class="border py-1 px-2 w-full"
              />
            </td>
            <td class="py-2 px-4 border-b">
              <input
                type="number"
                bind:value={editingStudentClass}
                class="border py-1 px-2 w-full"
              />
            </td>
            <td class="py-2 px-4 border-b">
              <input
                type="number"
                bind:value={editingRoll}
                class="border py-1 px-2 w-full"
              />
            </td>
            <td class="py-2 px-4 border-b">
              <button
                class="bg-green-500 text-white py-1 px-2 rounded mr-2"
                on:click={saveEdit}
              >
                Save
              </button>
              <button
                class="bg-gray-800 text-white py-1 px-2 rounded"
                on:click={cancelEdit}
              >
                Cancel
              </button>
            </td>
          </tr>
        {:else}
          <tr>
            <td class="py-2 px-4 border-b">{index + 1}</td>
            <td class="py-2 px-4 border-b">{student.name}</td>
            <td class="py-2 px-4 border-b">{student.age}</td>
            <td class="py-2 px-4 border-b">{student.studentClass}</td>
            <td class="py-2 px-4 border-b">{student.roll}</td>
            <td class="py-2 px-4 border-b">
              <button
                class="bg-blue-500 text-white py-1 px-2 rounded mr-2 my-1"
                on:click={() => startEditing(student)}
              >
                Update
              </button>
              <button
                class="bg-red-500 text-white py-1 px-2 rounded my-1"
                on:click={() => dispatch("delete", { id: student.id })}
              >
                Delete
              </button>
            </td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
</div>
