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
        console.log(students);
        // Access the fetched student data in `students`
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  });

  async function addStudent(event) {
    let name = event.detail.name;
    let age = event.detail.age;
    let gender = event.detail.gender;
    let country = event.detail.country;
    let state = event.detail.state;
    let city = event.detail.city;
    let agreed = event.detail.agreed;
    if (editingStudent) {
      // console.log("EditingStudent:", editingStudent);
      // console.log("Event:", event.detail.name);

      let id = editingStudent.id;

      // Perform the asynchronous operation outside the map function
      (async () => {
        const response = await fetch(
          "https://student-management-server-side.onrender.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
          mutation updateStudent($id: ID!, $edits: EditStudentInput!) {
            updateStudent(id: $id, edits: $edits) {
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
                edits: {
                  name,
                  age,
                  gender,
                  country,
                  state,
                  city,
                  agreed,
                },
              },
            }),
          }
        );

        const result = await response.json();
        if (result.data.updateStudent) {
          console.log(
            "Student updated successfully:",
            result.data.updateStudent
          );

          // Update the students array after a successful update
          students = students.map((student) => {
            if (student.id === editingStudent.id) {
              return { ...student, ...event.detail };
            } else {
              return student;
            }
          });
        } else {
          console.log("Failed to update student:", result.errors);
        }

        // Reset editingStudent
        editingStudent = null;
      })();
    } else {
      students = [...students, event.detail];

      const response = await fetch(
        "https://student-management-server-side.onrender.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
          mutation addStudent($student: AddStudent!) {
          addStudent(student: $student) {
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
              student: {
                name,
                age,
                gender,
                country,
                state,
                city,
                agreed,
              },
            },
          }),
        }
      );

      const result = await response.json();
      if (result.data.addStudent) {
        alert("Student added successfully");
      } else {
        alert("Failed to add student:");
      }
    }
  }

  async function deleteStudent(event) {
    let id = event.detail.id;
    const response = await fetch(
      "https://student-management-server-side.onrender.com/graphql",
      {
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
      }
    );

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
