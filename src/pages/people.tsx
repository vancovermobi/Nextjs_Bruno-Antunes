import { NextPageContext } from "next";
import myGet from '../../api/myGet';

export default function People({ people }: any) {
    return (
        <div>
            <h2>People_Page</h2>
            { JSON.stringify(people) }
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
People.getInitialProps = async (ctx: NextPageContext) => {

    const json = await myGet("http://localhost:3000/api/people" , ctx) ;

    return { people: json };
};


