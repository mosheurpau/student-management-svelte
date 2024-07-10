export const load = async ({ fetch, params }) => {
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
      return { student: null };
    }

    return {
      student: result.data.student,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { student: null };
  }
};
