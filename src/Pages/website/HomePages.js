
import LatestProducts from "./Latest/LatestProducts";
import LatestSaleProduct from "./Latest/LatestSaleProduct";
import TopRating from "./TopRating/TopRating";
import WelcomeMessage from "./WelcomeMessage/WelcomeMessage";

export default function HomePage(){
    return(
        <div>
            <div className="web-back-ground position-relative d-flex
             align-items-center justify-content-between mb-4">  </div>
             <WelcomeMessage/>
            <LatestSaleProduct/>
            <TopRating/>
            <LatestProducts/>
        </div>
    )
}