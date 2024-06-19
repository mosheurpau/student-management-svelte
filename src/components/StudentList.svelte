<script>
  import { createEventDispatcher } from "svelte";

  export let students = [];
  const dispatch = createEventDispatcher();
</script>

<table class="min-w-full bg-white">
  <thead>
    <tr>
      <th class="py-2 px-4 bg-gray-200 text-left">Name</th>
      <th class="py-2 px-4 bg-gray-200 text-left">Age</th>
      <th class="py-2 px-4 bg-gray-200 text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each students as student}
      <tr>
        <td class="py-2 px-4 border-b">{student.name}</td>
        <td class="py-2 px-4 border-b">{student.age}</td>
        <td class="py-2 px-4 border-b">
          <button
            class="bg-red-500 text-white py-1 px-2 rounded"
            on:click={() => dispatch("delete", { id: student.id })}
          >
            Delete
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
