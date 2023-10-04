import EditPage from "./editPage";
import client from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit({params}){
  const db = await client.db("QBank");
  const result = await db.collection("quest").findOne({_id : new ObjectId(params.id)});
    return (
        <div>
            <EditPage data={result}/>
        </div>
    );
}