import React from 'react';

const ImageHelper = ({product}) => {
    const imageurl = product ? product.image : `https://cidco-smartcity.niua.org/wp-content/uploads/2017/08/No-image-found.jpg`;
    return (
        <div className="rounded border border-success p-2">
            <img src={imageurl} 
            style={{width:"100%", height:"300px"}}
            className="mb-3 rounded"
            alt=""/>
        </div>
    );
};

export default ImageHelper;