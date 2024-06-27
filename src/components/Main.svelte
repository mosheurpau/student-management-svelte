<script>
  import StudentList from "./StudentList.svelte";
  import AddStudent from "./AddStudent.svelte";
  import { onMount } from "svelte";

  let students = [];
  let editingStudent = null;

  onMount(async () => {
    const data = await fetch("/studentsData.json");
    const result = await data.json();
    students = result;
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

  function deleteStudent(event) {
    students = students.filter((student) => student.id !== event.detail.id);
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
