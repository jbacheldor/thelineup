'use client'

import Image from "next/image"

const PaperClip:React.FC = () => {
    return (
        <div id='clippy'>
            <Image alt="clippy delivers errors" height={90} width={90} src={'/clippy.png'}/> 
            <style jsx>
                {`
                    #clippy {
                        position: fixed;
                        bottom: 0px;
                        right: 0px;
                    }
                `}
            </style>
        </div>
    )
}

export default PaperClip