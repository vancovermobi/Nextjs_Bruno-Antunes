import { useRouter } from "next/dist/client/router"

export default function Person() {
    const router = useRouter();
    console.log("Router: ", router.query);

    return (
        <h2>{ router.query.person }`s { router.query.vehicle }</h2>
    )
};
