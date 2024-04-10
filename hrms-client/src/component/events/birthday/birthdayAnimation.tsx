import React, {useEffect} from "react";
import '../../../styles/component/birthdayAnnimation.scss';


const BirthdayAnimation = () => {
    const random = (num: number): number => {
        return Math.floor(Math.random() * num);
    }

    const getRandomStyles = (): string => {
        const r = random(255);
        const g = random(255);
        const b = random(255);
        const mt = random(200);
        const ml = random(50);
        const dur = random(10) + 7;
        return `
      background-color: rgba(${r},${g},${b});
      color: rgba(${r},${g},${b},0.7); 
      box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
      margin: ${mt}px 0 0 ${ml}px;
      animation: float ${dur}s ease-in-out infinite
    `;
    }

    const createBalloons = (num: number): void => {
        const balloonContainer = document.getElementById("balloon-container");
        if (balloonContainer) {
            for (let i = num; i > 0; i--) {
                const balloon = document.createElement("div");
                balloon.className = "balloon";
                balloon.style.cssText = getRandomStyles();
                balloonContainer.append(balloon);
            }
        }
    }

    const removeBalloons = (): void => {
        const balloonContainer = document.getElementById("balloon-container");
        if (balloonContainer) {
            balloonContainer.style.opacity = "0";
            setTimeout(() => {
                balloonContainer.remove();
            }, 300);
        }
    }

    useEffect(() => {
        createBalloons(30);
    }, []);

    return (
        <div id="balloon-container"></div>
    );
}

export default BirthdayAnimation;