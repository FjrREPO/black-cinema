import getUser from "./_actions/getUser";
import Homepage from "./_components/Homepage";

export default async function Home() {
  const user = await getUser();

  if(!user) {
    return null
  }

  return (
    <>
      <Homepage user={user}/>
    </>
  );
}
