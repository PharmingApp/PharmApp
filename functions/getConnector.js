import postgres from "postgres";

export default function getConnector(){
    return postgres();
}