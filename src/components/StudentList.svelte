<script>
  import { createEventDispatcher } from "svelte";

  export let students = [];
  const dispatch = createEventDispatcher();

  let editingId = null;
  let editingName = "";
  let editingAge = "";

  function startEditing(student) {
    editingId = student.id;
    editingName = student.name;
    editingAge = student.age;
  }

  function saveEdit() {
    dispatch("update", { id: editingId, name: editingName, age: editingAge });
    editingId = null;
    editingName = "";
    editingAge = "";
  }

  function cancelEdit() {
    editingId = null;
    editingName = "";
    editingAge = "";
  }
</script>

<table class="min-w-full bg-white">
  <thead>
    <tr>
      <th class="py-2 px-4 bg-gray-300 text-left">Name</th>
      <th class="py-2 px-4 bg-gray-300 text-left">Age</th>
      <th class="py-2 px-4 bg-gray-300 text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each students as student}
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
            <button
              class="bg-green-500 text-white py-1 px-2 rounded mr-2"
              on:click={saveEdit}
            >
              Save
            </button>
            <button
              class="bg-gray-500 text-white py-1 px-2 rounded"
              on:click={cancelEdit}
            >
              Cancel
            </button>
          </td>
        </tr>
      {:else}
        <tr>
          <td class="py-2 px-4 border-b">{student.name}</td>
          <td class="py-2 px-4 border-b">{student.age}</td>
          <td class="py-2 px-4 border-b">
            <button
              class="bg-blue-500 text-white py-1 px-2 rounded mr-2"
              on:click={() => startEditing(student)}
            >
              Update
            </button>
            <button
              class="bg-red-500 text-white py-1 px-2 rounded"
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
