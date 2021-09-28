import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Hello! Home pages</h1>
      <div>
        <Link href="/people">
          <a>goto People</a>
        </Link>
      </div>
      <div>
        <Link href="/vehiclesTSX">
          <a>goto Vehicles</a>
        </Link>
      </div>
    </div>
  );
}
