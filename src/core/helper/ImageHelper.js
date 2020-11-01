import React from 'react';

const ImageHelper = ({product}) => {
    const imageurl = product ? product.image : `https://cidco-smartcity.niua.org/wp-content/uploads/2017/08/No-image-found.jpg`
    return (
        <div className="rounded border border-success p-2">
            <img src={imageurl} 
            style={{maxHeight:"100%", maxWidth:"100%"}}
            className="mb-3 rounded"
            alt=""/>
        </div>
    )
}

export default ImageHelper;