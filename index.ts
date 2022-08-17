import './style.css';

import { map, fromEvent, timer, Subscription } from 'rxjs';

const randomRadius = () => Math.floor(Math.random() * 25);
const randomAdd = () => Math.floor(Math.random() * add);

const timerObs = timer(0, 1);
let timerSub: Subscription = null;
const add = 5;

// set initial border radius values to boxes
const boxes = document.getElementsByClassName('box');
[...boxes].forEach((box) => {
  const radius = randomRadius();
  box.style.borderRadius = `${radius}%`;
  let radiusText = document.createTextNode(box.style.borderRadius);
  box.appendChild(radiusText);
});

// mouse enter and leave events returns element itself
const mouseEnter = fromEvent(boxes, 'mouseenter').pipe(
  map((event) => event.target)
);
const mouseLeave = fromEvent(boxes, 'mouseleave').pipe(
  map((event) => event.target)
);

// increase border radius when mouse entered box
const mouseEnterObs = mouseEnter.subscribe((element: HTMLDivElement) => {
  timerSub = timerObs.subscribe((timer) => {
    let radius = parseInt(element.style.borderRadius);
    // update radius or stop timer
    if (radius >= 50) {
      timerSub.unsubscribe();
    } else {
      element.style.borderRadius = `${radius + randomAdd()}%`;
      element.textContent = element.style.borderRadius;
    }
  });
});

// stop timer when mouse is leaves box
const mouseLeaveObs = mouseLeave.subscribe((element) => {
  timerSub.unsubscribe();
});
