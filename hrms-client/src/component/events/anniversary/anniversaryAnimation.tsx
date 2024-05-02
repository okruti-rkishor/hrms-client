
import { useEffect, useState } from 'react';
const confettiFrequency = 10;
const confettiColors = ['#FFD700', '#C0C0C0', '#89CFF0' , '#98FB98', '#E6E6FA','#FAF8F1', '#FAEAB1', '#E5BA73', '#C58940', '#FAF8F1', "#FF0000", ' #0000FF', '#00FF00', '#FFD700', '#C0C0C0', '#89CFF0' , '#98FB98', '#E6E6FA',];
const confettiAnimations = ['slow', 'medium', 'fast'];
const confettiAnimationSpeeds = [4, 3, 2];

const confettiCss = `
@keyframes confetti-slow {
  0% {
    transform: translate3d(0, 0, 0) rotateX(0) rotateY(0);
  }

  100% {
    transform: translate3d(25px, 105vh, 0) rotateX(360deg) rotateY(180deg);
  }
}

@keyframes confetti-medium {
  0% {
    transform: translate3d(0, 0, 0) rotateX(0) rotateY(0);
  }

  100% {
    transform: translate3d(100px, 105vh, 0) rotateX(100deg) rotateY(360deg);
  }
}

@keyframes confetti-fast {
  0% {
    transform: translate3d(0, 0, 0) rotateX(0) rotateY(0);
  }

  100% {
    transform: translate3d(-50px, 105vh, 0) rotateX(10deg) rotateY(250deg);
  }
}

.confetti--animation-slow {
  animation: confetti-slow ${confettiAnimationSpeeds[0]}s linear 1 forwards;
}

.confetti--animation-medium {
  animation: confetti-medium ${confettiAnimationSpeeds[1]}s linear 1 forwards;
}

.confetti--animation-fast {
  animation: confetti-fast ${confettiAnimationSpeeds[2]}s linear 1 forwards;
}
`;

export default function AnniversaryAnimation() {
    const getRandomItem = (list: string[]) => list[Math.floor(Math.random() * list.length)];
  
    const el = document.createElement('div');
    el.id = 'confetti';
    el.style.position = 'fixed';
    el.style.pointerEvents = 'none';
    el.style.width = '100%';
    el.style.height = '100%';
  
    const containerEl = document.createElement('div');
    containerEl.style.position = 'absolute';
    containerEl.style.overflow = 'hidden';
    containerEl.style.top = '0';
    containerEl.style.right = '0';
    containerEl.style.bottom = '0';
    containerEl.style.left = '0';
    el.appendChild(containerEl);
  
    const confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div');
      confettiEl.style.position = 'absolute';
      confettiEl.style.zIndex = '99999';
      confettiEl.style.top = '-10px';
      confettiEl.style.borderRadius = '0%';
  
      const confettiSize = `${Math.floor(Math.random() * 50) + 7}px`;
      const confettiLeft = `${Math.floor(Math.random() * el.offsetWidth)}px`;
      const confettiBackground = getRandomItem(confettiColors);
      const confettiAnimation = getRandomItem(confettiAnimations);
  
      confettiEl.classList.add('confetti', `confetti--animation-${confettiAnimation}`);
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;
  
      setTimeout(function () {
        confettiEl.parentNode?.removeChild(confettiEl);
      }, 3000);
  
      containerEl.appendChild(confettiEl);
    }, 1000 / confettiFrequency);
  
    const styleEl = document.createElement('style');
    styleEl.innerHTML = confettiCss;
    document.head.appendChild(styleEl);
  
    document.body.prepend(el);
  
    return () => {
      clearInterval(confettiInterval);
      setTimeout(function () {
        el.remove();
        styleEl.remove();
      }, 3000);
    };
  }