import React from 'react'
import { Hourglass } from 'react-loader-spinner'

function CreateLoader() {
    return (
        <Hourglass
            visible={true}
            height="30"
            width="30"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
        />
    )
}

export default CreateLoader