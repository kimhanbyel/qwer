import Link from "next/link";
export default function ProblemNav(){
    return (
        <div className="pnav">
            <Link href={`/list`}>오래된 순</Link>
            <Link href={`/list/new`}>최신 순</Link>
            <Link href={`/list/view`}>조회 순</Link>
        </div>
    );
}