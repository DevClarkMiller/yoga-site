import './Panel.css'
import quote1 from './MotivationImages/quote1.webp'
import quote2 from './MotivationImages/quote2.webp'
import quote3 from './MotivationImages/quote3.webp'
import quote4 from './MotivationImages/quote4.webp'
import quote5 from './MotivationImages/quote5.webp'
import quote6 from './MotivationImages/quote6.webp'
import quote7 from './MotivationImages/quote7.webp'
import quote8 from './MotivationImages/quote8.webp'

const MotivationPanel = () =>{
    const quoteList = [quote1, quote2, quote3, quote4, quote5, quote6, quote7, quote8];

    const imgSrc = quoteList[Math.floor(Math.random() * quoteList.length)];

    return(
        <div className='motivationPanel'>
            <div className='imgContainer'>
                <img src={imgSrc} alt='motivationalImage'></img>
            </div> 
        </div>
    );
}

export default MotivationPanel;