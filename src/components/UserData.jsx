const UserData = ({ users }) => {
  return (
    <>
      {users.map((curUser) => {
        const { student_id, name, contact, address } = curUser;

        return (
          <tr key={student_id}>
            <td>{student_id}</td>
            <td>{name}</td>
            <td>{contact}</td>
            <td>{address}</td>
          </tr>
        );
      })}
    </>
  );
};
export default UserData;
