import SingleResto from "@/components/Restaurants/SingleResto"
import Card from "@/Ui/Card";
interface Props{
    params:{
        restoId:number
    }
}
export default async  function RestoDetails({params}:Props){
    
    const restoId =Number( params.restoId)
    
    return(
        <div>
        <Card className="mx-auto  my-10">
            <SingleResto restoId={restoId}/>
        </Card>
        </div>
    )
}