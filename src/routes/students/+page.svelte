<script>
  import { onMount } from "svelte";

  let students = [];
  let loading = true;

  const query = `
      query allStudents {
        students {
          id
          name
          age
          gender
          country
          state
          city
          agreed
        }
      }
    `;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  onMount(async () => {
    try {
      const response = await fetch(
        "https://student-management-server-side.onrender.com/graphql",
        options
      );
      const data = await response.json();
      // console.log("ddd", data);
      if (data.errors) {
        console.error("GraphQL errors:", data.errors);
        // Handle errors
      } else {
        students = data.data.students;
        console.log("ssssssss", students);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="text-center text-green-500 my-40">
    <p>
      Loading Students data from GQL Server... <br />
      <progress class="progress w-56"></progress>
    </p>
  </div>
{:else}
  <div class="my-8 max-w-6xl mx-auto">
    <h2 class="text-center text-3xl font-bold my-6 text-green-500">
      Meet Our Students
    </h2>
    <div class="container mx-auto px-4">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {#each students as student, index}
          <div class="card shadow-md rounded-lg overflow-hidden border-2">
            <div class="card-body p-4">
              <h2 class="card-title text-xl font-semibold mb-2">
                {student.name}
              </h2>
              <p class="text-green-400">{student.country}</p>
              <div class="card-actions flex justify-end">
                <a class="hover:underline" href="/students/{student.id}">
                  <button
                    class="btn btn-sm btn-outline border-2 hover:text-green-700"
                    >Details</button
                  ></a
                >
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}
