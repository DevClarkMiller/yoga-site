import Panel from "./Panel";
import Dates from "./Dates";
import MotivationPanel from "./MotivationPanel";
import conventionPic from './Images/conventionPic.jpg';
import mugshot from './Images/andreaPic.jpg';
import template from './Images/yogaTemplateBW.png';
import mirroredTemplate from './Images/mirroredYogaTemplateBW.png'
import { useContext, useEffect, useState } from "react";
import { RefContext } from "./App";
import ReviewsPanel from "./ReviewsPanel";

const Content = () =>{
    const {setIsAdmin, aboutRef, datesRef, appRef, datesConfigAll, contentConfig} = useContext(RefContext);
    const VIEW_CHANGE = 850;

    const [usingFooterImg, setUsingFooterImg] = useState(false);

    if(appRef.current){
        appRef.current.classList.remove('fullHeight');
        appRef.current.classList.remove('centerContent');
    }

    const handleResize = () => {
        if(window.innerWidth >= VIEW_CHANGE){
            console.log();
            setUsingFooterImg(true);
        }else{
            setUsingFooterImg(false);
        }
    };

    useEffect(() =>{
        setIsAdmin(false);
        console.log(datesConfigAll);
        console.log(contentConfig);
        window.addEventListener('resize', handleResize);
        handleResize();
    }, []);

    return(
        contentConfig &&
        <main>
            <div className="panelDuo">
                <Panel 
                    config={contentConfig.firstPanel}
                    image={conventionPic}
                    altText={"Lady meditating in the glowing sun"}
                />
                <Panel 
                    config={contentConfig.secondPanel}
                />
            </div>

            <div className="panelSoloReviews">
                <Panel
                    config={contentConfig.thirdPanel}
                    itemRef={aboutRef}
                    image={mugshot}
                    altText={"asds"}
                    //bgImg={clouds2}
                />
                <ReviewsPanel />
            </div>
            {/*<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Flisa.hagerty.10%2Fposts%2Fpfbid02jXsXhcpCMq3rXXw8cZUkcg9f23QGY2rMVS9ZYZWUCi9dWF7SW2FnueKJJDfNjMTel&show_text=true&width=500&is_preview=true" width="500" height="169" style={{border:"none", overflow:"hidden"}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>*/}
            
            
            <div ref={datesRef}></div>
            <div className="datesSection">
                <Dates DateConfig={datesConfigAll} template={template} isHeader={true} usingFooterImg={usingFooterImg}/>
                {usingFooterImg ? 
                    <Dates DateConfig={datesConfigAll} template={mirroredTemplate} isFooter={true} usingFooterImg={usingFooterImg}/> 
                    : 
                    <Dates DateConfig={datesConfigAll} template={null} isFooter={true} usingFooterImg={usingFooterImg}/>
                }
            </div>
        </main>
    );
}

export default Content;