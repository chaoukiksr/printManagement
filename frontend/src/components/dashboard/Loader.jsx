'use client';

import { useSelector } from "react-redux";

export default function Loader() {
    const {loading} = useSelector(state => state.loader);

    if(!loading) return null ;
    return (
        <div className="popup">
            <div className="popup-loader">
                <div className="loader select-none"></div>
            </div>
            <style jsx>{`
                .loader {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}
