import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
    return (
        <div className="progressBarWrapper">
            <div className="progressBar" style={{ width: `${progress}%` }}>
                {progress}%
            </div>
        </div>
    );
};

export default ProgressBar;
