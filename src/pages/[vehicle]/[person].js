import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
export default function Person({ ownersList }) {
  const router = useRouter();
  console.log('Router: ', router.query); // check on Server and Browser

  const [owners, setOwners] = useState(ownersList);
  useEffect(() => {
    async function loadData() {
      const url = `http://localhost:4001/vehicles?ownerName=${router.query.person}&vehicle=${router.query.vehicle}`;
      const response = await fetch(url);
      const ownersList = await response.json();

      setOwners(ownersList);
    }
    if(ownersList.length == 0) {      
      loadData();
    }
  }, []);

  if (!owners[0] && ownersList.length == 0) {
    return <div>loading ...</div>
  }
  return (
    <>
      <h2>
        {router.query.person}`s {router.query.vehicle}
      </h2>
      <pre>
        {/* { JSON.stringify(ownersList, null , 4 ) } */}
        {/* { ownersList[0]?.details } */}
        {owners[0]?.details}
      </pre>
    </>
  );
}

// == SSR : Server Side rendering ==== //

Person.getInitialProps = async ctx => {
  if (!ctx.req) {
    return { ownersList: [] };
  }

  const { query } = ctx;
  //console.log('Query: ', query); // check on Server

  const url = `http://localhost:4001/vehicles?ownerName=${query.person}&vehicle=${query.vehicle}`;
  //   console.log('Url: ',url);
  const response = await fetch(url);

  const ownersList = await response.json();
  //   console.log(ownersList);

  return { ownersList: ownersList };
};
