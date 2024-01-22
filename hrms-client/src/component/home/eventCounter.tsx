import {useEffect, useState} from "react";
import './eventCounter.scss'


interface TimeDisplayValuesType {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CounterType {
    displayValue: number;
    label: string;
}


const nextYear = new Date().getFullYear() + 1;
const targetDate = new Date(`Jan 1, ${nextYear} 00:00:00`).getTime();

const generateTimeDisplay = (): TimeDisplayValuesType => {
    const rightJustNow = new Date().getTime();
    const runway = targetDate - rightJustNow;
    const stateObj = {
        days: Math.floor(runway / (1000 * 60 * 60 * 24)),
        hours: Math.floor((runway % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((runway % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((runway % (1000 * 60)) / 1000)
    };

    return stateObj;
};


const Counter = ({ displayValue, label }: CounterType) => (
    <div className='counter-styled'>
        <h2>{label}</h2>
        {displayValue}
    </div>
);


const TempFile: React.FC = () => {
    const [timeDisplay, setTimeDisplay] = useState<TimeDisplayValuesType>(
        generateTimeDisplay
    );

    const updateCounters = () => setTimeDisplay(generateTimeDisplay);

    useEffect(() => {
        setInterval(() => setTimeDisplay(generateTimeDisplay), 1000);
    }, []);


    return (
        <section className='section-styled'>
            <header className='date-styled'>
                <h1 className='counter-heading'>🎉 New Year 🎉</h1>
            </header>
            <div className='wrapper-styled'>
                <Counter displayValue={timeDisplay.days} label={"Days"} />
                <Counter displayValue={timeDisplay.hours} label={"Hours"} />
                <Counter displayValue={timeDisplay.minutes} label={"Minutes"} />
                <Counter displayValue={timeDisplay.seconds} label={"Seconds"} />
            </div>
        </section>
    )
};

export default TempFile;