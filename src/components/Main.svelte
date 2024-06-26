<script>
  import StudentList from "./StudentList.svelte";
  import AddStudent from "./AddStudent.svelte";
  import { onMount } from "svelte";

  export let students = [];

  onMount(async () => {
    const data = await fetch("studentsData.json");
    const result = await data.json();
    students = result;
    console.log(result);
  });

  function addStudent(event) {
    students = [...students, event.detail];
  }
  function deleteStudent(event) {
    students = students.filter((student) => student.id !== event.detail.id);
  }
  function updateStudent(event) {
    students = students.map((student) =>
      student.id === event.detail.id ? { ...student, ...event.detail } : student
    );
  }
</script>

<div class="flex flex-wrap">
  <div class="w-full lg:w-1/3 p-4">
    <AddStudent on:add={addStudent} />
  </div>
  <div class="w-full lg:w-2/3 p-4">
    <StudentList
      {students}
      on:delete={deleteStudent}
      on:update={updateStudent}
    />
  </div>
</div>

<!-- <div class="min-h-screen">
  <AddStudent on:add={addStudent} />
  <StudentList {students} on:delete={deleteStudent} on:update={updateStudent} />
</div> -->
