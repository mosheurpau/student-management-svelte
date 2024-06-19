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

<AddStudent on:add={addStudent} />
<StudentList {students} on:delete={deleteStudent} />
