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
  function updateStudent(event) {
    students = students.map((student) =>
      student.id === event.detail.id ? { ...student, ...event.detail } : student
    );
  }
</script>

<div class="min-h-screen">
  <AddStudent on:add={addStudent} />
  <StudentList {students} on:delete={deleteStudent} on:update={updateStudent} />
</div>
