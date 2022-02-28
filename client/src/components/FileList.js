import React from 'react';
import { useSelector } from 'react-redux'

export default function FileList() {
    const files = useSelector((state) => state.files.files);

    return (
        <div>
            <h2>
                Uploades files
            </h2>
            <ul>
                {
                    files.map(f => 
                        <li key={f.fileName}> { f.fileName } : { f.status }</li>
                    )
                }
            </ul>
        </div>
    );
}