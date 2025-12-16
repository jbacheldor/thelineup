'use client'

const BugReport:React.FC = () => {
    return (
        <div id="page">
        <h2>Report a Bug Report!</h2>
        <p>have u or someone u loved been victimized by a bug on THIS app! report it NOW! so i can fix it.</p>
        <p>it is a one-woman show presently though so be gentle and kind please.</p>
        <form>
            <label>
                <p>severity</p>
                <select>
                    <option>scalding hot</option>
                    <option>luke warm</option>
                    <option>cold</option>
                    <option>below freezing</option>
                </select>
            </label>
            <label>
                <p>type</p>
                <select>
                    <option>accessiblity</option>
                    <option>bug fix</option>
                    <option>side effect</option>
                    <option></option>
                    <option>other</option>
                </select>
            </label>
            <label>
                <p>can u tell me more about the issue</p>
                <textarea></textarea>
            </label>
            <label>
                <p>do you want a follow-up for this issue</p>
                <p>note: if u select yes we will reach out to email on file</p>
                <select>
                    <option>yes</option>
                    <option>no</option>
                </select>
            </label>
            <label>
                <p>any attachments</p>
                <p>max of 5 plz - we can expand in follow up emails</p>
                <input
                type="file"
                name="myImage"
                // onChange={(event) => onUpload(event)}
                multiple
                accept=".jpg, .jpeg, .png"
                // disabled={(selectedImage && selectedImage.length >= 5) ? true : false}
                />
            </label>
            <button>submit</button>
        </form>

        {/* 
        then we need to registr the date added 
        & the time
        */}
        <h2>we also have a suggestion box if none of the above applies</h2>
            <label>
                <p>add your thoughts here!</p>
                <textarea></textarea>
            </label>
            <button>submit</button>
        <style jsx>
            {`
            #page {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
            }
            
            `}
        </style>
        </div>
    )
}

export default BugReport