<script>
  import StudentList from "./StudentList.svelte";
  import AddStudent from "./AddStudent.svelte";
  import { onMount } from "svelte";

  let students = [];
  let editingStudent = null;

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
      const response = await fetch("http://localhost:4000/graphql", options);
      const data = await response.json();
      // console.log("ddd", data);
      if (data.errors) {
        console.error("GraphQL errors:", data.errors);
        // Handle errors
      } else {
        students = data.data.students;
        console.log(students);
        // Access the fetched student data in `students`
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  });

  function addStudent(event) {
    if (editingStudent) {
      students = students.map((student) =>
        student.id === editingStudent.id
          ? { ...student, ...event.detail }
          : student
      );
      editingStudent = null;
    } else {
      students = [...students, event.detail];
    }
  }

  // function deleteStudent(event) {
  //   students = students.filter((student) => student.id !== event.detail.id);
  // }

  async function deleteStudent(event) {
    let id = event.detail.id;
    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation DeleteStudent($id: ID!) {
            deleteStudent(id: $id) {
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
        `,
        variables: {
          id,
        },
      }),
    });

    const result = await response.json();
    if (result.data.deleteStudent) {
      students = students.filter((student) => student.id !== event.detail.id);
      alert("Student deleted successfully:", result.data.deleteStudent);
    } else {
      alert("Failed to delete student:", result.errors);
    }
  }

  function startEditing(event) {
    editingStudent = event.detail;
    // $: {
    //   console.log(editingStudent);
    // }
  }
</script>

<div class="flex flex-wrap min-h-screen">
  <div class="w-full lg:w-1/3 p-4">
    <AddStudent on:add={addStudent} {editingStudent} />
  </div>
  <div class="w-full lg:w-2/3 p-4">
    <StudentList {students} on:delete={deleteStudent} on:edit={startEditing} />
  </div>
</div>
