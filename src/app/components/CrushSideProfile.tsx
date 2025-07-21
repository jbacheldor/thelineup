import ShowUpdateWindow from './ShowUpdateWindow';
import './style.css'

type Props = {
    onShowWindow: () => void;
    crush?: crushType;
}
export type crushType = {
    name: string,
    // enum
    status?: string, 
    description?: string,
    updates?: [{}],
    pros?: string[],
    cons?: string[],
    fan_ranking?: number,
    personal_ranking?: number,
    image?: string,
}

function CrushSideProfile(props: Props){
    const {onShowWindow, crush} = props

    console.log("test", crush)

    return (
        <div id="crush-side-profile">
        <span className="crush-update-header">
            {crush.name}
            <button onClick={onShowWindow} ><span>x</span></button>
        </span>
        <div id="crush-side-bio">
            <div className="crush-picture">
                image here
            </div>
            <span>
                status: {crush.status}
            </span>
            <span>
                personal ranking: {crush.personal_ranking}
            </span>
            <span>
                fan ranking: {crush.fan_ranking}
            </span>
            <hr className='crush-divider'/>
        {/* <h4 className='new-here'> */}
        <div id="crush-bio">
            <h4>
                description
            </h4>
            <div>
                {crush.description}
            </div>
            <hr className='crush-divider'/>
        </div>
        <div id="bio-trade-offs">
            <div className='trade-offs'>
            <h4>pros</h4>
                {crush.pros && crush.pros?.map((pro, key)=> {
                return (
                    <span key={key}>
                        {pro}
                    </span>
                )
            })}
            </div>
            <div className='trade-offs'>
                <h4>cons</h4>
                {crush.cons && crush.cons?.map((con, key)=> {
                return (
                    <span key={key}>
                        {con}
                    </span>
                )})}
            </div>
        </div>
        <hr className='crush-divider'/>
        <h4>updates here</h4>
        <ShowUpdateWindow/>
        </div>
    </div>
    )
}

export default CrushSideProfile;