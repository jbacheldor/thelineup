import React from 'react';
import './style.css';
import Image from 'next/image';

type Prop = {
    retireeName: string;
    cause?: string;
}

function Headstone (props: Prop) {
    const [currentTab, setCurrentTab] = React.useState("")

    const updateTab = (type: string) => {
        setCurrentTab(type)
    }

    const onVote = (verdict: string) => {
        console.log('send a query here to update the system !', verdict)
        // they shouldn't be able to vote here multiple times!!!!
    }

    return (
        <div id='wrapper'>
            <Image height={100} width={100} alt="dead crush headstone" src={'/headstone.svg'}/> 
        {/* <img alt="dead crush headstone" src={'/headstone.svg'} /> */}
        <div className="crush-headstone">
        <span>
            here lies {props.retireeName}
        </span>
        <div id="graveyard-crush-tabs">
            <span onClick={()=>updateTab("stats")}>Stats</span>
            <span onClick={()=>updateTab("death")}>Cause</span>
            <span onClick={()=>updateTab("vote")}>Resurrection</span>
        </div>
        <div id="graveyard-crush-body">
        {(currentTab == "stats" || currentTab == "")  &&
            <div>
                some info about stats
            </div>
        }
        {currentTab == "death" &&
            <div>
                cause of death
            </div>
        }
        {currentTab == "vote" &&
            <div className="graveyard-resurrection-body">
                should we resurrect them???
                <button onClick={()=>onVote("save")}>resurrect</button>
                <button onClick={()=>onVote("perish")}>unmarked grave in the woods</button>
            </div>
        }
        </div>
        </div>
        </div>
    )
}

export default Headstone;