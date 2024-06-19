<script>
  import StudentList from "./StudentList.svelte";
  import AddStudent from "./AddStudent.svelte";

  export let students = [];

  function addStudent(event) {
    students = [...students, event.detail];
  }
  function deleteStudent(event) {
    students = students.filter((student) => student.id !== event.detail.id);
  }
</script>

<div class="min-h-screen">
  <AddStudent on:add={addStudent} />
  <StudentList {students} on:delete={deleteStudent} />
</div>
