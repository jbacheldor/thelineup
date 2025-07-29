import React from 'react';
import CrushSideProfile from './CrushSideProfile';
import CrushWindows from './CrushWindow';
import './style.css'
import Headstone from './Headstone';
// import { ReactComponent as MinimizeIcon }  from '../../assets/minimize-8.svg';

type Props = {
    theme?: string;
    crushName?: string;
}

type updateFormat = {
    event: string,
    text: string,
}

export type crushType = {
    name: string,
    // enum
    status?: string, 
    description?: string,
    updates?: updateFormat[],
    pros?: string[],
    cons?: string[],
    fan_ranking?: number,
    personal_ranking?: number,
    image?: string,
}


function CrushWrapper(props: Props) {
    const {crushName} = props
    console.log('crushName', crushName)
    const [showWindow, setShowWindow] = React.useState(false)
    const [showSideProfile, setShowSideProfile] = React.useState(false)


    const showCrushUpdate = () => {
        setShowWindow(true)
    }

    
    const changeSideProfile = () => {
        setShowSideProfile(!showSideProfile)
        setShowWindow(false)
    }

    const testCrushes = [{crushName: "Crush A"}, {crushName: "Crush B"}, {crushName: "Crush C"}, {crushName: "Crush D"}]
    const retirees = [{retiree: "Retiree A"}, {retiree: "Retiree B"}, {retiree: "Retiree C"}]

    const active_crushes: crushType[] = [{name: "crush A",
        status: "hot", 
        description: "lorem ipsum or whatever",
        updates: [{event: "may 4", text: "he talked to me"}, {event: "may 17th", text: "he spit on me"}],
        pros: ["smells nice", "lives far away", "can play the banjo"],
        cons: ["doesn't believe in hot dogs", "says the pledge of allegiance unironically", "likes eggs, unfertilized"],
        personal_ranking: 1,
        fan_ranking: 2,},
        {name: "crush B",
        status: "hot", 
        description: "lorem ipsum or whatever",
        updates: [{event: "may 4", text: "he talked to me"}, {event: "may 17th", text: "he spit on me"}],
        pros: ["smells nice", "lives far away", "can play the banjo"],
        cons: ["doesn't believe in hot dogs", "says the pledge of allegiance unironically", "likes eggs, unfertilized"],
        personal_ranking: 1,
        fan_ranking: 2,
    },
        {name: "crush C",
        status: "hot", 
        description: "lorem ipsum or whatever",
        updates: [{event: "may 4", text: "he talked to me"}, {event: "may 17th", text: "he spit on me"}],
        pros: ["smells nice", "lives far away", "can play the banjo"],
        cons: ["doesn't believe in hot dogs", "says the pledge of allegiance unironically", "likes eggs, unfertilized"],
        personal_ranking: 1,
        fan_ranking: 2,},
        {name: "crush D",
        status: "hot", 
        description: "lorem ipsum or whatever",
        updates: [{event: "may 4", text: "he talked to me"}, {event: "may 17th", text: "he spit on me"}],
        pros: ["smells nice", "lives far away", "can play the banjo"],
        cons: ["doesn't believe in hot dogs", "says the pledge of allegiance unironically", "likes eggs, unfertilized"], 
        personal_ranking: 1,
        fan_ranking: 2,}
    ]

    return (
        <>
        <hr/>
        <div className="crush-header">
            <h2>Current Afflictions</h2>
        </div>
        <hr/>
        <div id="crush-blocks">
            {testCrushes.map((crush, key)=> {
                return (
                    <div key={key}>
                    <CrushWindows crushName={crush.crushName} closeWindows={showWindow} onSelect={showCrushUpdate} showProfile={changeSideProfile}/>
                    </div>
                )
            })} 
        </div>
        <hr/>
        <div className="crush-header">
            <h2>In Recruitment</h2>
        </div>
        <hr/>
        <div className="crush-header">
            <h2>Benched</h2>
        </div>
        <hr/>
            <div className="crush-header">
                <h2>The Graveyard</h2>
            </div>
            <hr/>
            <div id="dearly-departeds">
                {retirees.map((retiree, key)=> {
                    return (
                        <div key={key}>
                        <Headstone retireeName={retiree.retiree}/>
                        </div>
                    )
                })}
            </div>
        <hr/>
        <div className="crush-header">
            <h2>Leaderboards</h2>
        </div>
        <hr/>
        <div id="crush-leaderboards">
            <div id="crush-industry-plants">
                <h3>Nepo Babies</h3>
                yxz
            </div>
            <hr id="crush-divider"/>
            <div id="crush-fan-favorites">
                <h3>Fan Favorites</h3>
                xyz
            </div>
        </div>
        {showSideProfile &&
            <CrushSideProfile onShowWindow={changeSideProfile} crush={active_crushes[0]}/>
        }
        </>
    );
}
export default CrushWrapper;