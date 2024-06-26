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

<div class="overflow-x-auto shadow-2xl rounded border-2">
  <table class="table table-xs table-pin-rows table-pin-cols">
    <thead>
      <tr>
        <th class="py-2 px-4 bg-gray-300 text-black text-left">Index</th>
        <th class="py-2 px-4 bg-gray-300 text-black text-left">Name</th>
        <th class="py-2 px-4 bg-gray-300 text-black text-left">Gender</th>
        <th class="py-2 px-4 bg-gray-300 text-black text-left">Age</th>
        <th class="py-2 px-4 bg-gray-300 text-black text-left">Country</th>
        <th class="py-2 px-4 bg-gray-300 text-black text-left">State</th>
        <th class="py-2 px-4 bg-gray-300 text-black text-left">City</th>
        <th class="py-2 px-4 bg-gray-300 text-black text-left">Edit</th>
        <th class="py-2 px-4 bg-gray-300 text-black text-left">Delete</th>
      </tr>
    </thead>
    <tbody>
      {#each students as student, Index}
        <tr class="hover:shadow-2xl hover:text-black hover:bg-white">
          <td class="py-2 px-4 border-b">{Index + 1}</td>
          <td class="py-2 px-4 border-b">{student.name}</td>
          <td class="py-2 px-4 border-b">{student.gender}</td>
          <td class="py-2 px-4 border-b">{student.age}</td>
          <td class="py-2 px-4 border-b">{student.country}</td>
          <td class="py-2 px-4 border-b">{student.state}</td>
          <td class="py-2 px-4 border-b">{student.city}</td>
          <td class="py-2 px-4 border-b">
            <button
              class="bg-green-500 hover:btn-outline text-white py-1 px-2 rounded"
              on:click={() => editStudent(student)}
            >
              Edit
            </button>
          </td>
          <td class="py-2 px-4 border-b">
            <button
              class="bg-red-500 hover:btn-outline text-white py-1 px-2 rounded"
              on:click={() => deleteStudent(student.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
