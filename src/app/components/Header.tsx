'use client'

type Props = {
    user: string
}

const Header:React.FC<Props> = ({user}) => {

    return (
        <div id="header">
            Logged in as: {user}

            <style jsx>
                {`
                    #header {
                        display: flex;
                        justify-content: flex-end;
                        width: 100vw;
                        padding-right: 10px;
                    }
                `}
            </style>
        </div>
    )
}

export default Header;