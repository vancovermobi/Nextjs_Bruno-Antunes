import Link from 'next/link';
import { useEffect, useState } from 'react';
import { VehiclePerson } from '../../api/VehiclePerson';


export interface ListProps {
  ownersList: VehiclePerson[] | undefined
}

export default function Lists({ ownersList } : ListProps ) {

  // ==== CSR : Client Side Rendering

  // const [owners, setOwners] = useState([]);
  // useEffect(() => {
  //   async function loadData() {
  //     const response = await fetch('http://localhost:4001/vehicles');

  //     const ownersList = await response.json();

  //     setOwners(ownersList);
  //   }
  //   loadData();
  // }, []);

  return (
    <>
      <h2>Lists pages</h2>

      <div>
        { ownersList?.map((owner, index) => (
          <div key={index}>
            <Link as={`/${owner.vehicle}/${owner.ownerName}`} href="/[vehicle]/[person]">
              <a>
                Navigation to {owner.ownerName}`s {owner.vehicle}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

// == SSR : Server Side rendering ==== //

Lists.getInitialProps = async () => {
  const response = await fetch('http://localhost:4001/vehicles');

  const ownersList: VehiclePerson[] | undefined = await response.json();

  return { ownersList: ownersList }
};

// TypeScript
// export interface VehiclePerson {
//   vehicle: string,
//   ownerName: string,
//   details: string
// }