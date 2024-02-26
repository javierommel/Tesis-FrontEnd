import React, { useState } from 'react';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';
import { DNA } from 'react-loader-spinner';
import './PageHeader.css';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
                    {/*<RingLoader css={override} size={150} color={'#123abc'} loading={loading} />*/}
                </div>
            </div>
        )
    );
};