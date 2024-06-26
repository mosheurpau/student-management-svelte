<script>
  import { createEventDispatcher } from "svelte";

  export let students = [];
  const dispatch = createEventDispatcher();

  function deleteStudent(id) {
    dispatch("delete", { id });
  }

  function editStudent(student) {
    dispatch("edit", student);
  }
</script>

<table class="min-w-full bg-white">
  <thead>
    <tr>
      <th class="py-2 px-4 bg-gray-300 text-left">Name</th>
      <th class="py-2 px-4 bg-gray-300 text-left">Gender</th>
      <th class="py-2 px-4 bg-gray-300 text-left">Age</th>
      <th class="py-2 px-4 bg-gray-300 text-left">Country</th>
      <th class="py-2 px-4 bg-gray-300 text-left">State</th>
      <th class="py-2 px-4 bg-gray-300 text-left">City</th>
      <th class="py-2 px-4 bg-gray-300 text-left">Edit</th>
      <th class="py-2 px-4 bg-gray-300 text-left">Delete</th>
    </tr>
  </thead>
  <tbody>
    {#each students as student}
      <tr>
        <td class="py-2 px-4 border-b">{student.name}</td>
        <td class="py-2 px-4 border-b">{student.gender}</td>
        <td class="py-2 px-4 border-b">{student.age}</td>
        <td class="py-2 px-4 border-b">{student.country}</td>
        <td class="py-2 px-4 border-b">{student.state}</td>
        <td class="py-2 px-4 border-b">{student.city}</td>
        <td class="py-2 px-4 border-b">
          <button
            class="bg-green-500 text-white py-1 px-2 rounded"
            on:click={() => editStudent(student)}
          >
            Edit
          </button>
        </td>
        <td class="py-2 px-4 border-b">
          <button
            class="bg-red-500 text-white py-1 px-2 rounded"
            on:click={() => deleteStudent(student.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
