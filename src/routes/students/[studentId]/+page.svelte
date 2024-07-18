<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let student = null;
  let loading = true;
  let error = null;

  onMount(async () => {
    const { params } = $page;
    const query = `
        query {
          student(id: "${params.studentId}") {
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

    try {
      const res = await fetch(
        "https://student-management-server-side.onrender.com/graphql",
        options
      );
      const result = await res.json();

      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        error = "Error fetching data";
      } else {
        student = result.data.student;
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      error = "Error fetching data";
    } finally {
      loading = false;
    }
  });

  // console.log({ student });
</script>

{#if loading}
  <div class="text-center text-green-500 my-40">
    <p>
      Loading Students data from GQL Server... <br />
      <progress class="progress w-56"></progress>
    </p>
  </div>
{:else if error}
  <p>{error}</p>
{:else}
  <div>
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content flex-col lg:flex-row">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          class="max-w-sm rounded-lg shadow-2xl"
          alt="student img"
        />
        <div>
          <h1 class="text-5xl font-bold">{student.name}</h1>
          <div class="py-6">
            <p>Country: {student.country}</p>
            <p>State: {student.state}</p>
            <p>City: {student.city}</p>
            <p>Age: {student.age}</p>
            <p>Gender: {student.gender}</p>
          </div>
          <button class="btn btn-outline"
            >Agreed: {student.agreed ? "Yes" : "No"}</button
          >
          <button class="btn btn-outline" on:click={() => window.history.back()}
            >Go Back</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}
