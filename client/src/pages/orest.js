import {useQuery} from "@apollo/client";
import { GET_ALL_USERS } from '../utils/queries';


export default function Orest() {
    const { loading, data } = useQuery(GET_ALL_USERS, {
        fetchPolicy: "no-cache"
      });


    return(
        
        console.log(loading, data)
      
       
    )

};