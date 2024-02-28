import React  from 'react';
import { DNA } from 'react-loader-spinner';
import './PageHeader.css';

export default function Loader({ loading }) {
    return (
        loading && (
            <div className="loader-overlay" onClick={(e) => e.stopPropagation()}>
                <div className="loader-contenido">
                    <DNA
                        visible={loading}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                </div>
            </div>
        )
    );
};