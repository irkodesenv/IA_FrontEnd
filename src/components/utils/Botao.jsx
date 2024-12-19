import React, { useEffect } from 'react';

const Botao = ({ tipo, display, cor, texto }) => {
    
    return (
        <button type="button" class="btn btn-label-primary"> {texto} </button>
    )
}

export default Botao