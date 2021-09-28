import { NextPageContext } from "next";
import myGet from '../../api/myGet';

export default function VehiclesTSX({ vehicles }: any) {
    return (
        <div>
            <h2>Vehicles_Page</h2>
            { JSON.stringify(vehicles) }
            {/* {people.map((p:any) => (
                <ul key={p.id}>
                    <li>Id: { p.id }</li>
                    <li>Id: { p.name }</li>
                    <li>Id: { p.email }</li>
                </ul>
            ))
            } */}
        </div>
    )
};
VehiclesTSX.getInitialProps = async (ctx: NextPageContext) => {

    const json = await myGet("http://localhost:3000/api/vehicles" , ctx) ;

    return { vehicles: json };
};
