
// type Props = {
//     visible: boolean
// }

const DropDown:React.FC = () => {

    return (
        <div id="dropdown">
            <p>made ya look</p>

            <style jsx>
               {`
                div#dropdown  {
                    background: white;
                    position: absolute;
                    height: 100px;
                    right: 0px;
                    width: 100px;
                    top: 30px;
                }
               `}
            </style>
        </div>
    )
}

export default DropDown;