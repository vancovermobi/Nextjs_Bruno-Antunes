import Link from 'next/link';

const people = [
  { v: 'car', name: 'bruno' },
  { v: 'bike', name: 'John' },
  { v: 'airplane', name: 'Mick' },
];
export default function Details() {
  return (
    <>
      <h2>Details pages</h2>
      <div>
        {/* <Link href="/BMW/John/"> */}
        {people.map((p) => (
          <>
            <Link key={p.v} as={`/${p.v}/${p.name}`} href="/[vehicle]/[person]">
              <a>
                Navigation to {p.name}`s {p.v}
              </a>
            </Link>
            <br></br>
            <br></br>
          </>
        ))}
      </div>
    </>
  );
}
